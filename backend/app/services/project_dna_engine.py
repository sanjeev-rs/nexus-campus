from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.project_skill import ProjectSkill
from app.models.project_member import ProjectMember
from app.models.project_outcome import ProjectOutcome
from app.models.project_evidence import ProjectEvidence


# ============================================================
# PROJECT COMPLEXITY
# ============================================================

def calculate_project_complexity(
    skill_count: int,
    member_count: int,
    outcome_count: int,
    evidence_count: int,
) -> float:

    skill_score = min(skill_count * 15, 40)

    member_score = min(member_count * 10, 20)

    outcome_score = min(outcome_count * 10, 20)

    evidence_score = min(evidence_count * 5, 20)

    complexity = (
        skill_score
        + member_score
        + outcome_score
        + evidence_score
    )

    return round(
        min(complexity, 100),
        2,
    )


# ============================================================
# OUTCOME SCORE
# ============================================================

def calculate_outcome_score(
    outcomes,
) -> float:

    scores = [
        outcome.score
        for outcome in outcomes
        if outcome.score is not None
    ]

    if not scores:
        return 0.0

    return round(
        sum(scores) / len(scores),
        2,
    )


# ============================================================
# EVIDENCE SCORE
# ============================================================

def calculate_evidence_score(
    evidence_count: int,
) -> float:

    if evidence_count == 0:
        return 0.0

    return min(
        evidence_count * 20,
        100.0,
    )


# ============================================================
# PROJECT DNA SCORE
# ============================================================

def calculate_project_dna_score(
    complexity_score: float,
    outcome_score: float,
    evidence_score: float,
) -> float:

    dna_score = (
        complexity_score * 0.40
        + outcome_score * 0.35
        + evidence_score * 0.25
    )

    return round(
        min(dna_score, 100.0),
        2,
    )


# ============================================================
# PROJECT CLASSIFICATION
# ============================================================

def classify_project(
    dna_score: float,
) -> str:

    if dna_score >= 85:
        return "high-impact"

    if dna_score >= 70:
        return "advanced"

    if dna_score >= 50:
        return "developing"

    if dna_score >= 30:
        return "basic"

    return "early-stage"


# ============================================================
# PROJECT INSIGHTS
# ============================================================

def generate_project_insights(
    skill_count: int,
    member_count: int,
    outcome_count: int,
    evidence_count: int,
    outcome_score: float,
) -> list[str]:

    insights = []

    if skill_count >= 4:
        insights.append(
            "Project demonstrates multidisciplinary skill usage."
        )

    elif skill_count >= 2:
        insights.append(
            "Project combines multiple technical or domain skills."
        )

    else:
        insights.append(
            "Project currently demonstrates limited skill diversity."
        )

    if member_count >= 4:
        insights.append(
            "Project has a relatively large collaboration structure."
        )

    elif member_count >= 2:
        insights.append(
            "Project demonstrates collaborative development."
        )

    else:
        insights.append(
            "Project has limited collaboration evidence."
        )

    if outcome_count == 0:
        insights.append(
            "No measurable project outcomes have been recorded yet."
        )

    elif outcome_score >= 70:
        insights.append(
            "Project outcomes show strong measurable results."
        )

    else:
        insights.append(
            "Project outcomes are present but could be strengthened."
        )

    if evidence_count == 0:
        insights.append(
            "Project requires stronger supporting evidence."
        )

    elif evidence_count >= 4:
        insights.append(
            "Project has strong supporting evidence."
        )

    else:
        insights.append(
            "Project has some supporting evidence."
        )

    return insights


# ============================================================
# GENERATE PROJECT DNA
# ============================================================

def analyze_project_dna(
    db: Session,
    project_id: int,
):

    project = (
        db.query(Project)
        .filter(
            Project.id == project_id
        )
        .first()
    )

    if not project:
        return None

    skills = (
        db.query(ProjectSkill)
        .filter(
            ProjectSkill.project_id == project_id
        )
        .all()
    )

    members = (
        db.query(ProjectMember)
        .filter(
            ProjectMember.project_id == project_id
        )
        .all()
    )

    outcomes = (
        db.query(ProjectOutcome)
        .filter(
            ProjectOutcome.project_id == project_id
        )
        .all()
    )

    evidence = (
        db.query(ProjectEvidence)
        .filter(
            ProjectEvidence.project_id == project_id
        )
        .all()
    )

    skill_count = len(skills)

    member_count = len(members)

    outcome_count = len(outcomes)

    evidence_count = len(evidence)

    # --------------------------------------------------------
    # Calculate intelligence dimensions
    # --------------------------------------------------------

    complexity_score = calculate_project_complexity(
        skill_count,
        member_count,
        outcome_count,
        evidence_count,
    )

    outcome_score = calculate_outcome_score(
        outcomes,
    )

    evidence_score = calculate_evidence_score(
        evidence_count,
    )

    dna_score = calculate_project_dna_score(
        complexity_score,
        outcome_score,
        evidence_score,
    )

    classification = classify_project(
        dna_score,
    )

    insights = generate_project_insights(
        skill_count,
        member_count,
        outcome_count,
        evidence_count,
        outcome_score,
    )

    return {
        "project_id": project_id,
        "project_title": project.title,

        "skill_count": skill_count,
        "member_count": member_count,
        "outcome_count": outcome_count,
        "evidence_count": evidence_count,

        "complexity_score": complexity_score,
        "outcome_score": outcome_score,
        "evidence_score": evidence_score,

        "dna_score": dna_score,

        "classification": classification,

        "insights": insights,
    }