from app.models.project_outcome import ProjectOutcome


class ProjectOutcomeKnowledgeAdapter:
    """
    Converts NEXUS project-outcome records into
    natural-language knowledge suitable for semantic search.
    """

    def build_project_outcome_knowledge(
        self,
        project_outcome: ProjectOutcome,
    ) -> str:
        """
        Convert a ProjectOutcome record into a
        natural-language knowledge representation.
        """

        project_title = None

        if project_outcome.project is not None:
            project_title = getattr(
                project_outcome.project,
                "title",
                None,
            )

        parts = []

        if project_title:
            parts.append(
                f"Project: {project_title}."
            )
        else:
            parts.append(
                f"Project ID: {project_outcome.project_id}."
            )

        parts.append(
            "Outcome type: "
            f"{project_outcome.outcome_type}."
        )

        if project_outcome.result:
            parts.append(
                f"Result: {project_outcome.result}."
            )

        if project_outcome.score is not None:
            parts.append(
                f"Outcome score: {project_outcome.score}."
            )

        if project_outcome.description:
            parts.append(
                "Outcome description: "
                f"{project_outcome.description}."
            )

        return " ".join(parts)


project_outcome_knowledge_adapter = (
    ProjectOutcomeKnowledgeAdapter()
)
