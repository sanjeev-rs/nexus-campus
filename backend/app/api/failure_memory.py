from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    FACULTY_ROLES,
    MANAGEMENT_ROLES,
    WRITE_FAILURE_MEMORY,
)
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.models.failure_memory import FailureMemory
from app.models.project_member import ProjectMember
from app.models.project import Project

from app.schemas.failure_memory import (
    FailureMemoryCreate,
    FailureMemoryUpdate,
    FailureMemoryResponse,
)

from app.services.failure_memory_service import (
    get_failure,
    get_failures,
    create_failure,
    update_failure,
    delete_failure,
)

from app.services.failure_memory_engine import (
    analyze_failure,
    analyze_project_failures,
)


router = APIRouter()


# ============================================================
# ROLE HELPER
# ============================================================

def get_role_values(roles):
    """
    Convert UserRole enums into string values.
    """
    return {
        role.value
        if isinstance(role, UserRole)
        else role
        for role in roles
    }


# ============================================================
# CHECK FAILURE MEMORY READ ACCESS
# ============================================================

def check_failure_read_access(
    current_user,
    project_id: int,
    db: Session,
):
    """
    Check whether the authenticated NEXUS user can view
    failure memory belonging to a project.

    Students:
        Can access only projects they belong to.

    Faculty / HOD / Admin / Super Admin:
        Can access institutional failure memory.

    Management:
        Can access failure memory as read-only intelligence.
    """

    # --------------------------------------------------------
    # STUDENT
    # --------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id is None:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Student account is not linked "
                    "to a student profile"
                ),
            )

        membership = (
            db.query(ProjectMember)
            .filter(
                ProjectMember.project_id == project_id,
                ProjectMember.student_id == current_user.student_id,
            )
            .first()
        )

        if not membership:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only access failure memory "
                    "for projects they are members of"
                ),
            )

        return

    # --------------------------------------------------------
    # FACULTY / HOD / ADMIN / SUPER ADMIN
    # --------------------------------------------------------

    if current_user.role in get_role_values(
        FACULTY_ROLES
    ):
        return

    # --------------------------------------------------------
    # MANAGEMENT
    # --------------------------------------------------------

    if current_user.role in get_role_values(
        MANAGEMENT_ROLES
    ):
        return

    # --------------------------------------------------------
    # DENIED
    # --------------------------------------------------------

    raise HTTPException(
        status_code=403,
        detail=(
            "You do not have permission "
            "to access failure memory"
        ),
    )


# ============================================================
# GET ALL FAILURE MEMORIES
# ============================================================

