from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    READ_PROJECT_DATA,
    WRITE_PROJECT_DATA,
)
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.schemas.project import (
    ProjectCreate,
    ProjectResponse,
)

from app.services.project_service import (
    create_project,
    get_projects,
    get_project,
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
# CREATE PROJECT
# =========================================================

@router.post(
    "/",
    response_model=ProjectResponse,
)
def add_project(
    project_data: ProjectCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create a project.

    Allowed:
        Student
        Faculty
        HOD
        Admin
        Super Admin

    Management cannot create project records.
    """

    if current_user.role not in get_role_values(
        WRITE_PROJECT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to create projects"
            ),
        )

    return create_project(
        db,
        project_data,
    )


# =========================================================
# LIST PROJECTS
# =========================================================

@router.get(
    "/",
    response_model=list[ProjectResponse],
)
def list_projects(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List projects.

    All authenticated NEXUS roles can view
    project information.
    """

    if current_user.role not in get_role_values(
        READ_PROJECT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view projects"
            ),
        )

    return get_projects(db)


# =========================================================
# GET SINGLE PROJECT
# =========================================================

@router.get(
    "/{project_id}",
    response_model=ProjectResponse,
)
def read_project(
    project_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single project.

    All authenticated NEXUS roles can view
    project information.
    """

    if current_user.role not in get_role_values(
        READ_PROJECT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view this project"
            ),
        )

    project = get_project(
        db,
        project_id,
    )

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return project