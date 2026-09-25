from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.services.knowledge_retrieval_service import (
    knowledge_retrieval_service,
)


router = APIRouter(
    prefix="/knowledge-retrieval",
    tags=["Knowledge Retrieval"],
)


# =========================================================
# REQUEST SCHEMA
# =========================================================

class KnowledgeRetrievalRequest(BaseModel):
    query: str = Field(
        ...,
        min_length=1,
        description="Natural-language knowledge query",
    )

    limit: int = Field(
        default=5,
        ge=1,
        le=20,
        description="Maximum number of results",
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
# RETRIEVE KNOWLEDGE
# =========================================================

@router.post("/search")
def search_knowledge(
    request: KnowledgeRetrievalRequest,
    db: Session = Depends(get_db),
):
    """
    Search NEXUS knowledge using semantic similarity.

    Pipeline:

        User Query
            ↓
        Query Embedding
            ↓
        pgvector Similarity Search
            ↓
        Relevant Knowledge
    """

    try:
        results = (
            knowledge_retrieval_service
            .retrieve(
                db=db,
                query=request.query,
                limit=request.limit,
                source_type=request.source_type,
                source_id=request.source_id,
            )
        )

        return {
            "query": request.query,
            "count": len(results),
            "results": results,
        }

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