@router.get(
    "/",
    response_model=list[FailureMemoryResponse],
)
def read_failures(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Return institutional failure memories.

    Students:
        Cannot access the complete institutional list.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access the institutional failure memory list.
    """

    # --------------------------------------------------------
    # STUDENT
    # --------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:
        raise HTTPException(
            status_code=403,
            detail=(
                "Students must access failure memory "
                "through a specific project"
            ),
        )

    # --------------------------------------------------------
    # ALLOWED INSTITUTIONAL ROLES
    # --------------------------------------------------------

    allowed_roles = (
        get_role_values(FACULTY_ROLES)
        | get_role_values(MANAGEMENT_ROLES)
    )

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access failure memory"
            ),
        )

    return get_failures(db)


# ============================================================
# GET SINGLE FAILURE MEMORY
# ============================================================

@router.get(
    "/{failure_id}",
    response_model=FailureMemoryResponse,
)
def read_failure(
    failure_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single failure memory.
    """

    failure = get_failure(
        db,
        failure_id,
    )

    if not failure:
        raise HTTPException(
            status_code=404,
            detail="Failure memory not found",
        )

    check_failure_read_access(
        current_user,
        failure.project_id,
        db,
    )

    return failure


# ============================================================
# CREATE FAILURE MEMORY
# ============================================================

@router.post(
    "/",
    response_model=FailureMemoryResponse,
)
def create_new_failure(
    failure_data: FailureMemoryCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create a failure memory.

    Allowed:

        Faculty
        HOD
        Admin
        Super Admin

    Students:
        Cannot create failure memory.

    Management:
        Read-only.
    """

    # --------------------------------------------------------
    # WRITE PERMISSION
    # --------------------------------------------------------

    if current_user.role not in get_role_values(
        WRITE_FAILURE_MEMORY
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to create failure memory"
            ),
        )

    # --------------------------------------------------------
    # VERIFY PROJECT EXISTS
    # --------------------------------------------------------

    project = (
        db.query(Project)
        .filter(
            Project.id == failure_data.project_id
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return create_failure(
        db,
        failure_data,
    )


# ============================================================
# UPDATE FAILURE MEMORY
# ============================================================

@router.put(
    "/{failure_id}",
    response_model=FailureMemoryResponse,
)
def update_existing_failure(
    failure_id: int,
    failure_data: FailureMemoryUpdate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Update an existing failure memory.

    Allowed:

        Faculty
        HOD
        Admin
        Super Admin

    Management:
        Read-only.

    Students:
        Cannot update failure memory.
    """

    # --------------------------------------------------------
    # WRITE PERMISSION
    # --------------------------------------------------------

    if current_user.role not in get_role_values(
        WRITE_FAILURE_MEMORY
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to update failure memory"
            ),
        )

    # --------------------------------------------------------
    # FIND EXISTING FAILURE
    # --------------------------------------------------------

    existing_failure = get_failure(
        db,
        failure_id,
    )

    if not existing_failure:
        raise HTTPException(
            status_code=404,
            detail="Failure memory not found",
        )

    # --------------------------------------------------------
    # UPDATE
    # --------------------------------------------------------

    failure = update_failure(
        db,
        failure_id,
        failure_data,
    )

    if not failure:
        raise HTTPException(
            status_code=404,
            detail="Failure memory not found",
        )

    return failure


# ============================================================
# DELETE FAILURE MEMORY
# ============================================================

@router.delete(
    "/{failure_id}",
)
def delete_existing_failure(
    failure_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Delete failure memory.

    Only Admin and Super Admin can delete it.
    """

    if current_user.role not in {
        UserRole.ADMIN.value,
        UserRole.SUPER_ADMIN.value,
    }:
        raise HTTPException(
            status_code=403,
            detail=(
                "Only administrators can delete "
                "failure memory"
            ),
        )

    failure = delete_failure(
        db,
        failure_id,
    )

    if not failure:
        raise HTTPException(
            status_code=404,
            detail="Failure memory not found",
        )

    return {
        "message": "Failure memory deleted successfully",
        "failure_id": failure_id,
    }


# ============================================================
# ANALYZE FAILURE
# ============================================================

@router.get(
    "/{failure_id}/analysis",
)
def analyze_single_failure(
    failure_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Analyze a specific failure memory.
    """

    failure = get_failure(
        db,
        failure_id,
    )

    if not failure:
        raise HTTPException(
            status_code=404,
            detail="Failure memory not found",
        )

    check_failure_read_access(
        current_user,
        failure.project_id,
        db,
    )

    analysis = analyze_failure(
        db,
        failure_id,
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Failure analysis not found",
        )

    return analysis


# ============================================================
# ANALYZE PROJECT FAILURE HISTORY
# ============================================================

@router.get(
    "/project/{project_id}/analysis",
)
def analyze_project_failure_history(
    project_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Analyze all recorded failures belonging to a project.
    """

    # --------------------------------------------------------
    # VERIFY PROJECT EXISTS
    # --------------------------------------------------------

    project = (
        db.query(Project)
        .filter(
            Project.id == project_id
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    # --------------------------------------------------------
    # ACCESS CONTROL
    # --------------------------------------------------------

    check_failure_read_access(
        current_user,
        project_id,
        db,
    )

    return analyze_project_failures(
        db,
        project_id,
    )