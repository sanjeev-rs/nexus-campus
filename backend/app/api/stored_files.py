from pathlib import Path
from uuid import uuid4

from fastapi import (
    APIRouter,
    BackgroundTasks,
    Depends,
    File,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.core.roles import UserRole
from app.core.security import get_current_nexus_user
from app.database.connection import get_db

from app.models.project_member import ProjectMember
from app.models.student import Student

from app.schemas.stored_file import (
    StoredFileCreate,
    StoredFileResponse,
)

from app.services.project_evidence_service import (
    get_project_evidence,
)

from app.services.stored_file_service import (
    create_stored_file,
    create_research_stored_file,
    delete_stored_file,
    get_project_evidence_files,
    get_project_files,
    get_stored_file,
    get_stored_files,
    get_student_files,
)
from app.services.research_ingestion_processor import (
    research_ingestion_processor,
)

from app.storage.service import storage_service
from app.services.research_ingestion_processor import (
    research_ingestion_processor,
)


router = APIRouter()


# =========================================================
# ROLE HELPERS
# =========================================================

def is_admin(current_user) -> bool:
    return current_user.role in {
        UserRole.ADMIN.value,
        UserRole.SUPER_ADMIN.value,
    }


def is_institutional_user(current_user) -> bool:
    return current_user.role in {
        UserRole.FACULTY.value,
        UserRole.HOD.value,
        UserRole.MANAGEMENT.value,
        UserRole.ADMIN.value,
        UserRole.SUPER_ADMIN.value,
    }


# =========================================================
# STUDENT DOCUMENT UPLOAD
# =========================================================

@router.post(
    "/upload/student/{student_id}",
    response_model=StoredFileResponse,
)
async def upload_student_document(
    student_id: int,
    file: UploadFile = File(...),
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Upload a document belonging to a student.

    Student:
        Can upload only their own documents.

    Admin / Super Admin:
        Can upload documents for any student.
    """

    # -----------------------------------------------------
    # ACCESS CHECK
    # -----------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail="Students can only upload their own documents",
            )

    elif not is_admin(current_user):

        raise HTTPException(
            status_code=403,
            detail=(
                "Only students, admins, and super admins "
                "can upload student documents"
            ),
        )

    # -----------------------------------------------------
    # VERIFY STUDENT
    # -----------------------------------------------------

    student = (
        db.query(Student)
        .filter(Student.id == student_id)
        .first()
    )

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found",
        )

    # -----------------------------------------------------
    # FILE VALIDATION
    # -----------------------------------------------------

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="File name is required",
        )

    file_data = await file.read()

    if not file_data:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty",
        )

    content_type = (
        file.content_type
        or "application/octet-stream"
    )

    try:
        storage_service.validate_file(
            file_name=file.filename,
            file_size=len(file_data),
            content_type=content_type,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )

    # -----------------------------------------------------
    # CREATE STORAGE PATH
    # -----------------------------------------------------

    extension = Path(file.filename).suffix.lower()

    unique_name = f"{uuid4()}{extension}"

    bucket = "student-documents"

    file_path = (
        f"{student_id}/"
        f"documents/"
        f"{unique_name}"
    )

    # -----------------------------------------------------
    # UPLOAD
    # -----------------------------------------------------

    try:
        storage_service.upload_file(
            bucket=bucket,
            file_path=file_path,
            file_data=file_data,
            content_type=content_type,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"File upload failed: {str(exc)}",
        )

    # -----------------------------------------------------
    # DATABASE RECORD
    # -----------------------------------------------------

    stored_file_data = StoredFileCreate(
        bucket=bucket,
        file_path=file_path,
        file_name=file.filename,
        content_type=content_type,
        file_size=len(file_data),
        student_id=student_id,
        uploaded_by=current_user.id,
    )

    try:
        stored_file = create_stored_file(
            db,
            stored_file_data,
        )
    except Exception:

        try:
            storage_service.delete_file(
                bucket=bucket,
                file_path=file_path,
            )
        except Exception:
            pass

        raise HTTPException(
            status_code=500,
            detail="File record could not be created",
        )

    return stored_file


# =========================================================
# PROFILE ASSET UPLOAD
# =========================================================

@router.post(
    "/upload/profile/{student_id}",
    response_model=StoredFileResponse,
)
async def upload_profile_asset(
    student_id: int,
    file: UploadFile = File(...),
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Upload a student profile image.

    Student:
        Can upload only their own profile image.

    Admin / Super Admin:
        Can upload for any student.

    Allowed:
        JPG
        JPEG
        PNG
        WEBP
    """

    # -----------------------------------------------------
    # ACCESS CHECK
    # -----------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only upload "
                    "their own profile assets"
                ),
            )

    elif not is_admin(current_user):

        raise HTTPException(
            status_code=403,
            detail=(
                "Only students, admins, and super admins "
                "can upload profile assets"
            ),
        )

    # -----------------------------------------------------
    # VERIFY STUDENT
    # -----------------------------------------------------

    student = (
        db.query(Student)
        .filter(Student.id == student_id)
        .first()
    )

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found",
        )

    # -----------------------------------------------------
    # FILE NAME
    # -----------------------------------------------------

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="File name is required",
        )

    # -----------------------------------------------------
    # EXTENSION CHECK
    # -----------------------------------------------------

    extension = Path(file.filename).suffix.lower()

    allowed_extensions = {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
    }

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=(
                "Profile images must be JPG, JPEG, PNG, "
                "or WEBP"
            ),
        )

    # -----------------------------------------------------
    # READ FILE
    # -----------------------------------------------------

    file_data = await file.read()

    if not file_data:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty",
        )

    # -----------------------------------------------------
    # CONTENT TYPE
    # -----------------------------------------------------

    content_type = file.content_type

    allowed_content_types = {
        "image/jpeg",
        "image/png",
        "image/webp",
    }

    if content_type not in allowed_content_types:
        raise HTTPException(
            status_code=400,
            detail="Invalid profile image content type",
        )

    # -----------------------------------------------------
    # GENERAL STORAGE VALIDATION
    # -----------------------------------------------------

    try:
        storage_service.validate_file(
            file_name=file.filename,
            file_size=len(file_data),
            content_type=content_type,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )

    # -----------------------------------------------------
    # UNIQUE FILE NAME
    # -----------------------------------------------------

    unique_name = f"{uuid4()}{extension}"

    # -----------------------------------------------------
    # STORAGE
    # -----------------------------------------------------

    bucket = "profile-assets"

    file_path = (
        f"{student_id}/"
        f"profile/"
        f"{unique_name}"
    )

    # -----------------------------------------------------
    # UPLOAD TO SUPABASE
    # -----------------------------------------------------

    try:
        storage_service.upload_file(
            bucket=bucket,
            file_path=file_path,
            file_data=file_data,
            content_type=content_type,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Profile asset upload failed: {str(exc)}",
        )

    # -----------------------------------------------------
    # DATABASE RECORD
    # -----------------------------------------------------

    stored_file_data = StoredFileCreate(
        bucket=bucket,
        file_path=file_path,
        file_name=file.filename,
        content_type=content_type,
        file_size=len(file_data),
        student_id=student_id,
        uploaded_by=current_user.id,
    )

    try:
        stored_file = create_stored_file(
            db,
            stored_file_data,
        )
    except Exception:

        try:
            storage_service.delete_file(
                bucket=bucket,
                file_path=file_path,
            )
        except Exception:
            pass

        raise HTTPException(
            status_code=500,
            detail="Profile asset record could not be created",
        )

    return stored_file


