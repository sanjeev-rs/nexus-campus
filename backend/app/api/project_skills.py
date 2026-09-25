from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    FACULTY_ROLES,
    READ_PROJECT_DATA,
)
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.models.project_member import ProjectMember

from app.schemas.project_skill import (
    ProjectSkillCreate,
    ProjectSkillResponse,
)

from app.services.project_skill_service import (
    create_project_skill,
    get_project_skills,
    get_project_skill,
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
    allow_student_write: bool = False,
):
    """
    Check whether the current user can access a project.

    Students:
        Can access only projects they are members of.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access institutional projects.

    Student write access is allowed only when
    allow_student_write=True.
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
                    "skills of projects they belong to"
                ),
            )

        if not allow_student_write:
            return

        return

    # -------------------------------------------------------
    # OTHER AUTHORIZED ROLES
    # -------------------------------------------------------

    allowed_roles = get_role_values(
        READ_PROJECT_DATA
    )

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access project skills"
            ),
        )


# =========================================================
# CREATE PROJECT SKILL
# =========================================================

@router.post(
    "/",
    response_model=ProjectSkillResponse,
)
def add_project_skill(
    project_skill_data: ProjectSkillCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Add a skill to a project.

    Students:
        Can add skills only to projects they belong to.

    Faculty / HOD / Admin / Super Admin:
        Can add project skills.

    Management:
        Cannot modify project skills.
    """

    check_project_access(
        current_user,
        project_skill_data.project_id,
        db,
        allow_student_write=True,
    )

    # -------------------------------------------------------
    # MANAGEMENT CANNOT WRITE
    # -------------------------------------------------------

    if current_user.role == UserRole.MANAGEMENT.value:
        raise HTTPException(
            status_code=403,
            detail=(
                "Management cannot modify "
                "project skills"
            ),
        )

    return create_project_skill(
        db,
        project_skill_data,
    )


# =========================================================
# LIST PROJECT SKILLS
# =========================================================

@router.get(
    "/",
    response_model=list[ProjectSkillResponse],
)
def list_project_skills(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List project skills.

    Students cannot access the complete
    institutional project-skill dataset.
    """

    if current_user.role == UserRole.STUDENT.value:
        raise HTTPException(
            status_code=403,
            detail=(
                "Students cannot access the "
                "complete project-skill list"
            ),
        )

    if current_user.role not in get_role_values(
        READ_PROJECT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view project skills"
            ),
        )

    return get_project_skills(db)


# =========================================================
# GET SINGLE PROJECT SKILL
# =========================================================

@router.get(
    "/{project_skill_id}",
    response_model=ProjectSkillResponse,
)
def read_project_skill(
    project_skill_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single project-skill relationship.

    Students:
        Can access only skills belonging to projects
        they are members of.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access project skills.
    """

    project_skill = get_project_skill(
        db,
        project_skill_id,
    )

    if project_skill is None:
        raise HTTPException(
            status_code=404,
            detail="Project skill not found",
        )

    check_project_access(
        current_user,
        project_skill.project_id,
        db,
    )

    return project_skill