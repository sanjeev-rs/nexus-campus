from app.models.failure_memory import FailureMemory


class FailureMemoryKnowledgeAdapter:
    """
    Converts NEXUS failure-memory records into
    natural-language knowledge suitable for semantic search.
    """

    def build_failure_memory_knowledge(
        self,
        failure_memory: FailureMemory,
    ) -> str:
        """
        Convert a FailureMemory record into a
        natural-language knowledge representation.
        """

        project_title = None

        if failure_memory.project is not None:
            project_title = getattr(
                failure_memory.project,
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
                f"Project ID: {failure_memory.project_id}."
            )

        parts.append(
            f"Failure type: {failure_memory.failure_type}."
        )

        parts.append(
            "Failure description: "
            f"{failure_memory.failure_description}."
        )

        if failure_memory.root_cause:
            parts.append(
                f"Root cause: {failure_memory.root_cause}."
            )

        if failure_memory.impact:
            parts.append(
                f"Impact: {failure_memory.impact}."
            )

        if failure_memory.resolution:
            parts.append(
                f"Resolution: {failure_memory.resolution}."
            )

        if failure_memory.lessons_learned:
            parts.append(
                "Lessons learned: "
                f"{failure_memory.lessons_learned}."
            )

        if failure_memory.preventive_recommendation:
            parts.append(
                "Preventive recommendation: "
                f"{failure_memory.preventive_recommendation}."
            )

        if failure_memory.evidence_reference:
            parts.append(
                "Evidence reference: "
                f"{failure_memory.evidence_reference}."
            )

        return " ".join(parts)


failure_memory_knowledge_adapter = (
    FailureMemoryKnowledgeAdapter()
)