from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import READ_STUDENT_DATA, SYSTEM_ADMIN
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.schemas.department import (
    DepartmentCreate,
    DepartmentResponse,
)

from app.services.department_service import (
    create_department,
    get_departments,
    get_department,
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
# CREATE DEPARTMENT
# =========================================================

@router.post(
    "/",
    response_model=DepartmentResponse,
)
def add_department(
    department_data: DepartmentCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create a department.

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
                "to create departments"
            ),
        )

    return create_department(
        db,
        department_data,
    )


# =========================================================
# LIST DEPARTMENTS
# =========================================================

@router.get(
    "/",
    response_model=list[DepartmentResponse],
)
def list_departments(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List all departments.

    All authenticated NEXUS roles can view
    institutional department information.
    """

    if current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view departments"
            ),
        )

    return get_departments(db)


# =========================================================
# GET SINGLE DEPARTMENT
# =========================================================

@router.get(
    "/{department_id}",
    response_model=DepartmentResponse,
)
def read_department(
    department_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single department.

    All authenticated NEXUS roles can view
    department information.
    """

    if current_user.role not in get_role_values(
        READ_STUDENT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view departments"
            ),
        )

    department = get_department(
        db,
        department_id,
    )

    if department is None:
        raise HTTPException(
            status_code=404,
            detail="Department not found",
        )

    return department