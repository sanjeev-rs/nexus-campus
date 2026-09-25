from sqlalchemy.orm import Session

from app.models.student_skill import StudentSkill
from app.models.skill_evidence import SkillEvidence


# ============================================================
# CALCULATE SKILL INTELLIGENCE SCORE
# ============================================================

def calculate_skill_intelligence_score(
    db: Session,
    student_skill_id: int,
) -> float:
    """
    Calculate the intelligence score for a
    student's individual skill.

    Scoring:

    With evidence:
        Proficiency      = 50%
        Evidence         = 30%
        Verification     = 20%

    Without evidence:
        Proficiency      = 80%
        Verification     = 20%
    """

    student_skill = (
        db.query(StudentSkill)
        .filter(
            StudentSkill.id == student_skill_id
        )
        .first()
    )

    if not student_skill:
        return 0.0

    proficiency = float(
        student_skill.proficiency_level or 0
    )

    # --------------------------------------------------------
    # GET EVIDENCE
    # --------------------------------------------------------

    evidence = (
        db.query(SkillEvidence)
        .filter(
            SkillEvidence.student_skill_id
            == student_skill_id
        )
        .all()
    )

    evidence_scores = [
        float(item.score)
        for item in evidence
        if item.score is not None
    ]

    # --------------------------------------------------------
    # EVIDENCE SCORE
    # --------------------------------------------------------

    if evidence_scores:
        evidence_score = (
            sum(evidence_scores)
            / len(evidence_scores)
        )
    else:
        evidence_score = 0.0

    # --------------------------------------------------------
    # VERIFICATION SCORE
    # --------------------------------------------------------

    verification_score = (
        100.0
        if student_skill.verified
        else 0.0
    )

    # --------------------------------------------------------
    # FINAL SCORE
    # --------------------------------------------------------

    if evidence_scores:

        final_score = (
            proficiency * 0.50
            + evidence_score * 0.30
            + verification_score * 0.20
        )

    else:

        final_score = (
            proficiency * 0.80
            + verification_score * 0.20
        )

    return round(
        min(final_score, 100.0),
        2,
    )


# ============================================================
# CLASSIFY SKILL LEVEL
# ============================================================

def classify_skill_level(
    score: float,
) -> str:
    """
    Convert a numerical intelligence score
    into a human-readable skill level.
    """

    if score >= 85:
        return "expert"

    if score >= 70:
        return "advanced"

    if score >= 50:
        return "intermediate"

    if score >= 30:
        return "beginner"

    return "foundational"


# ============================================================
# ANALYZE STUDENT SKILLS
# ============================================================

def analyze_student_skills(
    db: Session,
    student_id: int,
):
    """
    Analyze every skill belonging to a student.

    Returns deterministic skill intelligence.
    No LLM or external AI is used here.
    """

    student_skills = (
        db.query(StudentSkill)
        .filter(
            StudentSkill.student_id == student_id
        )
        .all()
    )

    results = []

    for student_skill in student_skills:

        score = calculate_skill_intelligence_score(
            db,
            student_skill.id,
        )

        level = classify_skill_level(
            score
        )

        results.append(
            {
                "student_skill_id": student_skill.id,
                "skill_id": student_skill.skill_id,
                "intelligence_score": score,
                "level": level,
                "verified": student_skill.verified,
                "source": student_skill.source,
            }
        )

    return results


# ============================================================
# GET STUDENT SKILL SUMMARY
# ============================================================

def get_student_skill_summary(
    db: Session,
    student_id: int,
):
    """
    Generate an aggregated summary of
    the student's skill intelligence.
    """

    analysis = analyze_student_skills(
        db,
        student_id,
    )

    if not analysis:
        return {
            "student_id": student_id,
            "skill_count": 0,
            "average_score": 0.0,
            "expert_skills": 0,
            "advanced_skills": 0,
            "intermediate_skills": 0,
            "beginner_skills": 0,
            "foundational_skills": 0,
        }

    scores = [
        item["intelligence_score"]
        for item in analysis
    ]

    return {
        "student_id": student_id,
        "skill_count": len(analysis),
        "average_score": round(
            sum(scores) / len(scores),
            2,
        ),
        "expert_skills": sum(
            1
            for item in analysis
            if item["level"] == "expert"
        ),
        "advanced_skills": sum(
            1
            for item in analysis
            if item["level"] == "advanced"
        ),
        "intermediate_skills": sum(
            1
            for item in analysis
            if item["level"] == "intermediate"
        ),
        "beginner_skills": sum(
            1
            for item in analysis
            if item["level"] == "beginner"
        ),
        "foundational_skills": sum(
            1
            for item in analysis
            if item["level"] == "foundational"
        ),
    }