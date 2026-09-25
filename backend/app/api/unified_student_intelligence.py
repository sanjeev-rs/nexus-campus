from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import get_current_nexus_user
from app.database.connection import get_db

from app.services.unified_student_intelligence_service import (
    unified_student_intelligence_service,
)


router = APIRouter()


@router.get("/{student_id}")
def get_unified_student_intelligence(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Return the complete NEXUS intelligence profile
    for a student.

    Combines:
        - Student Twin
        - Neo4j graph intelligence
        - Opportunity matching
        - Skill gaps
        - Intelligence insights
    """

    # --------------------------------------------------------
    # STUDENT ACCESS
    # --------------------------------------------------------

    if current_user.role == "student":

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only access "
                    "their own intelligence profile"
                ),
            )

    # --------------------------------------------------------
    # GENERATE UNIFIED INTELLIGENCE
    # --------------------------------------------------------

    intelligence = (
        unified_student_intelligence_service
        .get_student_intelligence(
            db,
            student_id,
        )
    )

    if intelligence is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found",
        )

    return intelligence