from sqlalchemy.orm import Session

from app.models.opportunity_skill import OpportunitySkill
from app.schemas.opportunity_skill import OpportunitySkillCreate


def create_opportunity_skill(
    db: Session,
    opportunity_skill_data: OpportunitySkillCreate,
):
    opportunity_skill = OpportunitySkill(
        opportunity_id=opportunity_skill_data.opportunity_id,
        skill_id=opportunity_skill_data.skill_id,
        importance=opportunity_skill_data.importance,
        minimum_proficiency=opportunity_skill_data.minimum_proficiency,
    )

    db.add(opportunity_skill)
    db.commit()
    db.refresh(opportunity_skill)

    return opportunity_skill


def get_opportunity_skills(db: Session):
    return db.query(OpportunitySkill).all()


def get_opportunity_skill(
    db: Session,
    opportunity_skill_id: int,
):
    return (
        db.query(OpportunitySkill)
        .filter(OpportunitySkill.id == opportunity_skill_id)
        .first()
    )