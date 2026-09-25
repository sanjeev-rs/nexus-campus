from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import READ_PROJECT_DATA
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.models.project_member import ProjectMember

from app.schemas.project_outcome import (
    ProjectOutcomeCreate,
    ProjectOutcomeResponse,
)

from app.services.project_outcome_service import (
    create_project_outcome,
    get_project_outcomes,
    get_project_outcome,
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
    a project's outcomes.

    Students:
        Must be members of the project.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access institutional project outcomes.
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
                    "Students can only access "
                    "outcomes of projects they belong to"
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
                "to access project outcomes"
            ),
        )


# =========================================================
# CREATE PROJECT OUTCOME
# =========================================================

@router.post(
    "/",
    response_model=ProjectOutcomeResponse,
)
def add_project_outcome(
    project_outcome_data: ProjectOutcomeCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Add an outcome to a project.

    Students:
        Can add outcomes to projects they belong to.

    Faculty / HOD / Admin / Super Admin:
        Can add project outcomes.

    Management:
        Cannot modify project outcomes.
    """

    check_project_access(
        current_user,
        project_outcome_data.project_id,
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
                "project outcomes"
            ),
        )

    return create_project_outcome(
        db,
        project_outcome_data,
    )


# =========================================================
# LIST PROJECT OUTCOMES
# =========================================================

@router.get(
    "/",
    response_model=list[ProjectOutcomeResponse],
)
def list_project_outcomes(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List institutional project outcomes.

    Students cannot access the complete
    institutional outcome dataset.
    """

    if current_user.role == UserRole.STUDENT.value:
        raise HTTPException(
            status_code=403,
            detail=(
                "Students cannot access the "
                "complete project outcome list"
            ),
        )

    if current_user.role not in get_role_values(
        READ_PROJECT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view project outcomes"
            ),
        )

    return get_project_outcomes(db)


# =========================================================
# GET SINGLE PROJECT OUTCOME
# =========================================================

@router.get(
    "/{project_outcome_id}",
    response_model=ProjectOutcomeResponse,
)
def read_project_outcome(
    project_outcome_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single project outcome.

    Students:
        Can access only outcomes belonging to
        projects they are members of.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access project outcomes.
    """

    project_outcome = get_project_outcome(
        db,
        project_outcome_id,
    )

    if project_outcome is None:
        raise HTTPException(
            status_code=404,
            detail="Project outcome not found",
        )

    check_project_access(
        current_user,
        project_outcome.project_id,
        db,
    )

    return project_outcome