from sqlalchemy.orm import Session

from app.services.campus_intelligence_engine import (
    calculate_campus_metrics,
    calculate_campus_activity_score,
)


# =========================================================
# DECISION PRIORITY
# =========================================================

def calculate_priority(score: float) -> str:

    if score >= 80:
        return "critical"

    if score >= 60:
        return "high"

    if score >= 40:
        return "medium"

    return "low"


# =========================================================
# PROJECT ACTIVITY DECISION
# =========================================================

def analyze_project_activity(
    metrics: dict,
) -> dict:

    student_count = metrics["student_count"]
    project_count = metrics["project_count"]

    if student_count == 0:
        return {
            "area": "Project Activity",
            "status": "insufficient-data",
            "priority": "low",
            "score": 0.0,
            "finding": "Student data is not available for project activity analysis.",
            "recommendation": "Populate student and project data.",
        }

    project_ratio = project_count / student_count

    if project_ratio < 0.25:
        score = 90.0
        status = "low"
        finding = "Project activity is very low relative to the student population."
        recommendation = (
            "Management should encourage project-based learning, "
            "hackathons, innovation programs, and interdisciplinary projects."
        )

    elif project_ratio < 0.50:
        score = 70.0
        status = "developing"
        finding = "Project activity is developing but remains below a strong campus level."
        recommendation = (
            "Increase opportunities for students to participate in "
            "real-world and interdisciplinary projects."
        )

    elif project_ratio < 1.0:
        score = 45.0
        status = "moderate"
        finding = "Project activity is moderate relative to the student population."
        recommendation = (
            "Maintain project activity while improving project quality "
            "and measurable outcomes."
        )

    else:
        score = 20.0
        status = "strong"
        finding = "Project activity is strong relative to the student population."
        recommendation = (
            "Focus on project quality, innovation, impact, and external validation."
        )

    return {
        "area": "Project Activity",
        "status": status,
        "priority": calculate_priority(score),
        "score": score,
        "finding": finding,
        "recommendation": recommendation,
    }


# =========================================================
# OPPORTUNITY AVAILABILITY DECISION
# =========================================================

def analyze_opportunity_availability(
    metrics: dict,
) -> dict:

    student_count = metrics["student_count"]
    active_opportunity_count = metrics[
        "active_opportunity_count"
    ]

    if student_count == 0:
        return {
            "area": "Opportunity Availability",
            "status": "insufficient-data",
            "priority": "low",
            "score": 0.0,
            "finding": "Student data is not available.",
            "recommendation": "Populate student data before evaluating opportunity coverage.",
        }

    opportunity_ratio = (
        active_opportunity_count / student_count
    )

    if active_opportunity_count == 0:

        score = 95.0

        status = "critical"

        finding = (
            "No active opportunities are currently available "
            "for students."
        )

        recommendation = (
            "Increase partnerships with companies, research organizations, "
            "competitions, internships, and external opportunity providers."
        )

    elif opportunity_ratio < 0.05:

        score = 80.0

        status = "low"

        finding = (
            "Active opportunities are very limited "
            "relative to the student population."
        )

        recommendation = (
            "Expand the institutional opportunity pool "
            "and establish more external partnerships."
        )

    elif opportunity_ratio < 0.15:

        score = 55.0

        status = "developing"

        finding = (
            "Opportunity availability is developing "
            "but could support more students."
        )

        recommendation = (
            "Continue expanding opportunities while improving "
            "student-opportunity matching."
        )

    else:

        score = 25.0

        status = "strong"

        finding = (
            "The campus has a relatively healthy "
            "number of active opportunities."
        )

        recommendation = (
            "Focus on improving opportunity relevance "
            "and personalized matching."
        )

    return {
        "area": "Opportunity Availability",
        "status": status,
        "priority": calculate_priority(score),
        "score": score,
        "finding": finding,
        "recommendation": recommendation,
    }


# =========================================================
# FAILURE MEMORY DECISION
# =========================================================

