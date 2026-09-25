from fastapi import APIRouter, Depends, HTTPException

from app.core.security import get_current_nexus_user
from app.database.connection import get_db
from app.services.neo4j_student_intelligence_service import (
    neo4j_student_intelligence_service,
)


router = APIRouter()


@router.get("/{student_id}/profile")
def get_student_profile(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
):
    profile = neo4j_student_intelligence_service.get_student_profile(
        student_id
    )

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail=f"Student {student_id} was not found in the knowledge graph",
        )

    return profile


@router.get("/{student_id}/opportunities")
def get_student_opportunities(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
):
    opportunities = (
        neo4j_student_intelligence_service
        .get_student_opportunity_matches(student_id)
    )

    return {
        "student_id": student_id,
        "opportunities": opportunities,
        "opportunity_count": len(opportunities),
    }