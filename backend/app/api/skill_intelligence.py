from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.roles import UserRole
from app.core.security import get_current_nexus_user
from app.database.connection import get_db

from app.services.student_intelligence_service import (
    generate_student_intelligence_snapshot,
)

from app.services.skill_intelligence_engine import (
    analyze_student_skills,
)


router = APIRouter()


# ============================================================
# ACCESS CONTROL
# ============================================================

def check_student_intelligence_access(
    current_user,
    student_id: int,
):
    """
    Check whether the authenticated NEXUS user
    can access intelligence for a student.

    Student:
        Can access only their own intelligence.

    Faculty:
        Can access student intelligence.

    HOD:
        Can access student intelligence.

    Admin:
        Can access student intelligence.

    Super Admin:
        Can access student intelligence.

    Management:
        Cannot access individual student intelligence.
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
                    "their own intelligence"
                ),
            )

        return

    # --------------------------------------------------------
    # FACULTY / HOD / ADMIN / SUPER ADMIN
    # --------------------------------------------------------

    allowed_roles = {
        UserRole.FACULTY.value,
        UserRole.HOD.value,
        UserRole.ADMIN.value,
        UserRole.SUPER_ADMIN.value,
    }

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "You do not have permission "
                "to access student intelligence"
            ),
        )


# ============================================================
# GET COMPLETE STUDENT INTELLIGENCE
# ============================================================

@router.get("/{student_id}")
def read_student_intelligence(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Generate and return the complete intelligence
    snapshot for a student.
    """

    check_student_intelligence_access(
        current_user,
        student_id,
    )

    intelligence = generate_student_intelligence_snapshot(
        db,
        student_id,
    )

    if not intelligence:
        raise HTTPException(
            status_code=404,
            detail="Student intelligence not found",
        )

    return intelligence


# ============================================================
# ANALYZE STUDENT SKILLS
# ============================================================

@router.get("/{student_id}/skills")
def read_student_skill_intelligence(
    student_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Generate deterministic skill intelligence
    for a specific student.
    """

    check_student_intelligence_access(
        current_user,
        student_id,
    )

    analysis = analyze_student_skills(
        db,
        student_id,
    )

    return {
        "student_id": student_id,
        "skill_count": len(analysis),
        "skills": analysis,
    }