def analyze_failure_learning(
    metrics: dict,
) -> dict:

    project_count = metrics["project_count"]
    failure_count = metrics["failure_count"]

    if project_count == 0:

        return {
            "area": "Failure Learning",
            "status": "insufficient-data",
            "priority": "low",
            "score": 0.0,
            "finding": "No project data is available.",
            "recommendation": "Populate project data before evaluating failure learning.",
        }

    if failure_count == 0:

        score = 65.0

        status = "missing"

        finding = (
            "No project failures have been documented "
            "in Failure Memory."
        )

        recommendation = (
            "Encourage teams to document project failures, "
            "root causes, resolutions, and lessons learned."
        )

    else:

        failure_ratio = (
            failure_count / project_count
        )

        if failure_ratio < 0.10:

            score = 30.0

            status = "healthy"

            finding = (
                "Failure Memory contains a relatively small "
                "number of documented failures."
            )

            recommendation = (
                "Continue documenting failures and ensure "
                "lessons learned are captured."
            )

        else:

            score = 50.0

            status = "active-learning"

            finding = (
                "Failure Memory contains a significant amount "
                "of project learning."
            )

            recommendation = (
                "Analyze recurring failure patterns and convert "
                "lessons into preventive recommendations."
            )

    return {
        "area": "Failure Learning",
        "status": status,
        "priority": calculate_priority(score),
        "score": score,
        "finding": finding,
        "recommendation": recommendation,
    }


# =========================================================
# SKILL LANDSCAPE DECISION
# =========================================================

def analyze_skill_landscape(
    metrics: dict,
) -> dict:

    skill_count = metrics["skill_count"]

    if skill_count == 0:

        score = 90.0

        status = "missing"

        finding = (
            "The campus does not yet have an established "
            "institutional skill inventory."
        )

        recommendation = (
            "Build a structured campus skill taxonomy "
            "and connect student skills to projects and opportunities."
        )

    elif skill_count < 10:

        score = 65.0

        status = "developing"

        finding = (
            "The institutional skill inventory is still limited."
        )

        recommendation = (
            "Expand the skill taxonomy and continuously update "
            "it using project and student data."
        )

    else:

        score = 20.0

        status = "strong"

        finding = (
            "The campus has a broad institutional skill inventory."
        )

        recommendation = (
            "Use the skill inventory to identify skill gaps, "
            "emerging capabilities, and opportunity alignment."
        )

    return {
        "area": "Skill Landscape",
        "status": status,
        "priority": calculate_priority(score),
        "score": score,
        "finding": finding,
        "recommendation": recommendation,
    }


# =========================================================
# GENERATE DECISIONS
# =========================================================

def generate_decisions(
    metrics: dict,
) -> list[dict]:

    decisions = []

    decisions.append(
        analyze_project_activity(metrics)
    )

    decisions.append(
        analyze_opportunity_availability(metrics)
    )

    decisions.append(
        analyze_failure_learning(metrics)
    )

    decisions.append(
        analyze_skill_landscape(metrics)
    )

    decisions.sort(
        key=lambda item: item["score"],
        reverse=True,
    )

    return decisions


# =========================================================
# OVERALL DECISION SCORE
# =========================================================

def calculate_decision_score(
    decisions: list[dict],
) -> float:

    if not decisions:
        return 0.0

    average_priority_score = sum(
        decision["score"]
        for decision in decisions
    ) / len(decisions)

    return round(
        min(average_priority_score, 100.0),
        2,
    )


# =========================================================
# CAMPUS DECISION INTELLIGENCE
# =========================================================

def generate_decision_intelligence(
    db: Session,
):

    metrics = calculate_campus_metrics(
        db
    )

    campus_activity_score = (
        calculate_campus_activity_score(
            student_count=metrics["student_count"],
            project_count=metrics["project_count"],
            opportunity_count=metrics["opportunity_count"],
            failure_count=metrics["failure_count"],
        )
    )

    decisions = generate_decisions(
        metrics
    )

    decision_score = calculate_decision_score(
        decisions
    )

    return {
        "campus_metrics": metrics,
        "campus_activity_score": campus_activity_score,
        "decision_score": decision_score,
        "decision_count": len(decisions),
        "decisions": decisions,
    }