from app.models.opportunity import Opportunity


class OpportunityKnowledgeAdapter:
    """
    Converts NEXUS opportunity records into
    natural-language knowledge suitable for semantic search.
    """

    def build_opportunity_knowledge(
        self,
        opportunity: Opportunity,
    ) -> str:
        """
        Convert an Opportunity record into a
        natural-language knowledge representation.
        """

        parts = [
            f"Opportunity title: {opportunity.title}.",
            f"Opportunity type: {opportunity.opportunity_type}.",
            f"Organization: {opportunity.organization}.",
            f"Status: {opportunity.status}.",
        ]

        if opportunity.description:
            parts.append(
                "Opportunity description: "
                f"{opportunity.description}."
            )

        if opportunity.eligibility:
            parts.append(
                "Eligibility: "
                f"{opportunity.eligibility}."
            )

        if opportunity.location:
            parts.append(
                f"Location: {opportunity.location}."
            )

        if opportunity.application_url:
            parts.append(
                "Application URL: "
                f"{opportunity.application_url}."
            )

        if opportunity.created_by is not None:
            parts.append(
                f"Created by faculty ID: "
                f"{opportunity.created_by}."
            )

        return " ".join(parts)


opportunity_knowledge_adapter = (
    OpportunityKnowledgeAdapter()
)