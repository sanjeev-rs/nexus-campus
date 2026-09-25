from app.models.project_skill import ProjectSkill


class ProjectSkillKnowledgeAdapter:
    """
    Converts NEXUS project-skill records into
    natural-language knowledge suitable for semantic search.
    """

    def build_project_skill_knowledge(
        self,
        project_skill: ProjectSkill,
    ) -> str:
        """
        Convert a ProjectSkill record into a
        natural-language knowledge representation.
        """

        project_title = None
        skill_name = None

        if project_skill.project is not None:
            project_title = getattr(
                project_skill.project,
                "title",
                None,
            )

        if project_skill.skill is not None:
            skill_name = getattr(
                project_skill.skill,
                "name",
                None,
            )

        parts = []

        if project_title:
            parts.append(
                f"Project: {project_title}."
            )
        else:
            parts.append(
                f"Project ID: {project_skill.project_id}."
            )

        if skill_name:
            parts.append(
                f"Skill: {skill_name}."
            )
        else:
            parts.append(
                f"Skill ID: {project_skill.skill_id}."
            )

        if project_skill.proficiency_level is not None:
            parts.append(
                "Proficiency level: "
                f"{project_skill.proficiency_level}."
            )

        return " ".join(parts)


project_skill_knowledge_adapter = (
    ProjectSkillKnowledgeAdapter()
)