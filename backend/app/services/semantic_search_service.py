from sqlalchemy.orm import Session

from app.services.embedding_service import embedding_service
from app.services.knowledge_embedding_service import (
    search_similar_embeddings,
)


class SemanticSearchService:
    """
    High-level semantic search service for NEXUS.

    Converts a natural-language query into an embedding
    and searches the knowledge_embeddings table using
    pgvector cosine similarity.
    """

    def search(
        self,
        db: Session,
        query: str,
        limit: int = 5,
        source_type: str | None = None,
        source_id: int | None = None,
    ):
        """
        Search NEXUS knowledge using a natural-language query.

        Optional filters can restrict the search to a
        particular knowledge source or source record.
        """

        if not query or not query.strip():
            raise ValueError(
                "Search query cannot be empty"
            )

        if limit <= 0:
            raise ValueError(
                "Search limit must be greater than 0"
            )

        query_embedding = (
            embedding_service.generate_embedding(
                query.strip()
            )
        )

        results = search_similar_embeddings(
            db=db,
            query_embedding=query_embedding,
            limit=limit,
            source_type=source_type,
            source_id=source_id,
        )

        return results


semantic_search_service = SemanticSearchService()