from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.services.nexus_ai_service import (
    nexus_ai_service,
)


router = APIRouter(
    prefix="/nexus-ai",
    tags=["NEXUS AI"],
)


# =========================================================
# REQUEST SCHEMA
# =========================================================

class NexusAIRequest(BaseModel):
    query: str = Field(
        ...,
        min_length=1,
        description="Natural-language question for NEXUS",
    )

    limit: int = Field(
        default=5,
        ge=1,
        le=20,
        description="Maximum number of knowledge results",
    )

    source_type: str | None = Field(
        default=None,
        description="Optional knowledge source type",
    )

    source_id: int | None = Field(
        default=None,
        gt=0,
        description="Optional source entity ID",
    )


# =========================================================
# GENERATE NEXUS ANSWER
# =========================================================

@router.post("/ask")
def ask_nexus(
    request: NexusAIRequest,
    db: Session = Depends(get_db),
):
    """
    Ask NEXUS a natural-language question.

    Pipeline:

        User Question
            ↓
        Knowledge Retrieval
            ↓
        RAG Context
            ↓
        AI Service
            ↓
        NEXUS Answer
    """

    try:

        result = (
            nexus_ai_service
            .generate_answer(
                db=db,
                query=request.query,
                limit=request.limit,
                source_type=request.source_type,
                source_id=request.source_id,
            )
        )

        return result

    except ValueError as exc:

        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )