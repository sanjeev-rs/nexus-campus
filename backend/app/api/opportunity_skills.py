from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    READ_OPPORTUNITY_DATA,
    WRITE_OPPORTUNITY_DATA,
)
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.models.opportunity_skill import OpportunitySkill

from app.schemas.opportunity_skill import (
    OpportunitySkillCreate,
    OpportunitySkillResponse,
)

from app.services.opportunity_skill_service import (
    create_opportunity_skill,
    get_opportunity_skills,
    get_opportunity_skill,
)


router = APIRouter()


# ============================================================
# ROLE HELPERS
# ============================================================

def get_role_values(roles):
    """
    Convert UserRole enums into string values.
    """
    return {
        role.value
        if isinstance(role, UserRole)
        else role
        for role in roles
    }


# ============================================================
# CHECK OPPORTUNITY ACCESS
# ============================================================

def check_opportunity_access(
    current_user,
):
    """
    Check whether the current user can access
    opportunity skill requirements.
    """

    if current_user.role not in get_role_values(
        READ_OPPORTUNITY_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access opportunity skills"
            ),
        )


# ============================================================
# CREATE OPPORTUNITY SKILL
# ============================================================

@router.post(
    "/",
    response_model=OpportunitySkillResponse,
)
def add_opportunity_skill(
    opportunity_skill_data: OpportunitySkillCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Add a required skill to an opportunity.

    Allowed:

        Faculty
        HOD
        Admin
        Super Admin

    Students:
        Cannot modify opportunity requirements.

    Management:
        Read-only.
    """

    # --------------------------------------------------------
    # WRITE PERMISSION
    # --------------------------------------------------------

    if current_user.role not in get_role_values(
        WRITE_OPPORTUNITY_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to add skills to opportunities"
            ),
        )

    # --------------------------------------------------------
    # PREVENT DUPLICATE OPPORTUNITY-SKILL MAPPING
    # --------------------------------------------------------

    existing_mapping = (
        db.query(OpportunitySkill)
        .filter(
            OpportunitySkill.opportunity_id
            == opportunity_skill_data.opportunity_id,
            OpportunitySkill.skill_id
            == opportunity_skill_data.skill_id,
        )
        .first()
    )

    if existing_mapping:
        raise HTTPException(
            status_code=409,
            detail=(
                "This skill is already associated "
                "with the opportunity"
            ),
        )

    return create_opportunity_skill(
        db,
        opportunity_skill_data,
    )


# ============================================================
# LIST OPPORTUNITY SKILLS
# ============================================================

@router.get(
    "/",
    response_model=list[OpportunitySkillResponse],
)
def list_opportunity_skills(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    List opportunity-skill mappings.

    All authenticated NEXUS roles can read
    opportunity requirements.
    """

    check_opportunity_access(
        current_user,
    )

    return get_opportunity_skills(db)


# ============================================================
# GET SINGLE OPPORTUNITY SKILL
# ============================================================

@router.get(
    "/{opportunity_skill_id}",
    response_model=OpportunitySkillResponse,
)
def read_opportunity_skill(
    opportunity_skill_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retrieve a single opportunity-skill mapping.

    All authenticated NEXUS roles can view
    opportunity skill requirements.
    """

    check_opportunity_access(
        current_user,
    )

    opportunity_skill = get_opportunity_skill(
        db,
        opportunity_skill_id,
    )

    if opportunity_skill is None:
        raise HTTPException(
            status_code=404,
            detail="Opportunity skill not found",
        )

    return opportunity_skill