# =========================================================
# RESEARCH FILE UPLOAD
# =========================================================

@router.post(
    "/upload/research",
    response_model=StoredFileResponse,
)
async def upload_research_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Upload a research-related file.

    Allowed roles:
        Faculty
        HOD
        Admin
        Super Admin

    After the StoredFile record is created,
    a knowledge-ingestion record is automatically
    created with status = pending.
    """

    # -----------------------------------------------------
    # ACCESS CHECK
    # -----------------------------------------------------

    allowed_roles = {
        UserRole.FACULTY.value,
        UserRole.HOD.value,
        UserRole.ADMIN.value,
        UserRole.SUPER_ADMIN.value,
    }

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "Only faculty, HOD, admins, and "
                "super admins can upload research files"
            ),
        )

    # -----------------------------------------------------
    # FILE NAME VALIDATION
    # -----------------------------------------------------

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="File name is required",
        )

    # -----------------------------------------------------
    # READ FILE
    # -----------------------------------------------------

    file_data = await file.read()

    if not file_data:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty",
        )

    # -----------------------------------------------------
    # CONTENT TYPE
    # -----------------------------------------------------

    content_type = (
        file.content_type
        or "application/octet-stream"
    )

    # -----------------------------------------------------
    # STORAGE VALIDATION
    # -----------------------------------------------------

    try:
        storage_service.validate_file(
            file_name=file.filename,
            file_size=len(file_data),
            content_type=content_type,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )

    # -----------------------------------------------------
    # FILE EXTENSION
    # -----------------------------------------------------

    extension = Path(
        file.filename
    ).suffix.lower()

    # -----------------------------------------------------
    # UNIQUE FILE NAME
    # -----------------------------------------------------

    unique_name = f"{uuid4()}{extension}"

    # -----------------------------------------------------
    # STORAGE LOCATION
    # -----------------------------------------------------

    bucket = "research-files"

    file_path = (
        f"research/"
        f"{unique_name}"
    )

    # -----------------------------------------------------
    # UPLOAD TO SUPABASE STORAGE
    # -----------------------------------------------------

    try:
        storage_service.upload_file(
            bucket=bucket,
            file_path=file_path,
            file_data=file_data,
            content_type=content_type,
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=(
                f"Research file upload failed: {str(exc)}"
            ),
        )

    # -----------------------------------------------------
    # DATABASE RECORD
    # -----------------------------------------------------

    stored_file_data = StoredFileCreate(
        bucket=bucket,
        file_path=file_path,
        file_name=file.filename,
        content_type=content_type,
        file_size=len(file_data),
        student_id=None,
        project_id=None,
        project_evidence_id=None,
        uploaded_by=current_user.id,
    )

    # -----------------------------------------------------
    # CREATE DATABASE RECORD + PENDING INGESTION
    # -----------------------------------------------------

    try:
        stored_file = create_research_stored_file(
            db,
            stored_file_data,
        )

    except Exception:

        # -------------------------------------------------
        # CLEAN UP STORAGE IF DATABASE INSERT FAILS
        # -------------------------------------------------

        try:
            storage_service.delete_file(
                bucket=bucket,
                file_path=file_path,
            )
        except Exception:
            pass

        raise HTTPException(
            status_code=500,
            detail=(
                "Research file record "
                "could not be created"
            ),
        )

    return stored_file


# =========================================================
# PROJECT EVIDENCE FILE UPLOAD
# =========================================================

@router.post(
    "/upload/project-evidence/{project_evidence_id}",
    response_model=StoredFileResponse,
)
async def upload_project_evidence_file(
    project_evidence_id: int,
    file: UploadFile = File(...),
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Upload a file associated with project evidence.
    """

    allowed_roles = {
        UserRole.STUDENT.value,
        UserRole.FACULTY.value,
        UserRole.HOD.value,
        UserRole.ADMIN.value,
        UserRole.SUPER_ADMIN.value,
    }

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to upload files",
        )

    # -----------------------------------------------------
    # GET PROJECT EVIDENCE
    # -----------------------------------------------------

    project_evidence = get_project_evidence(
        db,
        project_evidence_id,
    )

    if project_evidence is None:
        raise HTTPException(
            status_code=404,
            detail="Project evidence not found",
        )

    # -----------------------------------------------------
    # STUDENT PROJECT ACCESS
    # -----------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        membership = (
            db.query(ProjectMember)
            .filter(
                ProjectMember.project_id
                == project_evidence.project_id,
                ProjectMember.student_id
                == current_user.student_id,
            )
            .first()
        )

        if membership is None:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only upload files "
                    "to projects they belong to"
                ),
            )

    # -----------------------------------------------------
    # FILE VALIDATION
    # -----------------------------------------------------

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="File name is required",
        )

    file_data = await file.read()

    if not file_data:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty",
        )

    content_type = (
        file.content_type
        or "application/octet-stream"
    )

    try:
        storage_service.validate_file(
            file_name=file.filename,
            file_size=len(file_data),
            content_type=content_type,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )

    # -----------------------------------------------------
    # STORAGE PATH
    # -----------------------------------------------------

    extension = Path(file.filename).suffix.lower()

    unique_name = f"{uuid4()}{extension}"

    bucket = "project-evidence"

    file_path = (
        f"{project_evidence.project_id}/"
        f"evidence/"
        f"{project_evidence_id}/"
        f"{unique_name}"
    )

    # -----------------------------------------------------
    # UPLOAD
    # -----------------------------------------------------

    try:
        storage_service.upload_file(
            bucket=bucket,
            file_path=file_path,
            file_data=file_data,
            content_type=content_type,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"File upload failed: {str(exc)}",
        )

    # -----------------------------------------------------
    # DATABASE RECORD
    # -----------------------------------------------------

    stored_file_data = StoredFileCreate(
        bucket=bucket,
        file_path=file_path,
        file_name=file.filename,
        content_type=content_type,
        file_size=len(file_data),
        student_id=(
            current_user.student_id
            if current_user.role
            == UserRole.STUDENT.value
            else None
        ),
        project_id=project_evidence.project_id,
        project_evidence_id=project_evidence_id,
        uploaded_by=current_user.id,
    )

    try:
        stored_file = create_stored_file(
            db,
            stored_file_data,
        )
    except Exception:

        try:
            storage_service.delete_file(
                bucket=bucket,
                file_path=file_path,
            )
        except Exception:
            pass

        raise HTTPException(
            status_code=500,
            detail="File record could not be created",
        )

    return stored_file


