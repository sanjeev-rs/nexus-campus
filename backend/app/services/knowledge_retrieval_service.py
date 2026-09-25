from sqlalchemy.orm import Session

from app.services.semantic_search_service import (
    semantic_search_service,
)


class KnowledgeRetrievalService:
    """
    Retrieval layer for NEXUS.

    Responsible for retrieving relevant knowledge
    before it is passed to a future RAG/LLM layer.
    """

    def retrieve(
        self,
        db: Session,
        query: str,
        limit: int = 5,
        source_type: str | None = None,
        source_id: int | None = None,
    ) -> list[dict]:
        """
        Retrieve relevant knowledge for a natural-language query.
        """

        if not query or not query.strip():
            raise ValueError(
                "Retrieval query cannot be empty"
            )

        results = semantic_search_service.search(
            db=db,
            query=query,
            limit=limit,
            source_type=source_type,
            source_id=source_id,
        )

        retrieved = []

        for result in results:
            distance = float(
                result["distance"]
            )

            similarity = max(
                0.0,
                1.0 - distance,
            )

            retrieved.append(
                {
                    "id": result["id"],
                    "content": result["content"],
                    "similarity": similarity,
                    "distance": distance,
                    "source_type": result["source_type"],
                    "source_id": result["source_id"],
                    "metadata": result["metadata"],
                    "created_at": result["created_at"],
                }
            )

        return retrieved


knowledge_retrieval_service = KnowledgeRetrievalService()