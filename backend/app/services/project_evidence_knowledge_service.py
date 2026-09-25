from sqlalchemy.orm import Session

from app.models.project_evidence import ProjectEvidence
from app.services.knowledge_adapters.project_evidence_knowledge_adapter import (
    project_evidence_knowledge_adapter,
)
from app.services.knowledge_ingestion_service import (
    knowledge_ingestion_service,
)


class ProjectEvidenceKnowledgeService:
    """
    Converts project-evidence records into searchable
    NEXUS knowledge.
    """

    def ingest_project_evidence(
        self,
        db: Session,
        project_evidence: ProjectEvidence,
    ):
        """
        Convert and ingest one project-evidence record.
        """

        content = (
            project_evidence_knowledge_adapter
            .build_project_evidence_knowledge(
                project_evidence
            )
        )

        metadata = {
            "entity": "project_evidence",
            "project_evidence_id": project_evidence.id,
            "project_id": project_evidence.project_id,
            "evidence_type": (
                project_evidence.evidence_type
            ),
            "title": project_evidence.title,
            "reference_url": (
                project_evidence.reference_url
            ),
            "attached_file_count": (
                len(project_evidence.files)
                if project_evidence.files
                else 0
            ),
        }

        return knowledge_ingestion_service.ingest_text(
            db=db,
            content=content,
            source_type="project_evidence",
            source_id=project_evidence.id,
            metadata=metadata,
        )

    def ingest_project_evidence_by_id(
        self,
        db: Session,
        project_evidence_id: int,
    ):
        """
        Find a project-evidence record by ID and ingest it.
        """

        project_evidence = (
            db.query(ProjectEvidence)
            .filter(
                ProjectEvidence.id
                == project_evidence_id
            )
            .first()
        )

        if project_evidence is None:
            return None

        return self.ingest_project_evidence(
            db=db,
            project_evidence=project_evidence,
        )


project_evidence_knowledge_service = (
    ProjectEvidenceKnowledgeService()
)