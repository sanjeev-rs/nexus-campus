from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import READ_DECISION_INTELLIGENCE
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.services.decision_intelligence_engine import (
    generate_decision_intelligence,
)


router = APIRouter()


# ============================================================
# DECISION INTELLIGENCE
# ============================================================

@router.get("/")
def read_decision_intelligence(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Generate institution-level decision intelligence.

    Allowed roles:

        HOD
        Management
        Admin
        Super Admin

    Students:
        Cannot access decision intelligence.

    Faculty:
        Cannot access institution-level decision intelligence
        in the current permission model.
    """

    # --------------------------------------------------------
    # ACCESS CONTROL
    # --------------------------------------------------------

    allowed_roles = {
        role.value
        for role in READ_DECISION_INTELLIGENCE
    }

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access decision intelligence"
            ),
        )

    # --------------------------------------------------------
    # GENERATE DECISION INTELLIGENCE
    # --------------------------------------------------------

    intelligence = generate_decision_intelligence(
        db
    )

    if not intelligence:
        raise HTTPException(
            status_code=404,
            detail=(
                "Decision intelligence "
                "could not be generated"
            ),
        )

    return intelligence