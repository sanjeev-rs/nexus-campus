from sqlalchemy.orm import Session

from app.models.project import Project
from app.services.knowledge_adapters.project_knowledge_adapter import (
    project_knowledge_adapter,
)
from app.services.knowledge_ingestion_service import (
    knowledge_ingestion_service,
)


class ProjectKnowledgeService:
    """
    Converts project records into searchable NEXUS knowledge.
    """

    def ingest_project(
        self,
        db: Session,
        project: Project,
    ):
        """
        Convert and ingest one project record.
        """

        content = (
            project_knowledge_adapter
            .build_project_knowledge(project)
        )

        metadata = {
            "entity": "project",
            "project_id": project.id,
            "student_id": project.student_id,
            "project_type": project.project_type,
            "status": project.status,
        }

        return knowledge_ingestion_service.ingest_text(
            db=db,
            content=content,
            source_type="project",
            source_id=project.id,
            metadata=metadata,
        )

    def ingest_project_by_id(
        self,
        db: Session,
        project_id: int,
    ):
        """
        Find a project by ID and ingest it.
        """

        project = (
            db.query(Project)
            .filter(Project.id == project_id)
            .first()
        )

        if project is None:
            return None

        return self.ingest_project(
            db=db,
            project=project,
        )


project_knowledge_service = ProjectKnowledgeService()