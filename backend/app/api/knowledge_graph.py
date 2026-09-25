from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import READ_KNOWLEDGE_GRAPH
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.services.knowledge_graph_engine import (
    generate_knowledge_graph_intelligence,
)


router = APIRouter()


# ============================================================
# INSTITUTIONAL KNOWLEDGE GRAPH
# ============================================================

@router.get("/")
def read_knowledge_graph(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Build and analyze the institutional knowledge graph.

    Allowed roles:

        Faculty
        HOD
        Management
        Admin
        Super Admin

    Students:
        Cannot access the institutional knowledge graph.
    """

    # --------------------------------------------------------
    # ACCESS CONTROL
    # --------------------------------------------------------

    allowed_roles = {
        role.value
        for role in READ_KNOWLEDGE_GRAPH
    }

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access the institutional knowledge graph"
            ),
        )

    # --------------------------------------------------------
    # GENERATE GRAPH INTELLIGENCE
    # --------------------------------------------------------

    intelligence = generate_knowledge_graph_intelligence(
        db
    )

    if not intelligence:
        raise HTTPException(
            status_code=404,
            detail=(
                "Knowledge graph intelligence "
                "could not be generated"
            ),
        )

    return intelligence