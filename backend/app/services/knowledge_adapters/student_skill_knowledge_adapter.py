from app.models.student_skill import StudentSkill


class StudentSkillKnowledgeAdapter:
    """
    Converts NEXUS student-skill records into
    natural-language knowledge suitable for semantic search.
    """

    def build_student_skill_knowledge(
        self,
        student_skill: StudentSkill,
    ) -> str:
        """
        Convert a StudentSkill record into a
        natural-language knowledge representation.
        """

        student_name = None
        skill_name = None

        if student_skill.student is not None:
            student_name = getattr(
                student_skill.student,
                "name",
                None,
            )

        if student_skill.skill is not None:
            skill_name = getattr(
                student_skill.skill,
                "name",
                None,
            )

        parts = []

        if student_name:
            parts.append(
                f"Student: {student_name}."
            )

        if skill_name:
            parts.append(
                f"Skill: {skill_name}."
            )
        else:
            parts.append(
                f"Skill ID: {student_skill.skill_id}."
            )

        parts.append(
            "Proficiency level: "
            f"{student_skill.proficiency_level}."
        )

        parts.append(
            f"Skill source: {student_skill.source}."
        )

        verification_status = (
            "verified"
            if student_skill.verified
            else "not verified"
        )

        parts.append(
            f"Verification status: {verification_status}."
        )

        return " ".join(parts)


student_skill_knowledge_adapter = (
    StudentSkillKnowledgeAdapter()
)