from sqlalchemy.orm import Session

from app.models.project_outcome import ProjectOutcome
from app.services.knowledge_adapters.project_outcome_knowledge_adapter import (
    project_outcome_knowledge_adapter,
)
from app.services.knowledge_ingestion_service import (
    knowledge_ingestion_service,
)


class ProjectOutcomeKnowledgeService:
    """
    Converts project-outcome records into searchable
    NEXUS knowledge.
    """

    def ingest_project_outcome(
        self,
        db: Session,
        project_outcome: ProjectOutcome,
    ):
        """
        Convert and ingest one project-outcome record.
        """

        content = (
            project_outcome_knowledge_adapter
            .build_project_outcome_knowledge(
                project_outcome
            )
        )

        metadata = {
            "entity": "project_outcome",
            "project_outcome_id": project_outcome.id,
            "project_id": project_outcome.project_id,
            "outcome_type": project_outcome.outcome_type,
            "result": project_outcome.result,
            "score": project_outcome.score,
        }

        return knowledge_ingestion_service.ingest_text(
            db=db,
            content=content,
            source_type="project_outcome",
            source_id=project_outcome.id,
            metadata=metadata,
        )

    def ingest_project_outcome_by_id(
        self,
        db: Session,
        project_outcome_id: int,
    ):
        """
        Find a project-outcome record by ID and ingest it.
        """

        project_outcome = (
            db.query(ProjectOutcome)
            .filter(
                ProjectOutcome.id == project_outcome_id
            )
            .first()
        )

        if project_outcome is None:
            return None

        return self.ingest_project_outcome(
            db=db,
            project_outcome=project_outcome,
        )


project_outcome_knowledge_service = (
    ProjectOutcomeKnowledgeService()
)