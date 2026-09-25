from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    FACULTY_ROLES,
    READ_STUDENT_DATA,
)
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.schemas.student_skill import (
    StudentSkillCreate,
    StudentSkillResponse,
)

from app.services.student_skill_service import (
    create_student_skill,
    get_student_skills,
    get_student_skill,
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
# CREATE STUDENT SKILL
# =========================================================

@router.post(
    "/",
    response_model=StudentSkillResponse,
)
def add_student_skill(
    student_skill_data: StudentSkillCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create a student skill record.

    Students:
        Can add skills only to their own profile.

    Faculty / HOD / Admin / Super Admin:
        Can add skills for students.

    Management:
        Cannot create student skill records.
    """

    # -------------------------------------------------------
    # STUDENT
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_skill_data.student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only add "
                    "skills to their own profile"
                ),
            )

    # -------------------------------------------------------
    # FACULTY / HOD / ADMIN / SUPER ADMIN
    # -------------------------------------------------------

    elif current_user.role in get_role_values(
        FACULTY_ROLES
    ):
        pass

    # -------------------------------------------------------
    # OTHER ROLES
    # -------------------------------------------------------

    else:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to create student skills"
            ),
        )

    return create_student_skill(
        db,
        student_skill_data,
    )


# =========================================================
# LIST ALL STUDENT SKILLS
# =========================================================

@router.get(
    "/",
    response_model=list[StudentSkillResponse],
)
def list_student_skills(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List institutional student-skill records.

    Students cannot access the complete
    student-skill dataset.
    """

    if current_user.role == UserRole.STUDENT.value:
        raise HTTPException(
            status_code=403,
            detail=(
                "Students cannot access the "
                "complete student-skill list"
            ),
        )

    if current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view student skills"
            ),
        )

    return get_student_skills(db)


# =========================================================
# GET SINGLE STUDENT SKILL
# =========================================================

@router.get(
    "/{student_skill_id}",
    response_model=StudentSkillResponse,
)
def read_student_skill(
    student_skill_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single student-skill record.

    Students:
        Can access only their own skills.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access student skills.
    """

    student_skill = get_student_skill(
        db,
        student_skill_id,
    )

    if student_skill is None:
        raise HTTPException(
            status_code=404,
            detail="Student skill not found",
        )

    # -------------------------------------------------------
    # STUDENT OWNERSHIP CHECK
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_skill.student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only access "
                    "their own skills"
                ),
            )

    # -------------------------------------------------------
    # OTHER AUTHORIZED ROLES
    # -------------------------------------------------------

    elif current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view this student skill"
            ),
        )

    return student_skill