from sqlalchemy.orm import Session

from app.models.student import Student
from app.models.student_skill import StudentSkill
from app.models.project_member import ProjectMember
from app.models.opportunity import Opportunity


def calculate_student_readiness(
    academic_score: float,
    skill_score: float,
    project_score: float,
    engagement_score: float,
) -> float:
    """
    Calculate overall student readiness for decision-making.

    Weights:
    - Academic performance: 25%
    - Skill development: 35%
    - Project experience: 25%
    - Engagement: 15%
    """

    readiness = (
        academic_score * 0.25
        + skill_score * 0.35
        + project_score * 0.25
        + engagement_score * 0.15
    )

    return round(min(max(readiness, 0.0), 100.0), 2)


def classify_readiness(readiness_score: float) -> str:
    """
    Classify student readiness level.
    """

    if readiness_score >= 85:
        return "highly-ready"

    if readiness_score >= 70:
        return "ready"

    if readiness_score >= 50:
        return "developing"

    if readiness_score >= 30:
        return "needs-development"

    return "early-stage"


def generate_decision_recommendations(
    academic_score: float,
    skill_score: float,
    project_score: float,
    engagement_score: float,
):
    """
    Generate deterministic recommendations based on
    student intelligence indicators.
    """

    recommendations = []

    if academic_score < 50:
        recommendations.append(
            "Student should strengthen academic performance."
        )

    if skill_score < 50:
        recommendations.append(
            "Student should develop and demonstrate more technical or domain skills."
        )

    if project_score < 50:
        recommendations.append(
            "Student should participate in more projects and practical activities."
        )

    if engagement_score < 50:
        recommendations.append(
            "Student should increase participation in campus activities."
        )

    if not recommendations:
        recommendations.append(
            "Student demonstrates balanced development across major indicators."
        )

    return recommendations


def generate_decision_summary(
    readiness_score: float,
    readiness_level: str,
    recommendations: list[str],
):
    """
    Generate a structured decision summary.
    """

    return {
        "readiness_score": readiness_score,
        "readiness_level": readiness_level,
        "recommendation_count": len(recommendations),
        "recommendations": recommendations,
    }


def analyze_student_decision(
    db: Session,
    student_id: int,
):
    """
    Analyze a student's current development state
    for decision-support purposes.

    This function intentionally uses existing NEXUS
    database entities and does not make AI predictions.
    """

    student = (
        db.query(Student)
        .filter(Student.id == student_id)
        .first()
    )

    if not student:
        return None

    skills = (
        db.query(StudentSkill)
        .filter(StudentSkill.student_id == student_id)
        .all()
    )

    projects = (
        db.query(ProjectMember)
        .filter(ProjectMember.student_id == student_id)
        .all()
    )

    # Academic score
    academic_score = 0.0

    if hasattr(student, "academic_average") and student.academic_average is not None:
        academic_score = float(student.academic_average)

    # Skill score
    skill_score = 0.0

    if skills:
        proficiency_values = [
            float(skill.proficiency_level)
            for skill in skills
            if skill.proficiency_level is not None
        ]

        if proficiency_values:
            skill_score = sum(proficiency_values) / len(proficiency_values)

            # Convert 1–5 proficiency scale to 0–100
            if skill_score <= 5:
                skill_score = skill_score * 20

    # Project score
    project_count = len(projects)

    if project_count > 0:
        project_score = min(project_count * 20, 100.0)
    else:
        project_score = 0.0

    # Engagement score
    engagement_score = min(project_count * 15, 100.0)

    readiness_score = calculate_student_readiness(
        academic_score=academic_score,
        skill_score=skill_score,
        project_score=project_score,
        engagement_score=engagement_score,
    )

    readiness_level = classify_readiness(readiness_score)

    recommendations = generate_decision_recommendations(
        academic_score=academic_score,
        skill_score=skill_score,
        project_score=project_score,
        engagement_score=engagement_score,
    )

    summary = generate_decision_summary(
        readiness_score=readiness_score,
        readiness_level=readiness_level,
        recommendations=recommendations,
    )

    return {
        "student_id": student_id,
        "academic_score": round(academic_score, 2),
        "skill_score": round(skill_score, 2),
        "project_score": round(project_score, 2),
        "engagement_score": round(engagement_score, 2),
        "project_count": project_count,
        **summary,
    }


def analyze_opportunity_fit(
    db: Session,
    student_id: int,
    opportunity_id: int,
):
    """
    Analyze a basic student-opportunity fit.

    This is the deterministic foundation for the future
    NEXUS Decision Intelligence recommendation engine.
    """

    student = (
        db.query(Student)
        .filter(Student.id == student_id)
        .first()
    )

    opportunity = (
        db.query(Opportunity)
        .filter(Opportunity.id == opportunity_id)
        .first()
    )

    if not student or not opportunity:
        return None

    student_skills = (
        db.query(StudentSkill)
        .filter(StudentSkill.student_id == student_id)
        .all()
    )

    student_skill_ids = {
        skill.skill_id
        for skill in student_skills
        if skill.skill_id is not None
    }

    # Some opportunity models may not yet contain
    # a direct skill relationship.
    required_skill_ids = set()

    if hasattr(opportunity, "skills") and opportunity.skills:
        required_skill_ids = {
            skill.id
            for skill in opportunity.skills
            if getattr(skill, "id", None) is not None
        }

    if required_skill_ids:
        matched_skills = student_skill_ids.intersection(
            required_skill_ids
        )

        skill_match_score = (
            len(matched_skills) / len(required_skill_ids)
        ) * 100
    else:
        matched_skills = set()
        skill_match_score = 0.0

    skill_match_score = round(
        min(max(skill_match_score, 0.0), 100.0),
        2,
    )

    if skill_match_score >= 80:
        fit_level = "strong-fit"
    elif skill_match_score >= 60:
        fit_level = "good-fit"
    elif skill_match_score >= 40:
        fit_level = "partial-fit"
    else:
        fit_level = "low-fit"

    return {
        "student_id": student_id,
        "opportunity_id": opportunity_id,
        "required_skill_count": len(required_skill_ids),
        "matched_skill_count": len(matched_skills),
        "skill_match_score": skill_match_score,
        "fit_level": fit_level,
    }