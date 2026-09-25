from sqlalchemy.orm import Session

from app.services.ai_service import ai_service
from app.services.knowledge_retrieval_service import (
    knowledge_retrieval_service,
)
from app.services.rag_context_service import (
    rag_context_service,
)


class NexusAIService:
    """
    Central AI orchestration service for NEXUS.

    Pipeline:

        User Query
            ↓
        Knowledge Retrieval
            ↓
        RAG Context
            ↓
        AI Provider
            ↓
        NEXUS Response

    The actual AI provider can be changed without
    changing this orchestration layer.
    """

    def generate_answer(
        self,
        db: Session,
        query: str,
        limit: int = 5,
        source_type: str | None = None,
        source_id: int | None = None,
    ) -> dict:
        """
        Generate a NEXUS answer using retrieved knowledge.

        Note:
            The current OpenAI provider is intentionally
            not implemented yet.
        """

        if not query or not query.strip():
            raise ValueError(
                "NEXUS query cannot be empty"
            )

        # -------------------------------------------------
        # STEP 1 — RETRIEVE KNOWLEDGE
        # -------------------------------------------------

        retrieved_results = (
            knowledge_retrieval_service
            .retrieve(
                db=db,
                query=query,
                limit=limit,
                source_type=source_type,
                source_id=source_id,
            )
        )

        # -------------------------------------------------
        # STEP 2 — BUILD RAG CONTEXT
        # -------------------------------------------------

        rag_context = (
            rag_context_service
            .build_context(
                query=query,
                retrieved_results=retrieved_results,
            )
        )

        # -------------------------------------------------
        # STEP 3 — BUILD AI PROMPT
        # -------------------------------------------------

        prompt = (
            "You are NEXUS, an AI-powered campus "
            "intelligence system.\n\n"
            "Answer the user's question using only "
            "the provided NEXUS knowledge context.\n\n"
            "If the context does not contain enough "
            "information, clearly state that the "
            "available knowledge is insufficient.\n\n"
            f"User Question:\n{query.strip()}\n\n"
            "NEXUS Knowledge Context:\n"
            f"{rag_context['context']}"
        )

        # -------------------------------------------------
        # STEP 4 — AI GENERATION
        # -------------------------------------------------

        try:
            answer = ai_service.generate_response(
                prompt=prompt
            )

        except NotImplementedError:
            answer = None

        # -------------------------------------------------
        # STEP 5 — RETURN STRUCTURED RESPONSE
        # -------------------------------------------------

        return {
            "query": query.strip(),
            "answer": answer,
            "retrieved_count": len(
                retrieved_results
            ),
            "sources": rag_context["sources"],
            "context": rag_context["context"],
        }


nexus_ai_service = NexusAIService()