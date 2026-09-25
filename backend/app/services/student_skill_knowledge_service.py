from sqlalchemy.orm import Session

from app.models.student_skill import StudentSkill
from app.services.knowledge_adapters.student_skill_knowledge_adapter import (
    student_skill_knowledge_adapter,
)
from app.services.knowledge_ingestion_service import (
    knowledge_ingestion_service,
)


class StudentSkillKnowledgeService:
    """
    Converts student-skill records into searchable
    NEXUS knowledge.
    """

    def ingest_student_skill(
        self,
        db: Session,
        student_skill: StudentSkill,
    ):
        """
        Convert and ingest one student-skill record.
        """

        content = (
            student_skill_knowledge_adapter
            .build_student_skill_knowledge(
                student_skill
            )
        )

        metadata = {
            "entity": "student_skill",
            "student_skill_id": student_skill.id,
            "student_id": student_skill.student_id,
            "skill_id": student_skill.skill_id,
            "proficiency_level": (
                student_skill.proficiency_level
            ),
            "source": student_skill.source,
            "verified": student_skill.verified,
        }

        return knowledge_ingestion_service.ingest_text(
            db=db,
            content=content,
            source_type="student_skill",
            source_id=student_skill.id,
            metadata=metadata,
        )

    def ingest_student_skill_by_id(
        self,
        db: Session,
        student_skill_id: int,
    ):
        """
        Find a student-skill record by ID and ingest it.
        """

        student_skill = (
            db.query(StudentSkill)
            .filter(
                StudentSkill.id == student_skill_id
            )
            .first()
        )

        if student_skill is None:
            return None

        return self.ingest_student_skill(
            db=db,
            student_skill=student_skill,
        )


student_skill_knowledge_service = (
    StudentSkillKnowledgeService()
)