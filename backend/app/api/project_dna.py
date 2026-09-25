from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import READ_PROJECT_DATA, FACULTY_ROLES
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.models.project_member import ProjectMember

from app.schemas.project_dna import (
    ProjectDNAResponse,
)

from app.services.project_dna_service import (
    get_project_dna,
)

from app.services.project_dna_engine import (
    analyze_project_dna,
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
# CHECK PROJECT ACCESS
# ============================================================

def check_project_access(
    current_user,
    project_id: int,
    db: Session,
):
    """
    Check whether the authenticated user can access
    a project's Project DNA.

    Students:
        Can access only projects they belong to.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access institutional project intelligence.
    """

    # --------------------------------------------------------
    # STUDENT
    # --------------------------------------------------------

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
                    "Project DNA of projects they belong to"
                ),
            )

        return

    # --------------------------------------------------------
    # OTHER ROLES
    # --------------------------------------------------------

    if current_user.role not in get_role_values(
        READ_PROJECT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access Project DNA"
            ),
        )


# ============================================================
# PROJECT DNA DATA
# ============================================================

@router.get(
    "/{project_id}",
    response_model=ProjectDNAResponse,
)
def read_project_dna(
    project_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve Project DNA data.

    Students:
        Can access only projects they belong to.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access project DNA.
    """

    check_project_access(
        current_user,
        project_id,
        db,
    )

    dna = get_project_dna(
        db,
        project_id,
    )

    if not dna:
        raise HTTPException(
            status_code=404,
            detail="Project DNA not found",
        )

    return {
        "project_id": project_id,
        "skills": dna["skills"],
        "members": dna["members"],
        "outcomes": dna["outcomes"],
        "evidence": dna["evidence"],
    }


# ============================================================
# PROJECT DNA INTELLIGENCE ANALYSIS
# ============================================================

@router.get(
    "/{project_id}/analysis",
)
def analyze_project(
    project_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Generate Project DNA intelligence analysis.

    Students:
        Can analyze only projects they belong to.

    Faculty / HOD / Management / Admin / Super Admin:
        Can analyze project DNA.
    """

    check_project_access(
        current_user,
        project_id,
        db,
    )

    analysis = analyze_project_dna(
        db,
        project_id,
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return analysis