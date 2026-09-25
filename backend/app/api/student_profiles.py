from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import READ_STUDENT_DATA, FACULTY_ROLES
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.models.student_profile import StudentProfile

from app.schemas.student_profile import (
    StudentProfileCreate,
    StudentProfileResponse,
)

from app.services.student_profile_service import (
    create_student_profile,
    get_student_profiles,
    get_student_profile,
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
# CHECK STUDENT PROFILE ACCESS
# =========================================================

def check_student_profile_access(
    current_user,
    student_id: int,
):
    """
    Students can only access their own profile.

    Faculty / HOD / Admin / Super Admin can access
    institutional student profiles.

    Management can read profiles.
    """

    # -------------------------------------------------------
    # STUDENT
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only access "
                    "their own profile"
                ),
            )

        return

    # -------------------------------------------------------
    # OTHER ROLES
    # -------------------------------------------------------

    if current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access student profiles"
            ),
        )


# =========================================================
# CREATE STUDENT PROFILE
# =========================================================

@router.post(
    "/",
    response_model=StudentProfileResponse,
)
def add_student_profile(
    student_profile_data: StudentProfileCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create a student profile.

    Students:
        Can create only their own profile.

    Faculty / HOD / Admin / Super Admin:
        Can create profiles.

    Management:
        Read-only.
    """

    student_id = student_profile_data.student_id

    # -------------------------------------------------------
    # STUDENT OWNERSHIP
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only create "
                    "their own profile"
                ),
            )

    # -------------------------------------------------------
    # MANAGEMENT CANNOT CREATE
    # -------------------------------------------------------

    elif current_user.role == UserRole.MANAGEMENT.value:

        raise HTTPException(
            status_code=403,
            detail=(
                "Management cannot create "
                "student profiles"
            ),
        )

    # -------------------------------------------------------
    # CHECK INSTITUTIONAL ROLE
    # -------------------------------------------------------

    elif current_user.role not in get_role_values(
        FACULTY_ROLES
    ):

        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to create student profiles"
            ),
        )

    # -------------------------------------------------------
    # PREVENT DUPLICATE PROFILE
    # -------------------------------------------------------

    existing_profile = (
        db.query(StudentProfile)
        .filter(
            StudentProfile.student_id == student_id
        )
        .first()
    )

    if existing_profile:
        raise HTTPException(
            status_code=409,
            detail=(
                "A profile already exists "
                "for this student"
            ),
        )

    return create_student_profile(
        db,
        student_profile_data,
    )


# =========================================================
# LIST STUDENT PROFILES
# =========================================================

@router.get(
    "/",
    response_model=list[StudentProfileResponse],
)
def list_student_profiles(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List student profiles.

    Students cannot retrieve the complete
    institutional profile dataset.

    Faculty / HOD / Management / Admin / Super Admin
    can access institutional profiles.
    """

    # -------------------------------------------------------
    # STUDENT
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        raise HTTPException(
            status_code=403,
            detail=(
                "Students cannot access the "
                "complete student profile list"
            ),
        )

    # -------------------------------------------------------
    # ROLE CHECK
    # -------------------------------------------------------

    if current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view student profiles"
            ),
        )

    return get_student_profiles(db)


# =========================================================
# GET SINGLE STUDENT PROFILE
# =========================================================

@router.get(
    "/{student_profile_id}",
    response_model=StudentProfileResponse,
)
def read_student_profile(
    student_profile_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single student profile.

    Students:
        Can only access their own profile.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access institutional profiles.
    """

    student_profile = get_student_profile(
        db,
        student_profile_id,
    )

    if student_profile is None:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found",
        )

    # -------------------------------------------------------
    # OWNERSHIP CHECK
    # -------------------------------------------------------

    check_student_profile_access(
        current_user,
        student_profile.student_id,
    )

    return student_profile