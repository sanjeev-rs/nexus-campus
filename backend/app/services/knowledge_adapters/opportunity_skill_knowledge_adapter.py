from app.models.opportunity_skill import OpportunitySkill


class OpportunitySkillKnowledgeAdapter:
    """
    Converts NEXUS opportunity-skill records into
    natural-language knowledge suitable for semantic search.
    """

    def build_opportunity_skill_knowledge(
        self,
        opportunity_skill: OpportunitySkill,
    ) -> str:
        """
        Convert an OpportunitySkill record into a
        natural-language knowledge representation.
        """

        opportunity_title = None
        skill_name = None

        if opportunity_skill.opportunity is not None:
            opportunity_title = getattr(
                opportunity_skill.opportunity,
                "title",
                None,
            )

        if opportunity_skill.skill is not None:
            skill_name = getattr(
                opportunity_skill.skill,
                "name",
                None,
            )

        parts = []

        if opportunity_title:
            parts.append(
                f"Opportunity: {opportunity_title}."
            )
        else:
            parts.append(
                "Opportunity ID: "
                f"{opportunity_skill.opportunity_id}."
            )

        if skill_name:
            parts.append(
                f"Required skill: {skill_name}."
            )
        else:
            parts.append(
                "Skill ID: "
                f"{opportunity_skill.skill_id}."
            )

        parts.append(
            f"Skill importance: "
            f"{opportunity_skill.importance}."
        )

        if opportunity_skill.minimum_proficiency is not None:
            parts.append(
                "Minimum required proficiency: "
                f"{opportunity_skill.minimum_proficiency}."
            )

        return " ".join(parts)


opportunity_skill_knowledge_adapter = (
    OpportunitySkillKnowledgeAdapter()
)