from datetime import datetime

from sqlalchemy.orm import Session

from app.models.knowledge_ingestion import KnowledgeIngestion


class KnowledgeIngestionStatusService:
    """
    Manages the processing status of knowledge ingestion.

    Status lifecycle:

        pending
            ↓
        processing
            ↓
        indexed

    Failure lifecycle:

        processing
            ↓
        failed
    """

    def get_by_file_id(
        self,
        db: Session,
        stored_file_id: int,
    ):
        """
        Retrieve the ingestion status for a stored file.
        """

        return (
            db.query(KnowledgeIngestion)
            .filter(
                KnowledgeIngestion.stored_file_id
                == stored_file_id
            )
            .first()
        )

    def create_pending(
        self,
        db: Session,
        stored_file_id: int,
    ):
        """
        Create a pending ingestion record.

        If one already exists, return the existing record.
        """

        existing = self.get_by_file_id(
            db=db,
            stored_file_id=stored_file_id,
        )

        if existing is not None:
            return existing

        ingestion = KnowledgeIngestion(
            stored_file_id=stored_file_id,
            status="pending",
            chunk_count=0,
        )

        db.add(ingestion)
        db.commit()
        db.refresh(ingestion)

        return ingestion

    def mark_processing(
        self,
        db: Session,
        ingestion: KnowledgeIngestion,
    ):
        """
        Mark an ingestion as currently processing.
        """

        ingestion.status = "processing"
        ingestion.error_message = None
        ingestion.started_at = datetime.utcnow()
        ingestion.completed_at = None

        db.commit()
        db.refresh(ingestion)

        return ingestion

    def mark_indexed(
        self,
        db: Session,
        ingestion: KnowledgeIngestion,
        chunk_count: int,
    ):
        """
        Mark an ingestion as successfully indexed.
        """

        if chunk_count < 0:
            raise ValueError(
                "chunk_count cannot be negative"
            )

        ingestion.status = "indexed"
        ingestion.chunk_count = chunk_count
        ingestion.error_message = None
        ingestion.completed_at = datetime.utcnow()

        db.commit()
        db.refresh(ingestion)

        return ingestion

    def mark_failed(
        self,
        db: Session,
        ingestion: KnowledgeIngestion,
        error_message: str,
    ):
        """
        Mark an ingestion as failed.
        """

        if not error_message:
            error_message = (
                "Unknown knowledge ingestion error"
            )

        ingestion.status = "failed"
        ingestion.error_message = error_message
        ingestion.completed_at = datetime.utcnow()

        db.commit()
        db.refresh(ingestion)

        return ingestion


knowledge_ingestion_status_service = (
    KnowledgeIngestionStatusService()
)