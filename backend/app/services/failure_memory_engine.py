from sqlalchemy.orm import Session

from app.models.failure_memory import FailureMemory


# ============================================================
# FAILURE SEVERITY
# ============================================================

def calculate_failure_severity(
    failure: FailureMemory,
) -> str:

    impact = (failure.impact or "").lower()

    high_impact_terms = [
        "critical",
        "complete failure",
        "project stopped",
        "unusable",
        "major",
        "severe",
    ]

    medium_impact_terms = [
        "delay",
        "partial",
        "performance",
        "rework",
        "moderate",
    ]

    if any(
        term in impact
        for term in high_impact_terms
    ):
        return "high"

    if any(
        term in impact
        for term in medium_impact_terms
    ):
        return "medium"

    return "low"


# ============================================================
# FAILURE COMPLETENESS
# ============================================================

def calculate_failure_completeness(
    failure: FailureMemory,
) -> float:

    fields = [
        failure.failure_type,
        failure.failure_description,
        failure.root_cause,
        failure.impact,
        failure.resolution,
        failure.lessons_learned,
        failure.preventive_recommendation,
        failure.evidence_reference,
    ]

    completed_fields = sum(
        1
        for field in fields
        if field
    )

    return round(
        (completed_fields / len(fields)) * 100,
        2,
    )


# ============================================================
# FAILURE INSIGHTS
# ============================================================

def generate_failure_insights(
    failure: FailureMemory,
) -> list[str]:

    insights = []

    if failure.root_cause:
        insights.append(
            "A root cause has been documented."
        )
    else:
        insights.append(
            "Root cause analysis is missing."
        )

    if failure.resolution:
        insights.append(
            "A resolution has been documented."
        )
    else:
        insights.append(
            "No resolution has been documented."
        )

    if failure.lessons_learned:
        insights.append(
            "Institutional learning has been captured."
        )
    else:
        insights.append(
            "Lessons learned should be documented."
        )

    if failure.preventive_recommendation:
        insights.append(
            "A preventive recommendation is available."
        )
    else:
        insights.append(
            "A preventive recommendation should be added."
        )

    if failure.evidence_reference:
        insights.append(
            "Supporting evidence is linked."
        )
    else:
        insights.append(
            "Supporting evidence is not linked."
        )

    return insights


# ============================================================
# ANALYZE FAILURE
# ============================================================

def analyze_failure(
    db: Session,
    failure_id: int,
):

    failure = (
        db.query(FailureMemory)
        .filter(
            FailureMemory.id == failure_id
        )
        .first()
    )

    if not failure:
        return None

    severity = calculate_failure_severity(
        failure
    )

    completeness = calculate_failure_completeness(
        failure
    )

    insights = generate_failure_insights(
        failure
    )

    return {
        "failure_id": failure.id,
        "project_id": failure.project_id,
        "failure_type": failure.failure_type,

        "severity": severity,

        "completeness_score": completeness,

        "has_root_cause": bool(
            failure.root_cause
        ),

        "has_resolution": bool(
            failure.resolution
        ),

        "has_lessons_learned": bool(
            failure.lessons_learned
        ),

        "has_preventive_recommendation": bool(
            failure.preventive_recommendation
        ),

        "has_evidence": bool(
            failure.evidence_reference
        ),

        "insights": insights,
    }


# ============================================================
# ANALYZE PROJECT FAILURE HISTORY
# ============================================================

def analyze_project_failures(
    db: Session,
    project_id: int,
):

    failures = (
        db.query(FailureMemory)
        .filter(
            FailureMemory.project_id == project_id
        )
        .all()
    )

    analyses = []

    for failure in failures:

        analysis = analyze_failure(
            db,
            failure.id,
        )

        if analysis:
            analyses.append(
                analysis
            )

    return {
        "project_id": project_id,
        "failure_count": len(failures),
        "failures": analyses,
    }