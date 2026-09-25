from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.models.knowledge_ingestion import KnowledgeIngestion
from app.models.stored_file import StoredFile
from app.services.research_knowledge_service import (
    research_knowledge_service,
)


class ResearchIngestionProcessor:
    """
    Processes research knowledge ingestion jobs.

    Each background job creates its own database session.
    This prevents the request database session from being
    reused after the HTTP request has completed.
    """

    def process_ingestion(
        self,
        ingestion_id: int,
    ):
        """
        Process one knowledge-ingestion job.

        A new database session is created specifically
        for this background task.
        """

        db: Session = SessionLocal()

        try:
            ingestion = (
                db.query(KnowledgeIngestion)
                .filter(
                    KnowledgeIngestion.id
                    == ingestion_id
                )
                .first()
            )

            if ingestion is None:
                raise ValueError(
                    "Knowledge ingestion record "
                    "was not found"
                )

            stored_file = (
                db.query(StoredFile)
                .filter(
                    StoredFile.id
                    == ingestion.stored_file_id
                )
                .first()
            )

            if stored_file is None:
                raise ValueError(
                    "Stored file associated with "
                    "ingestion record was not found"
                )

            return (
                research_knowledge_service
                .ingest_research_file(
                    db=db,
                    stored_file=stored_file,
                )
            )

        finally:
            db.close()

    def process_by_file_id(
        self,
        stored_file_id: int,
    ):
        """
        Find the ingestion job for a stored file
        and process it using a dedicated database session.
        """

        db: Session = SessionLocal()

        try:
            ingestion = (
                db.query(KnowledgeIngestion)
                .filter(
                    KnowledgeIngestion.stored_file_id
                    == stored_file_id
                )
                .first()
            )

            if ingestion is None:
                raise ValueError(
                    "Knowledge ingestion record "
                    "was not found"
                )

            ingestion_id = ingestion.id

        finally:
            db.close()

        return self.process_ingestion(
            ingestion_id=ingestion_id,
        )


research_ingestion_processor = (
    ResearchIngestionProcessor()
)