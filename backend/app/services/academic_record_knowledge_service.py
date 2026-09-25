from sqlalchemy.orm import Session

from app.models.academic_record import AcademicRecord
from app.services.knowledge_adapters.academic_record_knowledge_adapter import (
    academic_record_knowledge_adapter,
)
from app.services.knowledge_ingestion_service import (
    knowledge_ingestion_service,
)


class AcademicRecordKnowledgeService:
    """
    Converts academic records into searchable
    NEXUS knowledge.
    """

    def ingest_academic_record(
        self,
        db: Session,
        academic_record: AcademicRecord,
    ):
        """
        Convert and ingest one academic record.
        """

        content = (
            academic_record_knowledge_adapter
            .build_academic_record_knowledge(
                academic_record
            )
        )

        metadata = {
            "entity": "academic_record",
            "academic_record_id": academic_record.id,
            "student_id": academic_record.student_id,
            "course_id": academic_record.course_id,
            "academic_year_id": (
                academic_record.academic_year_id
            ),
            "semester": academic_record.semester,
            "marks": academic_record.marks,
            "grade": academic_record.grade,
            "grade_point": academic_record.grade_point,
            "attendance_percentage": (
                academic_record.attendance_percentage
            ),
        }

        return knowledge_ingestion_service.ingest_text(
            db=db,
            content=content,
            source_type="academic_record",
            source_id=academic_record.id,
            metadata=metadata,
        )

    def ingest_academic_record_by_id(
        self,
        db: Session,
        academic_record_id: int,
    ):
        """
        Find an academic record by ID and ingest it.
        """

        academic_record = (
            db.query(AcademicRecord)
            .filter(
                AcademicRecord.id == academic_record_id
            )
            .first()
        )

        if academic_record is None:
            return None

        return self.ingest_academic_record(
            db=db,
            academic_record=academic_record,
        )


academic_record_knowledge_service = (
    AcademicRecordKnowledgeService()
)