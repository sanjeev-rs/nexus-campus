from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    READ_STUDENT_DATA,
    WRITE_STUDENT_DATA,
)
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.schemas.student import (
    StudentCreate,
    StudentResponse,
)

from app.services.student_service import (
    create_student,
    get_students,
    get_student,
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
# CREATE STUDENT
# =========================================================

@router.post(
    "/",
    response_model=StudentResponse,
)
def add_student(
    student_data: StudentCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create a student record.

    Allowed:
        Admin
        Super Admin
    """

    allowed_roles = get_role_values(
        WRITE_STUDENT_DATA
    )

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to create student records"
            ),
        )

    return create_student(
        db,
        student_data,
    )


# =========================================================
# LIST STUDENTS
# =========================================================

@router.get(
    "/",
    response_model=list[StudentResponse],
)
def list_students(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List student records.

    Faculty / HOD / Management / Admin / Super Admin:
        Can view the student list.

    Student:
        Cannot retrieve the complete student directory.
    """

    allowed_roles = get_role_values(
        READ_STUDENT_DATA
    )

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view student records"
            ),
        )

    # Students must not receive the entire
    # institutional student directory.
    if current_user.role == UserRole.STUDENT.value:
        raise HTTPException(
            status_code=403,
            detail=(
                "Students cannot access the "
                "complete student directory"
            ),
        )

    return get_students(db)


# =========================================================
# GET SINGLE STUDENT
# =========================================================

@router.get(
    "/{student_id}",
    response_model=StudentResponse,
)
def read_student(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single student.

    Student:
        Can access only their own record.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access student records.
    """

    # -------------------------------------------------------
    # STUDENT ACCESS
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only access "
                    "their own student record"
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
                "to view student records"
            ),
        )

    student = get_student(
        db,
        student_id,
    )

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found",
        )

    return student