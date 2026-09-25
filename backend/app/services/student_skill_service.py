from sqlalchemy.orm import Session

from app.models.student_skill import StudentSkill
from app.schemas.student_skill import StudentSkillCreate


def create_student_skill(
    db: Session,
    student_skill_data: StudentSkillCreate,
):
    student_skill = StudentSkill(
        student_id=student_skill_data.student_id,
        skill_id=student_skill_data.skill_id,
        proficiency_level=student_skill_data.proficiency_level,
        source=student_skill_data.source,
        verified=student_skill_data.verified,
    )

    db.add(student_skill)
    db.commit()
    db.refresh(student_skill)

    return student_skill


def get_student_skills(db: Session):
    return db.query(StudentSkill).all()


def get_student_skill(
    db: Session,
    student_skill_id: int,
):
    return (
        db.query(StudentSkill)
        .filter(StudentSkill.id == student_skill_id)
        .first()
    )