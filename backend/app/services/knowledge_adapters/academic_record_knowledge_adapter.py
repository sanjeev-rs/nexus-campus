from app.models.academic_record import AcademicRecord


class AcademicRecordKnowledgeAdapter:
    """
    Converts NEXUS academic records into
    natural-language knowledge suitable for semantic search.
    """

    def build_academic_record_knowledge(
        self,
        academic_record: AcademicRecord,
    ) -> str:
        """
        Convert an AcademicRecord into a
        natural-language knowledge representation.
        """

        student_name = None
        course_name = None
        academic_year_name = None

        if academic_record.student is not None:
            student_name = getattr(
                academic_record.student,
                "name",
                None,
            )

        if academic_record.course is not None:
            course_name = getattr(
                academic_record.course,
                "name",
                None,
            )

        if academic_record.academic_year is not None:
            academic_year_name = getattr(
                academic_record.academic_year,
                "name",
                None,
            )

        parts = []

        if student_name:
            parts.append(
                f"Student: {student_name}."
            )
        else:
            parts.append(
                f"Student ID: {academic_record.student_id}."
            )

        if course_name:
            parts.append(
                f"Course: {course_name}."
            )
        else:
            parts.append(
                f"Course ID: {academic_record.course_id}."
            )

        if academic_year_name:
            parts.append(
                f"Academic year: {academic_year_name}."
            )
        else:
            parts.append(
                "Academic year ID: "
                f"{academic_record.academic_year_id}."
            )

        parts.append(
            f"Semester: {academic_record.semester}."
        )

        if academic_record.marks is not None:
            parts.append(
                f"Marks: {academic_record.marks}."
            )

        if academic_record.grade:
            parts.append(
                f"Grade: {academic_record.grade}."
            )

        if academic_record.grade_point is not None:
            parts.append(
                f"Grade point: "
                f"{academic_record.grade_point}."
            )

        if academic_record.attendance_percentage is not None:
            parts.append(
                "Attendance percentage: "
                f"{academic_record.attendance_percentage}."
            )

        return " ".join(parts)


academic_record_knowledge_adapter = (
    AcademicRecordKnowledgeAdapter()
)