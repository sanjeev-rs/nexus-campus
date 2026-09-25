from sqlalchemy.orm import Session

from app.models.opportunity import Opportunity
from app.models.opportunity_skill import OpportunitySkill
from app.models.student_skill import StudentSkill


# ---------------------------------------------------------
# CALCULATE MATCH SCORE
# ---------------------------------------------------------

def calculate_match_score(
    student_skills,
    opportunity_skills,
) -> float:

    if not opportunity_skills:
        return 0.0

    student_skill_map = {
        skill.skill_id: skill.proficiency_level
        for skill in student_skills
    }

    matched_scores = []

    for opportunity_skill in opportunity_skills:

        student_proficiency = student_skill_map.get(
            opportunity_skill.skill_id
        )

        if student_proficiency is None:
            continue

        required_level = (
            opportunity_skill.required_proficiency
            if opportunity_skill.required_proficiency is not None
            else 0.0
        )

        if required_level <= 0:
            match_percentage = 100.0
        else:
            match_percentage = (
                student_proficiency / required_level
            ) * 100

        matched_scores.append(
            min(match_percentage, 100.0)
        )

    if not matched_scores:
        return 0.0

    return round(
        sum(matched_scores) / len(matched_scores),
        2,
    )


# ---------------------------------------------------------
# IDENTIFY SKILL GAPS
# ---------------------------------------------------------

def identify_skill_gaps(
    student_skills,
    opportunity_skills,
):

    student_skill_map = {
        skill.skill_id: skill.proficiency_level
        for skill in student_skills
    }

    gaps = []

    for opportunity_skill in opportunity_skills:

        student_proficiency = student_skill_map.get(
            opportunity_skill.skill_id
        )

        required_level = (
            opportunity_skill.required_proficiency
            if opportunity_skill.required_proficiency is not None
            else 0.0
        )

        if student_proficiency is None:

            gaps.append({
                "skill_id": opportunity_skill.skill_id,
                "current_level": 0.0,
                "required_level": required_level,
                "gap": required_level,
            })

        elif student_proficiency < required_level:

            gaps.append({
                "skill_id": opportunity_skill.skill_id,
                "current_level": student_proficiency,
                "required_level": required_level,
                "gap": round(
                    required_level - student_proficiency,
                    2,
                ),
            })

    return gaps


# ---------------------------------------------------------
# CLASSIFY MATCH
# ---------------------------------------------------------

def classify_match(match_score: float) -> str:

    if match_score >= 85:
        return "excellent"

    if match_score >= 70:
        return "strong"

    if match_score >= 50:
        return "moderate"

    if match_score >= 30:
        return "weak"

    return "poor"


# ---------------------------------------------------------
# ANALYZE SINGLE OPPORTUNITY
# ---------------------------------------------------------

def analyze_student_opportunity(
    db: Session,
    student_id: int,
    opportunity_id: int,
):

    opportunity = (
        db.query(Opportunity)
        .filter(Opportunity.id == opportunity_id)
        .first()
    )

    if not opportunity:
        return None

    student_skills = (
        db.query(StudentSkill)
        .filter(
            StudentSkill.student_id == student_id
        )
        .all()
    )

    opportunity_skills = (
        db.query(OpportunitySkill)
        .filter(
            OpportunitySkill.opportunity_id
            == opportunity_id
        )
        .all()
    )

    match_score = calculate_match_score(
        student_skills,
        opportunity_skills,
    )

    skill_gaps = identify_skill_gaps(
        student_skills,
        opportunity_skills,
    )

    classification = classify_match(
        match_score
    )

    return {
        "student_id": student_id,
        "opportunity_id": opportunity.id,
        "opportunity_title": opportunity.title,
        "match_score": match_score,
        "classification": classification,
        "skill_gap_count": len(skill_gaps),
        "skill_gaps": skill_gaps,
    }


# ---------------------------------------------------------
# ANALYZE ALL OPPORTUNITIES FOR STUDENT
# ---------------------------------------------------------

def analyze_student_opportunities(
    db: Session,
    student_id: int,
):

    opportunities = (
        db.query(Opportunity)
        .all()
    )

    results = []

    for opportunity in opportunities:

        analysis = analyze_student_opportunity(
            db,
            student_id,
            opportunity.id,
        )

        if analysis:
            results.append(analysis)

    results.sort(
        key=lambda item: item["match_score"],
        reverse=True,
    )

    return {
        "student_id": student_id,
        "opportunity_count": len(results),
        "recommendations": results,
    }