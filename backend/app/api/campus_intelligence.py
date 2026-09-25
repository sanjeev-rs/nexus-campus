from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import READ_CAMPUS_INTELLIGENCE
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.services.campus_intelligence_engine import (
    generate_campus_intelligence,
)


router = APIRouter()


# ============================================================
# ROLE HELPER
# ============================================================

def get_role_values(roles):
    """
    Convert UserRole enums into string values.
    """
    return {
        role.value
        if isinstance(role, UserRole)
        else role
        for role in roles
    }


# ============================================================
# CAMPUS INTELLIGENCE
# ============================================================

@router.get("/")
def read_campus_intelligence(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Generate institution-level campus intelligence.

    Allowed roles:

        HOD
        Management
        Admin
        Super Admin

    Students:
        Cannot access campus intelligence.

    Faculty:
        Cannot access institution-level campus intelligence
        in the current permission model.
    """

    # --------------------------------------------------------
    # ACCESS CONTROL
    # --------------------------------------------------------

    allowed_roles = get_role_values(
        READ_CAMPUS_INTELLIGENCE
    )

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access campus intelligence"
            ),
        )

    # --------------------------------------------------------
    # GENERATE CAMPUS INTELLIGENCE
    # --------------------------------------------------------

    intelligence = generate_campus_intelligence(
        db
    )

    if not intelligence:
        raise HTTPException(
            status_code=404,
            detail="Campus intelligence could not be generated",
        )

    return intelligence