from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import READ_GRAPH_INTELLIGENCE
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.services.graph_intelligence_engine import (
    generate_graph_intelligence,
)


router = APIRouter()


# ============================================================
# GRAPH INTELLIGENCE
# ============================================================

@router.get("/")
def read_graph_intelligence(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Generate institutional graph intelligence.

    Allowed roles:
        Faculty
        HOD
        Management
        Admin
        Super Admin

    Students:
        Cannot access institutional graph intelligence.
    """

    # --------------------------------------------------------
    # ACCESS CONTROL
    # --------------------------------------------------------

    allowed_roles = {
        role.value
        for role in READ_GRAPH_INTELLIGENCE
    }

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access graph intelligence"
            ),
        )

    # --------------------------------------------------------
    # GENERATE GRAPH INTELLIGENCE
    # --------------------------------------------------------

    intelligence = generate_graph_intelligence(
        db
    )

    if not intelligence:
        raise HTTPException(
            status_code=404,
            detail=(
                "Graph intelligence could not be generated"
            ),
        )

    return intelligence