from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    FACULTY_ROLES,
    READ_STUDENT_DATA,
)
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.schemas.enrollments import (
    EnrollmentCreate,
    EnrollmentUpdate,
    EnrollmentResponse,
)

from app.services.enrollments_service import (
    get_enrollment,
    get_enrollments,
    get_student_enrollments,
    create_enrollment,
    update_enrollment,
    delete_enrollment,
)


# ============================================================
# ROUTER
# ============================================================

router = APIRouter()


# ============================================================
# ROLE HELPER
# ============================================================

def get_role_values(roles):
    """
    Convert UserRole enums into their string values.
    """

    return {
        role.value
        if isinstance(role, UserRole)
        else role
        for role in roles
    }


# ============================================================
# CHECK STUDENT OWNERSHIP
# ============================================================

def check_student_access(
    current_user,
    student_id: int,
):
    """
    Students can only access their own enrollment records.
    """

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only access "
                    "their own enrollment records"
                ),
            )


# ============================================================
# CREATE ENROLLMENT
# ============================================================

@router.post(
    "/",
    response_model=EnrollmentResponse,
)
def create_new_enrollment(
    enrollment_data: EnrollmentCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create a student enrollment.

    Allowed roles:

        Faculty
        HOD
        Admin
        Super Admin

    Students cannot directly create enrollment records.
    Management is read-only.
    """

    allowed_roles = get_role_values(
        FACULTY_ROLES
    )

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to create enrollment records"
            ),
        )

    return create_enrollment(
        db,
        enrollment_data,
    )


# ============================================================
# GET ALL ENROLLMENTS
# ============================================================

@router.get(
    "/",
    response_model=list[EnrollmentResponse],
)
def read_enrollments(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Return all enrollment records.

    Allowed roles:

        Faculty
        HOD
        Management
        Admin
        Super Admin

    Students cannot access the complete enrollment list.
    """

    allowed_roles = get_role_values(
        READ_STUDENT_DATA
    )

    if current_user.role == UserRole.STUDENT.value:
        raise HTTPException(
            status_code=403,
            detail=(
                "Students cannot access "
                "the complete enrollment list"
            ),
        )

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access enrollment records"
            ),
        )

    return get_enrollments(db)


# ============================================================
# GET STUDENT ENROLLMENTS
# ============================================================

@router.get(
    "/student/{student_id}",
    response_model=list[EnrollmentResponse],
)
def read_student_enrollments(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Return enrollment records for a specific student.

    Students:
        Can access only their own enrollments.

    Faculty / HOD / Admin / Super Admin:
        Can access student enrollments.

    Management:
        Cannot access individual student enrollment records.
    """

    check_student_access(
        current_user,
        student_id,
    )

    if current_user.role != UserRole.STUDENT.value:

        allowed_roles = get_role_values(
            FACULTY_ROLES
        )

        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=403,
                detail=(
                    "You do not have permission "
                    "to access student enrollments"
                ),
            )

    enrollments = get_student_enrollments(
        db,
        student_id,
    )

    return enrollments


# ============================================================
# GET SINGLE ENROLLMENT
# ============================================================

@router.get(
    "/{enrollment_id}",
    response_model=EnrollmentResponse,
)
def read_enrollment(
    enrollment_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Return a single enrollment record.

    Students:
        Can access only their own enrollment.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access enrollment records.
    """

    enrollment = get_enrollment(
        db,
        enrollment_id,
    )

    if not enrollment:
        raise HTTPException(
            status_code=404,
            detail="Enrollment not found",
        )

    # --------------------------------------------------------
    # STUDENT
    # --------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != enrollment.student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only access "
                    "their own enrollment records"
                ),
            )

        return enrollment

    # --------------------------------------------------------
    # INSTITUTIONAL ROLES
    # --------------------------------------------------------

    allowed_roles = get_role_values(
        READ_STUDENT_DATA
    )

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access this enrollment"
            ),
        )

    return enrollment


# ============================================================
# UPDATE ENROLLMENT
# ============================================================

@router.put(
    "/{enrollment_id}",
    response_model=EnrollmentResponse,
)
def update_existing_enrollment(
    enrollment_id: int,
    enrollment_data: EnrollmentUpdate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Update an enrollment record.

    Allowed roles:

        Faculty
        HOD
        Admin
        Super Admin

    Students and Management cannot modify enrollments.
    """

    allowed_roles = get_role_values(
        FACULTY_ROLES
    )

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to update enrollment records"
            ),
        )

    enrollment = update_enrollment(
        db,
        enrollment_id,
        enrollment_data,
    )

    if not enrollment:
        raise HTTPException(
            status_code=404,
            detail="Enrollment not found",
        )

    return enrollment


# ============================================================
# DELETE ENROLLMENT
# ============================================================

@router.delete(
    "/{enrollment_id}"
)
def delete_existing_enrollment(
    enrollment_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Delete an enrollment record.

    Allowed roles:

        Admin
        Super Admin
    """

    allowed_roles = {
        UserRole.ADMIN.value,
        UserRole.SUPER_ADMIN.value,
    }

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "Only administrators can "
                "delete enrollment records"
            ),
        )

    enrollment = delete_enrollment(
        db,
        enrollment_id,
    )

    if not enrollment:
        raise HTTPException(
            status_code=404,
            detail="Enrollment not found",
        )

    return {
        "message": "Enrollment deleted successfully",
        "enrollment_id": enrollment_id,
    }