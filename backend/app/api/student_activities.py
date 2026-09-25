from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import READ_STUDENT_DATA, FACULTY_ROLES
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.models.student_activity import StudentActivity

from app.schemas.student_activity import (
    StudentActivityCreate,
    StudentActivityResponse,
)

from app.services.student_activity_service import (
    create_student_activity,
    get_student_activities,
    get_student_activity,
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
# CHECK STUDENT ACCESS
# =========================================================

def check_student_access(
    current_user,
    student_id: int,
):
    """
    Students can only access their own activities.

    Faculty / HOD / Management / Admin / Super Admin
    can access institutional student activity data.
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
                    "their own activities"
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
                "to access student activities"
            ),
        )


# =========================================================
# CREATE STUDENT ACTIVITY
# =========================================================

@router.post(
    "/",
    response_model=StudentActivityResponse,
)
def add_student_activity(
    student_activity_data: StudentActivityCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create a student activity.

    Students:
        Can create activities only for themselves.

    Faculty / HOD / Admin / Super Admin:
        Can create activities for students.

    Management:
        Read-only.
    """

    student_id = student_activity_data.student_id

    # -------------------------------------------------------
    # STUDENT OWNERSHIP
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only create "
                    "activities for themselves"
                ),
            )

    # -------------------------------------------------------
    # MANAGEMENT CANNOT WRITE
    # -------------------------------------------------------

    elif current_user.role == UserRole.MANAGEMENT.value:

        raise HTTPException(
            status_code=403,
            detail=(
                "Management cannot create "
                "student activities"
            ),
        )

    # -------------------------------------------------------
    # FACULTY / HOD / ADMIN / SUPER ADMIN
    # -------------------------------------------------------

    elif current_user.role not in get_role_values(
        FACULTY_ROLES
    ):

        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to create student activities"
            ),
        )

    return create_student_activity(
        db,
        student_activity_data,
    )


# =========================================================
# LIST STUDENT ACTIVITIES
# =========================================================

@router.get(
    "/",
    response_model=list[StudentActivityResponse],
)
def list_student_activities(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List institutional student activities.

    Students cannot access the complete
    institutional activity dataset.
    """

    # -------------------------------------------------------
    # STUDENT
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        raise HTTPException(
            status_code=403,
            detail=(
                "Students cannot access the "
                "complete student activity list"
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
                "to view student activities"
            ),
        )

    return get_student_activities(db)


# =========================================================
# GET SINGLE STUDENT ACTIVITY
# =========================================================

@router.get(
    "/{student_activity_id}",
    response_model=StudentActivityResponse,
)
def read_student_activity(
    student_activity_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single student activity.

    Students:
        Can access only their own activity.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access institutional activity data.
    """

    student_activity = get_student_activity(
        db,
        student_activity_id,
    )

    if student_activity is None:
        raise HTTPException(
            status_code=404,
            detail="Student activity not found",
        )

    # -------------------------------------------------------
    # OWNERSHIP CHECK
    # -------------------------------------------------------

    check_student_access(
        current_user,
        student_activity.student_id,
    )

    return student_activity