# =========================================================
# LIST ALL FILES
# =========================================================

@router.get(
    "/",
    response_model=list[StoredFileResponse],
)
def list_stored_files(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List all stored file records.
    """

    if not is_institutional_user(current_user):
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to list stored files",
        )

    return get_stored_files(db)


# =========================================================
# LIST STUDENT FILES
# =========================================================

@router.get(
    "/student/{student_id}",
    response_model=list[StoredFileResponse],
)
def list_student_files(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve files belonging to a student.
    """

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail="Students can only access their own files",
            )

    elif not is_institutional_user(current_user):
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to access student files",
        )

    return get_student_files(
        db,
        student_id,
    )


# =========================================================
# LIST PROJECT FILES
# =========================================================

@router.get(
    "/project/{project_id}",
    response_model=list[StoredFileResponse],
)
def list_project_files(
    project_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve files belonging to a project.
    """

    if not is_institutional_user(current_user):
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to access project files",
        )

    return get_project_files(
        db,
        project_id,
    )


# =========================================================
# LIST PROJECT EVIDENCE FILES
# =========================================================

@router.get(
    "/evidence/{project_evidence_id}",
    response_model=list[StoredFileResponse],
)
def list_project_evidence_files_endpoint(
    project_evidence_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve files attached to project evidence.
    """

    if not is_institutional_user(current_user):
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to access evidence files",
        )

    return get_project_evidence_files(
        db,
        project_evidence_id,
    )


