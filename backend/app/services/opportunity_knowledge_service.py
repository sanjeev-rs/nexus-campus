from sqlalchemy.orm import Session

from app.models.opportunity import Opportunity
from app.services.knowledge_adapters.opportunity_knowledge_adapter import (
    opportunity_knowledge_adapter,
)
from app.services.knowledge_ingestion_service import (
    knowledge_ingestion_service,
)


class OpportunityKnowledgeService:
    """
    Converts opportunity records into searchable NEXUS knowledge.
    """

    def ingest_opportunity(
        self,
        db: Session,
        opportunity: Opportunity,
    ):
        """
        Convert and ingest one opportunity record.
        """

        content = (
            opportunity_knowledge_adapter
            .build_opportunity_knowledge(
                opportunity
            )
        )

        metadata = {
            "entity": "opportunity",
            "opportunity_id": opportunity.id,
            "opportunity_type": opportunity.opportunity_type,
            "organization": opportunity.organization,
            "status": opportunity.status,
            "location": opportunity.location,
        }

        return knowledge_ingestion_service.ingest_text(
            db=db,
            content=content,
            source_type="opportunity",
            source_id=opportunity.id,
            metadata=metadata,
        )

    def ingest_opportunity_by_id(
        self,
        db: Session,
        opportunity_id: int,
    ):
        """
        Find an opportunity by ID and ingest it.
        """

        opportunity = (
            db.query(Opportunity)
            .filter(
                Opportunity.id == opportunity_id
            )
            .first()
        )

        if opportunity is None:
            return None

        return self.ingest_opportunity(
            db=db,
            opportunity=opportunity,
        )


opportunity_knowledge_service = OpportunityKnowledgeService()