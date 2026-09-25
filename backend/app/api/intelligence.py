from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    FACULTY_ROLES,
    READ_CAMPUS_INTELLIGENCE,
)
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.services.intelligence_orchestrator import (
    generate_student_intelligence_snapshot,
    generate_campus_intelligence_snapshot,
)


router = APIRouter()


# ============================================================
# ROLE HELPERS
# ============================================================

def get_role_values(roles):
    """
    Convert UserRole enum values into plain strings.
    """

    return {
        role.value
        if isinstance(role, UserRole)
        else role
        for role in roles
    }


# ============================================================
# STUDENT INTELLIGENCE SNAPSHOT
# ============================================================

@router.get("/student/{student_id}")
def read_student_intelligence_snapshot(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Generate a unified intelligence snapshot for a student.

    Students:
        Can access only their own snapshot.

    Faculty / HOD / Admin / Super Admin:
        Can access student intelligence snapshots.

    Management:
        Cannot access individual student snapshots.
    """

    # --------------------------------------------------------
    # STUDENT ACCESS
    # --------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only access "
                    "their own intelligence snapshot"
                ),
            )

    # --------------------------------------------------------
    # FACULTY / HOD / ADMIN / SUPER ADMIN
    # --------------------------------------------------------

    elif current_user.role in get_role_values(
        FACULTY_ROLES
    ):
        pass

    # --------------------------------------------------------
    # OTHER ROLES
    # --------------------------------------------------------

    else:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission to access "
                "student intelligence snapshots"
            ),
        )

    # --------------------------------------------------------
    # GENERATE SNAPSHOT
    # --------------------------------------------------------

    snapshot = generate_student_intelligence_snapshot(
        db,
        student_id,
    )

    if not snapshot:
        raise HTTPException(
            status_code=404,
            detail="Student intelligence data not found",
        )

    return snapshot


# ============================================================
# CAMPUS INTELLIGENCE SNAPSHOT
# ============================================================

@router.get("/campus")
def read_campus_intelligence_snapshot(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Generate the unified campus intelligence snapshot.

    Allowed roles:

        HOD
        Management
        Admin
        Super Admin

    Faculty and Students:
        Cannot access the campus intelligence snapshot.
    """

    # --------------------------------------------------------
    # ACCESS CONTROL
    # --------------------------------------------------------

    allowed_roles = {
        role.value
        for role in READ_CAMPUS_INTELLIGENCE
    }

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission to access "
                "the campus intelligence snapshot"
            ),
        )

    # --------------------------------------------------------
    # GENERATE CAMPUS SNAPSHOT
    # --------------------------------------------------------

    snapshot = generate_campus_intelligence_snapshot(
        db
    )

    if not snapshot:
        raise HTTPException(
            status_code=404,
            detail=(
                "Campus intelligence snapshot "
                "could not be generated"
            ),
        )

    return snapshot