# =========================================================
# GET SINGLE FILE
# =========================================================

@router.get(
    "/{file_id}",
    response_model=StoredFileResponse,
)
def read_stored_file(
    file_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single stored file record.
    """

    stored_file = get_stored_file(
        db,
        file_id,
    )

    if stored_file is None:
        raise HTTPException(
            status_code=404,
            detail="Stored file not found",
        )

    if current_user.role == UserRole.STUDENT.value:

        if stored_file.student_id != current_user.student_id:
            raise HTTPException(
                status_code=403,
                detail="You do not have access to this file",
            )

    elif not is_institutional_user(current_user):

        raise HTTPException(
            status_code=403,
            detail="You do not have permission to access files",
        )

    return stored_file


# =========================================================
# CREATE SIGNED URL
# =========================================================

@router.get(
    "/{file_id}/signed-url",
)
def get_stored_file_signed_url(
    file_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Generate a temporary signed URL for a private file.
    """

    stored_file = get_stored_file(
        db,
        file_id,
    )

    if stored_file is None:
        raise HTTPException(
            status_code=404,
            detail="Stored file not found",
        )

    if current_user.role == UserRole.STUDENT.value:

        if stored_file.student_id != current_user.student_id:
            raise HTTPException(
                status_code=403,
                detail="You do not have access to this file",
            )

    elif not is_institutional_user(current_user):

        raise HTTPException(
            status_code=403,
            detail="You do not have permission to access this file",
        )

    try:
        result = storage_service.create_signed_url(
            bucket=stored_file.bucket,
            file_path=stored_file.file_path,
            expires_in=3600,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not generate signed URL: {str(exc)}",
        )

    if isinstance(result, dict):

        signed_url = (
            result.get("signedURL")
            or result.get("signedUrl")
            or result.get("signed_url")
        )

    else:
        signed_url = result

    return {
        "file_id": stored_file.id,
        "file_name": stored_file.file_name,
        "expires_in": 3600,
        "signed_url": signed_url,
    }


# =========================================================
# DELETE FILE
# =========================================================

@router.delete(
    "/{file_id}",
    response_model=StoredFileResponse,
)
def remove_stored_file(
    file_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Delete a file from Supabase Storage
    and the NEXUS database.

    Only Admin and Super Admin can delete files.
    """

    if not is_admin(current_user):
        raise HTTPException(
            status_code=403,
            detail="Only administrators can delete stored files",
        )

    stored_file = get_stored_file(
        db,
        file_id,
    )

    if stored_file is None:
        raise HTTPException(
            status_code=404,
            detail="Stored file not found",
        )

    try:
        storage_service.delete_file(
            bucket=stored_file.bucket,
            file_path=stored_file.file_path,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=(
                f"Could not delete file from storage: {str(exc)}"
            ),
        )

    deleted_file = delete_stored_file(
        db,
        file_id,
    )

    if deleted_file is None:
        raise HTTPException(
            status_code=404,
            detail="Stored file record not found",
        )

    return deleted_file