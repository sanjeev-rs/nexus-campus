from sqlalchemy.orm import Session

from app.models.project_skill import ProjectSkill
from app.schemas.project_skill import ProjectSkillCreate


def create_project_skill(
    db: Session,
    project_skill_data: ProjectSkillCreate,
):
    project_skill = ProjectSkill(
        project_id=project_skill_data.project_id,
        skill_id=project_skill_data.skill_id,
        proficiency_level=project_skill_data.proficiency_level,
    )

    db.add(project_skill)
    db.commit()
    db.refresh(project_skill)

    return project_skill


def get_project_skills(db: Session):
    return db.query(ProjectSkill).all()


def get_project_skill(
    db: Session,
    project_skill_id: int,
):
    return (
        db.query(ProjectSkill)
        .filter(ProjectSkill.id == project_skill_id)
        .first()
    )