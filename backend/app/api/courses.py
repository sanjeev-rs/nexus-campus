from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    READ_STUDENT_DATA,
    SYSTEM_ADMIN,
)
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.schemas.course import (
    CourseCreate,
    CourseResponse,
)

from app.services.course_service import (
    create_course,
    get_courses,
    get_course,
)


router = APIRouter()


# =========================================================
# ROLE HELPER
# =========================================================

def get_role_values(roles):
    return {
        role.value
        for role in roles
    }


# =========================================================
# CREATE COURSE
# =========================================================

@router.post(
    "/",
    response_model=CourseResponse,
)
def add_course(
    course_data: CourseCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create a course.

    Allowed:
        Admin
        Super Admin
    """

    if current_user.role not in get_role_values(
        SYSTEM_ADMIN
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to create courses"
            ),
        )

    return create_course(
        db,
        course_data,
    )


# =========================================================
# LIST COURSES
# =========================================================

@router.get(
    "/",
    response_model=list[CourseResponse],
)
def list_courses(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List all courses.

    All authenticated NEXUS roles can view
    course information.
    """

    if current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view courses"
            ),
        )

    return get_courses(db)


# =========================================================
# GET SINGLE COURSE
# =========================================================

@router.get(
    "/{course_id}",
    response_model=CourseResponse,
)
def read_course(
    course_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single course.

    All authenticated NEXUS roles can view
    course information.
    """

    if current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view courses"
            ),
        )

    course = get_course(
        db,
        course_id,
    )

    if course is None:
        raise HTTPException(
            status_code=404,
            detail="Course not found",
        )

    return course