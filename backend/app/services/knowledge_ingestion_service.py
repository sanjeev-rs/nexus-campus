from sqlalchemy.orm import Session

from app.services.embedding_service import embedding_service
from app.services.knowledge_chunking_service import (
    knowledge_chunking_service,
)
from app.services.knowledge_embedding_service import (
    create_embedding,
)


class KnowledgeIngestionService:
    """
    Generic NEXUS knowledge ingestion pipeline.

    Pipeline:

        Raw text
            ↓
        Chunking
            ↓
        Embedding generation
            ↓
        pgvector storage

    This service is intentionally generic.

    It must NOT import research-specific services.
    """

    def ingest_text(
        self,
        db: Session,
        content: str,
        source_type: str | None = None,
        source_id: int | None = None,
        metadata: dict | None = None,
    ):
        """
        Convert raw text into chunks, generate embeddings,
        and store the embeddings in pgvector.
        """

        if not content or not content.strip():
            raise ValueError(
                "Knowledge content cannot be empty"
            )

        chunks = (
            knowledge_chunking_service
            .chunk_with_metadata(
                text=content,
                source_type=source_type,
                source_id=source_id,
                metadata=metadata,
            )
        )

        stored_embeddings = []

        for chunk in chunks:

            embedding = (
                embedding_service
                .generate_embedding(
                    chunk["content"]
                )
            )

            stored_embedding = create_embedding(
                db=db,
                content=chunk["content"],
                embedding=embedding,
                source_type=source_type,
                source_id=source_id,
                metadata=chunk["metadata"],
            )

            stored_embeddings.append(
                stored_embedding
            )

        return stored_embeddings


knowledge_ingestion_service = (
    KnowledgeIngestionService()
)