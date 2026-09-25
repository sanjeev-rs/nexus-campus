from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    FACULTY_ROLES,
    READ_PROJECT_DATA,
    SYSTEM_ADMIN,
)
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.schemas.project_member import (
    ProjectMemberCreate,
    ProjectMemberResponse,
)

from app.services.project_member_service import (
    create_project_member,
    get_project_members,
    get_project_member,
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
# CREATE PROJECT MEMBER
# =========================================================

@router.post(
    "/",
    response_model=ProjectMemberResponse,
)
def add_project_member(
    project_member_data: ProjectMemberCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Add a student to a project.

    Students:
        Can add themselves to a project.

    Faculty / HOD / Admin / Super Admin:
        Can add project members.

    Management:
        Cannot modify project membership.
    """

    # -------------------------------------------------------
    # STUDENT
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != project_member_data.student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only add "
                    "themselves to projects"
                ),
            )

    # -------------------------------------------------------
    # FACULTY / HOD / ADMIN / SUPER ADMIN
    # -------------------------------------------------------

    elif current_user.role in get_role_values(
        FACULTY_ROLES
    ):
        pass

    # -------------------------------------------------------
    # OTHER ROLES
    # -------------------------------------------------------

    else:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to manage project membership"
            ),
        )

    return create_project_member(
        db,
        project_member_data,
    )


# =========================================================
# LIST PROJECT MEMBERS
# =========================================================

@router.get(
    "/",
    response_model=list[ProjectMemberResponse],
)
def list_project_members(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List project membership records.

    Students cannot access the complete
    institutional membership dataset.
    """

    if current_user.role == UserRole.STUDENT.value:
        raise HTTPException(
            status_code=403,
            detail=(
                "Students cannot access the "
                "complete project membership list"
            ),
        )

    if current_user.role not in get_role_values(
        READ_PROJECT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view project membership"
            ),
        )

    return get_project_members(db)


# =========================================================
# GET SINGLE PROJECT MEMBER
# =========================================================

@router.get(
    "/{project_member_id}",
    response_model=ProjectMemberResponse,
)
def read_project_member(
    project_member_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a project membership record.

    Students:
        Can access only their own memberships.

    Faculty / HOD / Management / Admin / Super Admin:
        Can access project memberships.
    """

    project_member = get_project_member(
        db,
        project_member_id,
    )

    if project_member is None:
        raise HTTPException(
            status_code=404,
            detail="Project member not found",
        )

    # -------------------------------------------------------
    # STUDENT OWNERSHIP CHECK
    # -------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != project_member.student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only access "
                    "their own project memberships"
                ),
            )

    # -------------------------------------------------------
    # OTHER AUTHORIZED ROLES
    # -------------------------------------------------------

    elif current_user.role not in get_role_values(
        READ_PROJECT_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to view this project membership"
            ),
        )

    return project_member