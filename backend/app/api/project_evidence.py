from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import READ_PROJECT_DATA
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.models.project_member import ProjectMember

from app.schemas.project_evidence import (
    ProjectEvidenceCreate,
    ProjectEvidenceResponse,
)

from app.services.project_evidence_service import (
    create_project_evidence,
    get_project_evidence_list,
    get_project_evidence,
)


router = APIRouter()


# =========================================================
# ROLE HELPER
# =========================================================

def get_role_values(roles):
    return {
        role.value
        if isinstance(role, UserRole)
        else role
        for role in roles
    }


# =========================================================
# CHECK PROJECT ACCESS
# =========================================================

def check_project_access(
    current_user,
    project_id: int,
    db: Session,
):
    """
    Check whether the current user can access
    evidence belonging to a project.

    Students:
        Can access only projects they belong to.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access institutional project data.
    """

    # -------------------------------------------------------
    # STUDENT
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

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
                    "Students can only access evidence "
                    "of projects they belong to"
                ),
            )

        return

    # -------------------------------------------------------
    # OTHER ROLES
    # -------------------------------------------------------

    if current_user.role not in get_role_values(
        READ_PROJECT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access project evidence"
            ),
        )


# =========================================================
# CREATE PROJECT EVIDENCE
# =========================================================

@router.post(
    "/",
    response_model=ProjectEvidenceResponse,
)
def add_project_evidence(
    project_evidence_data: ProjectEvidenceCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Add evidence to a project.

    Students:
        Can add evidence to projects they belong to.

    Faculty / HOD / Admin / Super Admin:
        Can add project evidence.

    Management:
        Read-only.
    """

    check_project_access(
        current_user,
        project_evidence_data.project_id,
        db,
    )

    # -------------------------------------------------------
    # MANAGEMENT CANNOT WRITE
    # -------------------------------------------------------

    if current_user.role == UserRole.MANAGEMENT.value:
        raise HTTPException(
            status_code=403,
            detail=(
                "Management cannot modify "
                "project evidence"
            ),
        )

    return create_project_evidence(
        db,
        project_evidence_data,
    )


# =========================================================
# LIST PROJECT EVIDENCE
# =========================================================

@router.get(
    "/",
    response_model=list[ProjectEvidenceResponse],
)
def list_project_evidence(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List institutional project evidence.

    Students cannot access the complete
    institutional evidence dataset.
    """

    # -------------------------------------------------------
    # STUDENT
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:
        raise HTTPException(
            status_code=403,
            detail=(
                "Students cannot access the "
                "complete project evidence list"
            ),
        )

    # -------------------------------------------------------
    # OTHER ROLES
    # -------------------------------------------------------

    if current_user.role not in get_role_values(
        READ_PROJECT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view project evidence"
            ),
        )

    return get_project_evidence_list(db)


# =========================================================
# GET SINGLE PROJECT EVIDENCE
# =========================================================

@router.get(
    "/{project_evidence_id}",
    response_model=ProjectEvidenceResponse,
)
def read_project_evidence(
    project_evidence_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single project evidence record.

    Students:
        Can access evidence only from projects
        they are members of.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access project evidence.
    """

    project_evidence = get_project_evidence(
        db,
        project_evidence_id,
    )

    if project_evidence is None:
        raise HTTPException(
            status_code=404,
            detail="Project evidence not found",
        )

    # -------------------------------------------------------
    # PROJECT ACCESS
    # -------------------------------------------------------

    check_project_access(
        current_user,
        project_evidence.project_id,
        db,
    )

    return project_evidence