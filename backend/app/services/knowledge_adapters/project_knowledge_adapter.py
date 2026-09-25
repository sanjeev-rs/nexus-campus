from app.models.project import Project


class ProjectKnowledgeAdapter:
    """
    Converts NEXUS project records into
    natural-language knowledge suitable for semantic search.
    """

    def build_project_knowledge(
        self,
        project: Project,
    ) -> str:
        """
        Convert a Project record into a
        natural-language knowledge representation.
        """

        student_name = None

        if project.student is not None:
            student_name = getattr(
                project.student,
                "name",
                None,
            )

        parts = [
            f"Project title: {project.title}.",
            f"Project type: {project.project_type}.",
            f"Project status: {project.status}.",
        ]

        if project.description:
            parts.append(
                f"Project description: "
                f"{project.description}."
            )

        if student_name:
            parts.append(
                f"Student: {student_name}."
            )
        else:
            parts.append(
                f"Student ID: {project.student_id}."
            )

        return " ".join(parts)


project_knowledge_adapter = ProjectKnowledgeAdapter()