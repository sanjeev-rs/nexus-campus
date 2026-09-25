from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    FACULTY_ROLES,
    ADMIN_ROLES,
)
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.services.student_twin_service import (
    get_student_twin,
    create_student_twin,
    update_student_twin,
    delete_student_twin,
)

from app.services.student_twin_engine import (
    generate_student_twin,
)

from app.schemas.student_twin import (
    StudentTwinCreate,
    StudentTwinUpdate,
    StudentTwinResponse,
)


router = APIRouter()


# ============================================================
# ROLE HELPERS
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
# CHECK STUDENT TWIN READ ACCESS
# ============================================================

def check_student_twin_access(
    current_user,
    student_id: int,
):
    """
    Check whether the authenticated NEXUS user
    can access a particular student's Student Twin.

    Students:
        Can access only their own Twin.

    Faculty / HOD / Admin / Super Admin:
        Can access Student Twins.

    Management:
        Cannot access individual Student Twins.
    """

    # --------------------------------------------------------
    # STUDENT
    # --------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only access "
                    "their own Student Twin"
                ),
            )

        return

    # --------------------------------------------------------
    # FACULTY / HOD / ADMIN / SUPER ADMIN
    # --------------------------------------------------------

    if current_user.role not in get_role_values(
        FACULTY_ROLES
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access Student Twins"
            ),
        )


# ============================================================
# GET STUDENT TWIN
# ============================================================

@router.get(
    "/{student_id}",
    response_model=StudentTwinResponse,
)
def read_student_twin(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a Student Twin.

    Students:
        Own Twin only.

    Faculty / HOD / Admin / Super Admin:
        Any student's Twin.
    """

    check_student_twin_access(
        current_user,
        student_id,
    )

    twin = get_student_twin(
        db,
        student_id,
    )

    if not twin:
        raise HTTPException(
            status_code=404,
            detail="Student Twin not found",
        )

    return twin


# ============================================================
# CREATE STUDENT TWIN
# ============================================================

@router.post(
    "/",
    response_model=StudentTwinResponse,
)
def create_new_student_twin(
    twin_data: StudentTwinCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create a Student Twin record.

    Allowed:
        Faculty
        HOD
        Admin
        Super Admin

    Students:
        Cannot manually create a Student Twin.

    Management:
        Cannot create a Student Twin.
    """

    # --------------------------------------------------------
    # WRITE PERMISSION
    # --------------------------------------------------------

    if current_user.role not in get_role_values(
        FACULTY_ROLES
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to create Student Twins"
            ),
        )

    # --------------------------------------------------------
    # CHECK IF TWIN ALREADY EXISTS
    # --------------------------------------------------------

    existing_twin = get_student_twin(
        db,
        twin_data.student_id,
    )

    if existing_twin:
        raise HTTPException(
            status_code=409,
            detail=(
                "A Student Twin already exists "
                "for this student"
            ),
        )

    return create_student_twin(
        db,
        twin_data,
    )


# ============================================================
# UPDATE STUDENT TWIN
# ============================================================

@router.put(
    "/{student_id}",
    response_model=StudentTwinResponse,
)
def update_existing_student_twin(
    student_id: int,
    twin_data: StudentTwinUpdate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Update a Student Twin.

    Allowed:
        Faculty
        HOD
        Admin
        Super Admin

    Students:
        Cannot manually modify their Twin.

    Management:
        Cannot modify Student Twins.
    """

    # --------------------------------------------------------
    # WRITE PERMISSION
    # --------------------------------------------------------

    if current_user.role not in get_role_values(
        FACULTY_ROLES
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to update Student Twins"
            ),
        )

    twin = update_student_twin(
        db,
        student_id,
        twin_data,
    )

    if not twin:
        raise HTTPException(
            status_code=404,
            detail="Student Twin not found",
        )

    return twin


# ============================================================
# GENERATE / REGENERATE STUDENT TWIN
# ============================================================

@router.post(
    "/{student_id}/generate",
)
def generate_new_student_twin(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Generate or regenerate a Student Twin.

    Students:
        Can generate their own Twin.

    Faculty / HOD / Admin / Super Admin:
        Can generate a Twin for any student.

    Management:
        Cannot generate individual Student Twins.
    """

    # --------------------------------------------------------
    # ACCESS CHECK
    # --------------------------------------------------------

    check_student_twin_access(
        current_user,
        student_id,
    )

    return generate_student_twin(
        db,
        student_id,
    )


# ============================================================
# DELETE STUDENT TWIN
# ============================================================

@router.delete(
    "/{student_id}",
)
def delete_existing_student_twin(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Delete a Student Twin.

    Only:
        Admin
        Super Admin

    can delete a Student Twin.
    """

    # --------------------------------------------------------
    # ADMIN CHECK
    # --------------------------------------------------------

    if current_user.role not in get_role_values(
        ADMIN_ROLES
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "Only administrators can delete "
                "Student Twins"
            ),
        )

    twin = delete_student_twin(
        db,
        student_id,
    )

    if not twin:
        raise HTTPException(
            status_code=404,
            detail="Student Twin not found",
        )

    return {
        "message": "Student Twin deleted successfully",
        "student_id": student_id,
    }