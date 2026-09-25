from sqlalchemy.orm import Session

from app.models.student_skill import StudentSkill
from app.models.skill import Skill
from app.models.skill_evidence import SkillEvidence


# ============================================================
# GET ALL STUDENT SKILLS
# ============================================================

def get_student_skills(
    db: Session,
    student_id: int,
):
    """
    Get all skills associated with a student.

    Returns the student's skills along with
    their proficiency and evidence information.
    """

    skills = (
        db.query(StudentSkill)
        .filter(
            StudentSkill.student_id == student_id
        )
        .all()
    )

    return skills


# ============================================================
# GET SINGLE STUDENT SKILL
# ============================================================

def get_student_skill(
    db: Session,
    student_id: int,
    skill_id: int,
):
    """
    Get a specific skill belonging to a student.
    """

    return (
        db.query(StudentSkill)
        .filter(
            StudentSkill.student_id == student_id,
            StudentSkill.skill_id == skill_id,
        )
        .first()
    )


# ============================================================
# GET SKILL EVIDENCE
# ============================================================

def get_skill_evidence(
    db: Session,
    student_skill_id: int,
):
    """
    Get evidence associated with a student skill.
    """

    return (
        db.query(SkillEvidence)
        .filter(
            SkillEvidence.student_skill_id
            == student_skill_id
        )
        .all()
    )


# ============================================================
# GET STUDENT SKILL WITH EVIDENCE
# ============================================================

def get_student_skill_with_evidence(
    db: Session,
    student_id: int,
):
    """
    Get all student skills and their
    associated evidence.
    """

    student_skills = (
        db.query(StudentSkill)
        .filter(
            StudentSkill.student_id == student_id
        )
        .all()
    )

    result = []

    for student_skill in student_skills:

        evidence = get_skill_evidence(
            db,
            student_skill.id,
        )

        result.append(
            {
                "student_skill": student_skill,
                "evidence": evidence,
            }
        )

    return result


# ============================================================
# GET VERIFIED SKILLS
# ============================================================

def get_verified_student_skills(
    db: Session,
    student_id: int,
):
    """
    Return skills that have been verified.
    """

    return (
        db.query(StudentSkill)
        .filter(
            StudentSkill.student_id == student_id,
            StudentSkill.is_verified == True,
        )
        .all()
    )


# ============================================================
# GET SKILLS ABOVE PROFICIENCY
# ============================================================

def get_skills_above_proficiency(
    db: Session,
    student_id: int,
    minimum_proficiency: float = 50,
):
    """
    Return student skills whose proficiency
    is greater than or equal to the specified value.
    """

    return (
        db.query(StudentSkill)
        .filter(
            StudentSkill.student_id == student_id,
            StudentSkill.proficiency_level
            >= minimum_proficiency,
        )
        .all()
    )


# ============================================================
# GET SKILLS BELOW PROFICIENCY
# ============================================================

def get_skills_below_proficiency(
    db: Session,
    student_id: int,
    maximum_proficiency: float = 50,
):
    """
    Return student skills whose proficiency
    is below the specified value.
    """

    return (
        db.query(StudentSkill)
        .filter(
            StudentSkill.student_id == student_id,
            StudentSkill.proficiency_level
            < maximum_proficiency,
        )
        .all()
    )


# ============================================================
# SKILL INTELLIGENCE SUMMARY
# ============================================================

def get_skill_intelligence_summary(
    db: Session,
    student_id: int,
):
    """
    Generate a basic deterministic summary
    of a student's skills.

    This service does not perform AI/LLM processing.
    Intelligence calculations are handled by
    skill_intelligence_engine.py.
    """

    skills = get_student_skills(
        db,
        student_id,
    )

    if not skills:
        return {
            "student_id": student_id,
            "skill_count": 0,
            "average_proficiency": 0,
            "verified_skill_count": 0,
            "strong_skill_count": 0,
            "weak_skill_count": 0,
        }

    total_proficiency = sum(
        skill.proficiency_level
        for skill in skills
    )

    average_proficiency = (
        total_proficiency / len(skills)
    )

    verified_skill_count = sum(
        1
        for skill in skills
        if skill.is_verified
    )

    strong_skill_count = sum(
        1
        for skill in skills
        if skill.proficiency_level >= 70
    )

    weak_skill_count = sum(
        1
        for skill in skills
        if skill.proficiency_level < 50
    )

    return {
        "student_id": student_id,
        "skill_count": len(skills),
        "average_proficiency": round(
            average_proficiency,
            2,
        ),
        "verified_skill_count": verified_skill_count,
        "strong_skill_count": strong_skill_count,
        "weak_skill_count": weak_skill_count,
    }