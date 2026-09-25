from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    READ_STUDENT_DATA,
    SYSTEM_ADMIN,
)
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.schemas.academic_year import (
    AcademicYearCreate,
    AcademicYearResponse,
)

from app.services.academic_year_service import (
    create_academic_year,
    get_academic_years,
    get_academic_year,
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
# CREATE ACADEMIC YEAR
# =========================================================

@router.post(
    "/",
    response_model=AcademicYearResponse,
)
def add_academic_year(
    academic_year_data: AcademicYearCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create an academic year.

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
                "to create academic years"
            ),
        )

    return create_academic_year(
        db,
        academic_year_data,
    )


# =========================================================
# LIST ACADEMIC YEARS
# =========================================================

@router.get(
    "/",
    response_model=list[AcademicYearResponse],
)
def list_academic_years(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List academic years.

    All authenticated NEXUS roles can view
    academic-year information.
    """

    if current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view academic years"
            ),
        )

    return get_academic_years(db)


# =========================================================
# GET SINGLE ACADEMIC YEAR
# =========================================================

@router.get(
    "/{academic_year_id}",
    response_model=AcademicYearResponse,
)
def read_academic_year(
    academic_year_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single academic year.

    All authenticated NEXUS roles can view
    academic-year information.
    """

    if current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view academic years"
            ),
        )

    academic_year = get_academic_year(
        db,
        academic_year_id,
    )

    if academic_year is None:
        raise HTTPException(
            status_code=404,
            detail="Academic year not found",
        )

    return academic_year