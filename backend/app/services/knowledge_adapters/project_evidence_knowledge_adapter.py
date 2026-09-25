from app.models.project_evidence import ProjectEvidence


class ProjectEvidenceKnowledgeAdapter:
    """
    Converts NEXUS project-evidence records into
    natural-language knowledge suitable for semantic search.
    """

    def build_project_evidence_knowledge(
        self,
        project_evidence: ProjectEvidence,
    ) -> str:
        """
        Convert a ProjectEvidence record into a
        natural-language knowledge representation.
        """

        project_title = None

        if project_evidence.project is not None:
            project_title = getattr(
                project_evidence.project,
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
                f"Project ID: {project_evidence.project_id}."
            )

        parts.append(
            f"Evidence title: {project_evidence.title}."
        )

        parts.append(
            "Evidence type: "
            f"{project_evidence.evidence_type}."
        )

        if project_evidence.description:
            parts.append(
                "Evidence description: "
                f"{project_evidence.description}."
            )

        if project_evidence.reference_url:
            parts.append(
                "Reference URL: "
                f"{project_evidence.reference_url}."
            )

        if project_evidence.files:
            parts.append(
                f"Attached files: "
                f"{len(project_evidence.files)}."
            )

        return " ".join(parts)


project_evidence_knowledge_adapter = (
    ProjectEvidenceKnowledgeAdapter()
)