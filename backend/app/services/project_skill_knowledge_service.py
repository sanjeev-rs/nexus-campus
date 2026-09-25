from sqlalchemy.orm import Session

from app.models.project_skill import ProjectSkill
from app.services.knowledge_adapters.project_skill_knowledge_adapter import (
    project_skill_knowledge_adapter,
)
from app.services.knowledge_ingestion_service import (
    knowledge_ingestion_service,
)


class ProjectSkillKnowledgeService:
    """
    Converts project-skill records into searchable
    NEXUS knowledge.
    """

    def ingest_project_skill(
        self,
        db: Session,
        project_skill: ProjectSkill,
    ):
        """
        Convert and ingest one project-skill record.
        """

        content = (
            project_skill_knowledge_adapter
            .build_project_skill_knowledge(
                project_skill
            )
        )

        metadata = {
            "entity": "project_skill",
            "project_skill_id": project_skill.id,
            "project_id": project_skill.project_id,
            "skill_id": project_skill.skill_id,
            "proficiency_level": (
                project_skill.proficiency_level
            ),
        }

        return knowledge_ingestion_service.ingest_text(
            db=db,
            content=content,
            source_type="project_skill",
            source_id=project_skill.id,
            metadata=metadata,
        )

    def ingest_project_skill_by_id(
        self,
        db: Session,
        project_skill_id: int,
    ):
        """
        Find a project-skill record by ID and ingest it.
        """

        project_skill = (
            db.query(ProjectSkill)
            .filter(
                ProjectSkill.id == project_skill_id
            )
            .first()
        )

        if project_skill is None:
            return None

        return self.ingest_project_skill(
            db=db,
            project_skill=project_skill,
        )


project_skill_knowledge_service = (
    ProjectSkillKnowledgeService()
)