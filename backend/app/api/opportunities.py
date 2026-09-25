from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.permissions import (
    FACULTY_ROLES,
    WRITE_OPPORTUNITY_DATA,
)
from app.core.roles import UserRole
from app.core.security import get_current_nexus_user

from app.database.connection import get_db

from app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityUpdate,
    OpportunityResponse,
)

from app.services.opportunity_service import (
    get_opportunity,
    get_opportunities,
    create_opportunity,
    update_opportunity,
    delete_opportunity,
)

from app.services.opportunity_intelligence_engine import (
    analyze_student_opportunity,
    analyze_student_opportunities,
)


router = APIRouter()


# ============================================================
# ROLE HELPERS
# ============================================================

def get_role_values(roles):
    """
    Convert UserRole enum values into strings.
    """
    return {
        role.value
        if isinstance(role, UserRole)
        else role
        for role in roles
    }


# ============================================================
# GET ALL OPPORTUNITIES
# ============================================================

@router.get(
    "/",
    response_model=list[OpportunityResponse],
)
def read_opportunities(
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Get all available opportunities.

    All authenticated NEXUS users can view opportunities.
    """

    return get_opportunities(db)


# ============================================================
# STUDENT OPPORTUNITY RECOMMENDATIONS
#
# IMPORTANT:
# Keep this route BEFORE /{opportunity_id}
# ============================================================

@router.get(
    "/student/{student_id}/recommendations",
)
def recommend_opportunities_for_student(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Generate opportunity recommendations for a student.

    Students:
        Can request recommendations only for themselves.

    Faculty:
        Can request recommendations for students.

    HOD:
        Can request recommendations for students.

    Admin:
        Can request recommendations for students.

    Super Admin:
        Can request recommendations for students.

    Management:
        Cannot access individual student recommendations.
    """

    # --------------------------------------------------------
    # STUDENT
    # --------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only access "
                    "their own opportunity recommendations"
                ),
            )

    # --------------------------------------------------------
    # FACULTY / HOD / ADMIN / SUPER ADMIN
    # --------------------------------------------------------

    elif current_user.role in get_role_values(
        FACULTY_ROLES
    ):
        pass

    # --------------------------------------------------------
    # OTHER ROLES
    # --------------------------------------------------------

    else:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission to access "
                "individual student recommendations"
            ),
        )

    return analyze_student_opportunities(
        db,
        student_id,
    )


# ============================================================
# STUDENT ↔ OPPORTUNITY MATCH
# ============================================================

@router.get(
    "/{opportunity_id}/match/{student_id}",
)
def match_student_with_opportunity(
    opportunity_id: int,
    student_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Calculate how well a student matches an opportunity.

    Students:
        Can check only their own match.

    Faculty:
        Can check matches for students.

    HOD:
        Can check matches for students.

    Admin:
        Can check matches for students.

    Super Admin:
        Can check matches for students.

    Management:
        Cannot access individual student matching.
    """

    # --------------------------------------------------------
    # STUDENT
    # --------------------------------------------------------

    if current_user.role == UserRole.STUDENT.value:

        if current_user.student_id != student_id:
            raise HTTPException(
                status_code=403,
                detail=(
                    "Students can only check "
                    "their own opportunity matches"
                ),
            )

    # --------------------------------------------------------
    # FACULTY / HOD / ADMIN / SUPER ADMIN
    # --------------------------------------------------------

    elif current_user.role in get_role_values(
        FACULTY_ROLES
    ):
        pass

    # --------------------------------------------------------
    # OTHER ROLES
    # --------------------------------------------------------

    else:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission to access "
                "student opportunity matching"
            ),
        )

    analysis = analyze_student_opportunity(
        db,
        student_id,
        opportunity_id,
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    return analysis


# ============================================================
# GET SINGLE OPPORTUNITY
# ============================================================

@router.get(
    "/{opportunity_id}",
    response_model=OpportunityResponse,
)
def read_opportunity(
    opportunity_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Get a single opportunity.

    All authenticated NEXUS users can view opportunities.
    """

    opportunity = get_opportunity(
        db,
        opportunity_id,
    )

    if not opportunity:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    return opportunity


# ============================================================
# CREATE OPPORTUNITY
# ============================================================

@router.post(
    "/",
    response_model=OpportunityResponse,
)
def create_new_opportunity(
    opportunity_data: OpportunityCreate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Create a new opportunity.

    Allowed roles:

        Faculty
        HOD
        Admin
        Super Admin

    Students:
        Cannot create opportunities.

    Management:
        Cannot create opportunities.
    """

    if current_user.role not in get_role_values(
        WRITE_OPPORTUNITY_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to create opportunities"
            ),
        )

    return create_opportunity(
        db,
        opportunity_data,
    )


# ============================================================
# UPDATE OPPORTUNITY
# ============================================================

@router.put(
    "/{opportunity_id}",
    response_model=OpportunityResponse,
)
def update_existing_opportunity(
    opportunity_id: int,
    opportunity_data: OpportunityUpdate,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Update an existing opportunity.

    Allowed roles:

        Faculty
        HOD
        Admin
        Super Admin

    Students:
        Cannot update opportunities.

    Management:
        Cannot update opportunities.
    """

    if current_user.role not in get_role_values(
        WRITE_OPPORTUNITY_DATA
    ):
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to update opportunities"
            ),
        )

    opportunity = update_opportunity(
        db,
        opportunity_id,
        opportunity_data,
    )

    if not opportunity:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    return opportunity


# ============================================================
# DELETE OPPORTUNITY
# ============================================================

@router.delete(
    "/{opportunity_id}",
)
def delete_existing_opportunity(
    opportunity_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Delete an opportunity.

    Only Admin and Super Admin can delete opportunities.

    Faculty:
        Cannot delete.

    HOD:
        Cannot delete.

    Management:
        Cannot delete.

    Student:
        Cannot delete.
    """

    if current_user.role not in {
        UserRole.ADMIN.value,
        UserRole.SUPER_ADMIN.value,
    }:
        raise HTTPException(
            status_code=403,
            detail=(
                "Only administrators can delete "
                "opportunities"
            ),
        )

    opportunity = delete_opportunity(
        db,
        opportunity_id,
    )

    if not opportunity:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    return {
        "message": "Opportunity deleted successfully",
        "opportunity_id": opportunity_id,
    }