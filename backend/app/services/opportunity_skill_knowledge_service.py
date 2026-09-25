from sqlalchemy.orm import Session

from app.models.opportunity_skill import OpportunitySkill
from app.services.knowledge_adapters.opportunity_skill_knowledge_adapter import (
    opportunity_skill_knowledge_adapter,
)
from app.services.knowledge_ingestion_service import (
    knowledge_ingestion_service,
)


class OpportunitySkillKnowledgeService:
    """
    Converts opportunity-skill records into searchable
    NEXUS knowledge.
    """

    def ingest_opportunity_skill(
        self,
        db: Session,
        opportunity_skill: OpportunitySkill,
    ):
        """
        Convert and ingest one opportunity-skill record.
        """

        content = (
            opportunity_skill_knowledge_adapter
            .build_opportunity_skill_knowledge(
                opportunity_skill
            )
        )

        metadata = {
            "entity": "opportunity_skill",
            "opportunity_skill_id": opportunity_skill.id,
            "opportunity_id": opportunity_skill.opportunity_id,
            "skill_id": opportunity_skill.skill_id,
            "importance": opportunity_skill.importance,
            "minimum_proficiency": (
                opportunity_skill.minimum_proficiency
            ),
        }

        return knowledge_ingestion_service.ingest_text(
            db=db,
            content=content,
            source_type="opportunity_skill",
            source_id=opportunity_skill.id,
            metadata=metadata,
        )

    def ingest_opportunity_skill_by_id(
        self,
        db: Session,
        opportunity_skill_id: int,
    ):
        """
        Find an opportunity-skill record by ID and ingest it.
        """

        opportunity_skill = (
            db.query(OpportunitySkill)
            .filter(
                OpportunitySkill.id == opportunity_skill_id
            )
            .first()
        )

        if opportunity_skill is None:
            return None

        return self.ingest_opportunity_skill(
            db=db,
            opportunity_skill=opportunity_skill,
        )


opportunity_skill_knowledge_service = (
    OpportunitySkillKnowledgeService()
)