from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    READ_STUDENT_DATA,
    SYSTEM_ADMIN,
)
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.schemas.faculty import (
    FacultyCreate,
    FacultyResponse,
)

from app.services.faculty_service import (
    create_faculty,
    get_faculty_members,
    get_faculty,
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
# CREATE FACULTY
# =========================================================

@router.post(
    "/",
    response_model=FacultyResponse,
)
def add_faculty(
    faculty_data: FacultyCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create a faculty record.

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
                "to create faculty records"
            ),
        )

    return create_faculty(
        db,
        faculty_data,
    )


# =========================================================
# LIST FACULTY
# =========================================================

@router.get(
    "/",
    response_model=list[FacultyResponse],
)
def list_faculty(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List faculty members.

    All authenticated NEXUS roles can view
    faculty information.
    """

    if current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view faculty information"
            ),
        )

    return get_faculty_members(db)


# =========================================================
# GET SINGLE FACULTY
# =========================================================

@router.get(
    "/{faculty_id}",
    response_model=FacultyResponse,
)
def read_faculty(
    faculty_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single faculty member.

    All authenticated NEXUS roles can view
    faculty information.
    """

    if current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view faculty information"
            ),
        )

    faculty = get_faculty(
        db,
        faculty_id,
    )

    if faculty is None:
        raise HTTPException(
            status_code=404,
            detail="Faculty not found",
        )

    return faculty