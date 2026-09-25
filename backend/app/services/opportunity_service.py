from sqlalchemy.orm import Session

from app.models.opportunity import Opportunity
from app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityUpdate,
)


# =========================================================
# GET ALL OPPORTUNITIES
# =========================================================

def get_opportunities(
    db: Session,
):
    return (
        db.query(Opportunity)
        .order_by(Opportunity.id.desc())
        .all()
    )


# =========================================================
# GET SINGLE OPPORTUNITY
# =========================================================

def get_opportunity(
    db: Session,
    opportunity_id: int,
):
    return (
        db.query(Opportunity)
        .filter(Opportunity.id == opportunity_id)
        .first()
    )


# =========================================================
# CREATE OPPORTUNITY
# =========================================================

def create_opportunity(
    db: Session,
    opportunity_data: OpportunityCreate,
):
    opportunity = Opportunity(
        **opportunity_data.model_dump()
    )

    db.add(opportunity)
    db.commit()
    db.refresh(opportunity)

    return opportunity


# =========================================================
# UPDATE OPPORTUNITY
# =========================================================

def update_opportunity(
    db: Session,
    opportunity_id: int,
    opportunity_data: OpportunityUpdate,
):
    opportunity = get_opportunity(
        db,
        opportunity_id,
    )

    if not opportunity:
        return None

    update_data = opportunity_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(
            opportunity,
            field,
            value,
        )

    db.commit()
    db.refresh(opportunity)

    return opportunity


# =========================================================
# DELETE OPPORTUNITY
# =========================================================

def delete_opportunity(
    db: Session,
    opportunity_id: int,
):
    opportunity = get_opportunity(
        db,
        opportunity_id,
    )

    if not opportunity:
        return None

    db.delete(opportunity)
    db.commit()

    return opportunity