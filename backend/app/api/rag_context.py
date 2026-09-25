from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.rag_context_service import (
    rag_context_service,
)


router = APIRouter(
    prefix="/rag-context",
    tags=["RAG Context"],
)


# =========================================================
# SCHEMAS
# =========================================================

class RetrievedKnowledge(BaseModel):
    id: int | None = None

    content: str = Field(
        ...,
        min_length=1,
    )

    similarity: float | None = None

    distance: float | None = None

    source_type: str | None = None

    source_id: int | None = None

    metadata: dict = Field(
        default_factory=dict,
    )


class RAGContextRequest(BaseModel):
    query: str = Field(
        ...,
        min_length=1,
    )

    retrieved_results: list[RetrievedKnowledge] = Field(
        default_factory=list,
    )


# =========================================================
# BUILD STRUCTURED RAG CONTEXT
# =========================================================

@router.post("/build")
def build_rag_context(
    request: RAGContextRequest,
):
    """
    Build structured RAG context from retrieved
    NEXUS knowledge.

    This endpoint does NOT call an LLM.
    """

    try:

        retrieved_results = [
            result.model_dump()
            for result in request.retrieved_results
        ]

        context = (
            rag_context_service
            .build_context(
                query=request.query,
                retrieved_results=retrieved_results,
            )
        )

        return context

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


# =========================================================
# BUILD LLM PROMPT CONTEXT
# =========================================================

@router.post("/prompt-context")
def build_prompt_context(
    request: RAGContextRequest,
):
    """
    Build plain-text knowledge context that can later
    be passed into an LLM prompt.

    This endpoint does NOT call an LLM.
    """

    try:

        retrieved_results = [
            result.model_dump()
            for result in request.retrieved_results
        ]

        context = (
            rag_context_service
            .build_prompt_context(
                query=request.query,
                retrieved_results=retrieved_results,
            )
        )

        return {
            "query": request.query,
            "context": context,
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