from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    FACULTY_ROLES,
    READ_STUDENT_DATA,
    SYSTEM_ADMIN,
)
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.schemas.academic_record import (
    AcademicRecordCreate,
    AcademicRecordResponse,
)

from app.services.academic_record_service import (
    create_academic_record,
    get_academic_records,
    get_academic_record,
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
# CREATE ACADEMIC RECORD
# =========================================================

@router.post(
    "/",
    response_model=AcademicRecordResponse,
)
def add_academic_record(
    academic_record_data: AcademicRecordCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create an academic record.

    Allowed:
        Faculty
        HOD
        Admin
        Super Admin

    Students cannot create or modify
    academic records.
    """

    if current_user.role not in get_role_values(
        FACULTY_ROLES
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to create academic records"
            ),
        )

    return create_academic_record(
        db,
        academic_record_data,
    )


# =========================================================
# LIST ACADEMIC RECORDS
# =========================================================

@router.get(
    "/",
    response_model=list[AcademicRecordResponse],
)
def list_academic_records(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List academic records.

    Faculty / HOD / Management / Admin / Super Admin:
        Can view institutional academic records.

    Students:
        Cannot access the complete institutional list.
    """

    if current_user.role == UserRole.STUDENT.value:
        raise HTTPException(
            status_code=403,
            detail=(
                "Students cannot access the "
                "complete academic record list"
            ),
        )

    if current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view academic records"
            ),
        )

    return get_academic_records(db)


# =========================================================
# GET SINGLE ACADEMIC RECORD
# =========================================================

@router.get(
    "/{academic_record_id}",
    response_model=AcademicRecordResponse,
)
def read_academic_record(
    academic_record_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single academic record.

    Students can access only their own
    academic records.

    Faculty / HOD / Management / Admin /
    Super Admin can access academic records.
    """

    academic_record = get_academic_record(
        db,
        academic_record_id,
    )

    if academic_record is None:
        raise HTTPException(
            status_code=404,
            detail="Academic record not found",
        )

    # -------------------------------------------------------
    # STUDENT ACCESS
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != academic_record.student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only access "
                    "their own academic records"
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
                "to view this academic record"
            ),
        )

    return academic_record