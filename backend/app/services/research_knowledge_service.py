from pathlib import Path

from sqlalchemy.orm import Session

from app.models.stored_file import StoredFile
from app.services.document_extraction_service import (
    document_extraction_service,
)
from app.services.knowledge_embedding_service import (
    delete_source_embeddings,
    knowledge_exists,
)
from app.services.knowledge_ingestion_service import (
    knowledge_ingestion_service,
)
from app.services.knowledge_ingestion_status_service import (
    knowledge_ingestion_status_service,
)
from app.storage.download import (
    storage_download_service,
)


class ResearchKnowledgeService:
    """
    Handles the conversion of research documents
    into searchable NEXUS knowledge.

    Pipeline:

        StoredFile
            ↓
        Supabase Storage Download
            ↓
        Temporary Local File
            ↓
        Document Extraction
            ↓
        Knowledge Ingestion
            ↓
        Chunking
            ↓
        Embeddings
            ↓
        pgvector

    Ingestion status is tracked separately through
    KnowledgeIngestion.
    """

    SOURCE_TYPE = "research"

    def extract_research_text(
        self,
        stored_file: StoredFile,
    ) -> str:
        """
        Download a research file from Supabase Storage
        and extract its readable text.
        """

        if not stored_file.bucket:
            raise ValueError(
                "Stored file bucket cannot be empty"
            )

        if not stored_file.file_path:
            raise ValueError(
                "Stored file path cannot be empty"
            )

        temporary_file_path = (
            storage_download_service.download_to_temp(
                bucket=stored_file.bucket,
                file_path=stored_file.file_path,
                file_name=stored_file.file_name,
            )
        )

        try:
            return document_extraction_service.extract_text(
                temporary_file_path
            )

        finally:
            temporary_path = Path(
                temporary_file_path
            )

            if temporary_path.exists():
                temporary_path.unlink()

    def ingest_research_file(
        self,
        db: Session,
        stored_file: StoredFile,
        force_reindex: bool = False,
    ):
        """
        Download, extract and ingest a research file
        into the NEXUS knowledge pipeline.

        Ingestion status is updated throughout the process.
        """

        if not stored_file.id:
            raise ValueError(
                "Stored file must have a valid ID"
            )

        ingestion = (
            knowledge_ingestion_status_service
            .create_pending(
                db=db,
                stored_file_id=stored_file.id,
            )
        )

        already_indexed = knowledge_exists(
            db=db,
            source_type=self.SOURCE_TYPE,
            source_id=stored_file.id,
        )

        if already_indexed and not force_reindex:
            knowledge_ingestion_status_service.mark_indexed(
                db=db,
                ingestion=ingestion,
                chunk_count=ingestion.chunk_count,
            )

            return {
                "status": "already_indexed",
                "stored_file_id": stored_file.id,
                "chunks_created": ingestion.chunk_count,
            }

        try:
            knowledge_ingestion_status_service.mark_processing(
                db=db,
                ingestion=ingestion,
            )

            if already_indexed and force_reindex:
                delete_source_embeddings(
                    db=db,
                    source_type=self.SOURCE_TYPE,
                    source_id=stored_file.id,
                )

            extracted_text = (
                self.extract_research_text(
                    stored_file
                )
            )

            if not extracted_text:
                raise ValueError(
                    "No readable text was extracted "
                    "from the research file"
                )

            metadata = {
                "entity": "research_file",
                "stored_file_id": stored_file.id,
                "file_name": stored_file.file_name,
                "bucket": stored_file.bucket,
                "file_path": stored_file.file_path,
                "content_type": stored_file.content_type,
                "file_size": stored_file.file_size,
                "student_id": stored_file.student_id,
                "project_id": stored_file.project_id,
                "project_evidence_id": (
                    stored_file.project_evidence_id
                ),
                "uploaded_by": stored_file.uploaded_by,
            }

            stored_embeddings = (
                knowledge_ingestion_service.ingest_text(
                    db=db,
                    content=extracted_text,
                    source_type=self.SOURCE_TYPE,
                    source_id=stored_file.id,
                    metadata=metadata,
                )
            )

            chunk_count = len(
                stored_embeddings
            )

            knowledge_ingestion_status_service.mark_indexed(
                db=db,
                ingestion=ingestion,
                chunk_count=chunk_count,
            )

            return {
                "status": "indexed",
                "stored_file_id": stored_file.id,
                "chunks_created": chunk_count,
            }

        except Exception as exc:
            knowledge_ingestion_status_service.mark_failed(
                db=db,
                ingestion=ingestion,
                error_message=str(exc),
            )

            raise


    def ingest_research_file_by_id(
        self,
        db: Session,
        stored_file_id: int,
        force_reindex: bool = False,
    ):
        """
        Find a StoredFile record and ingest its
        research content.
        """

        stored_file = (
            db.query(StoredFile)
            .filter(
                StoredFile.id == stored_file_id
            )
            .first()
        )

        if stored_file is None:
            return None

        return self.ingest_research_file(
            db=db,
            stored_file=stored_file,
            force_reindex=force_reindex,
        )


research_knowledge_service = (
    ResearchKnowledgeService()
)