from sqlalchemy.orm import Session

from app.models.student import Student
from app.services.knowledge_adapters.student_knowledge_adapter import (
    student_knowledge_adapter,
)
from app.services.knowledge_ingestion_service import (
    knowledge_ingestion_service,
)


class StudentKnowledgeService:
    """
    Converts student database records into searchable
    NEXUS knowledge.
    """

    def ingest_student(
        self,
        db: Session,
        student: Student,
    ):
        """
        Convert and ingest one student record.
        """

        content = (
            student_knowledge_adapter.build_student_knowledge(
                student
            )
        )

        metadata = {
            "entity": "student",
            "student_id": student.id,
            "register_number": student.register_number,
            "department_id": student.department_id,
            "year": student.year,
        }

        return knowledge_ingestion_service.ingest_text(
            db=db,
            content=content,
            source_type="student",
            source_id=student.id,
            metadata=metadata,
        )

    def ingest_student_by_id(
        self,
        db: Session,
        student_id: int,
    ):
        """
        Find a student by ID and ingest their knowledge.
        """

        student = (
            db.query(Student)
            .filter(Student.id == student_id)
            .first()
        )

        if student is None:
            return None

        return self.ingest_student(
            db=db,
            student=student,
        )


student_knowledge_service = StudentKnowledgeService()