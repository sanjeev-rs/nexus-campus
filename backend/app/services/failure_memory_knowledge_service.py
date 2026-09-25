from sqlalchemy.orm import Session

from app.models.failure_memory import FailureMemory
from app.services.knowledge_adapters.failure_memory_knowledge_adapter import (
    failure_memory_knowledge_adapter,
)
from app.services.knowledge_ingestion_service import (
    knowledge_ingestion_service,
)


class FailureMemoryKnowledgeService:
    """
    Converts failure-memory records into searchable
    NEXUS knowledge.
    """

    def ingest_failure_memory(
        self,
        db: Session,
        failure_memory: FailureMemory,
    ):
        """
        Convert and ingest one failure-memory record.
        """

        content = (
            failure_memory_knowledge_adapter
            .build_failure_memory_knowledge(
                failure_memory
            )
        )

        metadata = {
            "entity": "failure_memory",
            "failure_memory_id": failure_memory.id,
            "project_id": failure_memory.project_id,
            "failure_type": failure_memory.failure_type,
            "impact": failure_memory.impact,
        }

        return knowledge_ingestion_service.ingest_text(
            db=db,
            content=content,
            source_type="failure_memory",
            source_id=failure_memory.id,
            metadata=metadata,
        )

    def ingest_failure_memory_by_id(
        self,
        db: Session,
        failure_memory_id: int,
    ):
        """
        Find a failure-memory record by ID and ingest it.
        """

        failure_memory = (
            db.query(FailureMemory)
            .filter(
                FailureMemory.id == failure_memory_id
            )
            .first()
        )

        if failure_memory is None:
            return None

        return self.ingest_failure_memory(
            db=db,
            failure_memory=failure_memory,
        )


failure_memory_knowledge_service = (
    FailureMemoryKnowledgeService()
)