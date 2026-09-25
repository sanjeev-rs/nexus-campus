from app.models.student import Student


class StudentKnowledgeAdapter:
    """
    Converts NEXUS student records into
    knowledge suitable for semantic search.
    """

    def build_student_knowledge(
        self,
        student: Student,
    ) -> str:
        """
        Convert a student database record into
        a natural-language knowledge representation.
        """

        department_name = None

        if student.department is not None:
            department_name = getattr(
                student.department,
                "name",
                None,
            )

        parts = [
            f"Student name: {student.name}.",
            f"Register number: {student.register_number}.",
            f"Email: {student.email}.",
            f"Department ID: {student.department_id}.",
            f"Academic year: {student.year}.",
        ]

        if department_name:
            parts.append(
                f"Department: {department_name}."
            )

        return " ".join(parts)


student_knowledge_adapter = StudentKnowledgeAdapter()