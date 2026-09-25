from sqlalchemy.orm import Session

from app.models.student import Student
from app.models.faculty import Faculty
from app.models.department import Department
from app.models.project import Project
from app.models.skill import Skill
from app.models.failure_memory import FailureMemory
from app.models.opportunity import Opportunity


# =========================================================
# CAMPUS METRICS
# =========================================================

def calculate_campus_metrics(
    db: Session,
):
    student_count = (
        db.query(Student)
        .count()
    )

    faculty_count = (
        db.query(Faculty)
        .count()
    )

    department_count = (
        db.query(Department)
        .count()
    )

    project_count = (
        db.query(Project)
        .count()
    )

    skill_count = (
        db.query(Skill)
        .count()
    )

    failure_count = (
        db.query(FailureMemory)
        .count()
    )

    opportunity_count = (
        db.query(Opportunity)
        .count()
    )

    active_opportunity_count = (
        db.query(Opportunity)
        .filter(
            Opportunity.status == "active"
        )
        .count()
    )

    return {
        "student_count": student_count,
        "faculty_count": faculty_count,
        "department_count": department_count,
        "project_count": project_count,
        "skill_count": skill_count,
        "failure_count": failure_count,
        "opportunity_count": opportunity_count,
        "active_opportunity_count": active_opportunity_count,
    }


# =========================================================
# CAMPUS ACTIVITY SCORE
# =========================================================

def calculate_campus_activity_score(
    student_count: int,
    project_count: int,
    opportunity_count: int,
    failure_count: int,
) -> float:

    if student_count == 0:
        return 0.0

    project_activity = min(
        (project_count / student_count) * 100,
        100.0,
    )

    opportunity_activity = min(
        (opportunity_count / student_count) * 100,
        100.0,
    )

    failure_learning_activity = min(
        (failure_count / max(project_count, 1)) * 100,
        100.0,
    )

    score = (
        project_activity * 0.50
        + opportunity_activity * 0.30
        + failure_learning_activity * 0.20
    )

    return round(
        min(score, 100.0),
        2,
    )


# =========================================================
# GENERATE CAMPUS INSIGHTS
# =========================================================

def generate_campus_insights(
    metrics: dict,
) -> list[str]:

    insights = []

    student_count = metrics["student_count"]
    project_count = metrics["project_count"]
    skill_count = metrics["skill_count"]
    failure_count = metrics["failure_count"]
    opportunity_count = metrics["opportunity_count"]
    active_opportunity_count = metrics[
        "active_opportunity_count"
    ]

    # -----------------------------------------------------
    # PROJECT LANDSCAPE
    # -----------------------------------------------------

    if project_count == 0:
        insights.append(
            "No projects have been recorded in the campus knowledge base yet."
        )

    elif student_count > 0:

        project_ratio = (
            project_count / student_count
        )

        if project_ratio >= 1:
            insights.append(
                "Campus demonstrates strong project activity relative to student population."
            )

        elif project_ratio >= 0.5:
            insights.append(
                "Campus has a moderate level of project activity."
            )

        else:
            insights.append(
                "Project activity is currently low relative to the student population."
            )

    # -----------------------------------------------------
    # SKILL LANDSCAPE
    # -----------------------------------------------------

    if skill_count == 0:
        insights.append(
            "No institutional skill inventory has been established yet."
        )

    elif skill_count < 10:
        insights.append(
            "The institutional skill inventory is still developing."
        )

    else:
        insights.append(
            "Campus has a broad skill inventory that can support institutional skill analysis."
        )

    # -----------------------------------------------------
    # FAILURE MEMORY
    # -----------------------------------------------------

    if project_count > 0 and failure_count == 0:
        insights.append(
            "No project failures have been captured yet; failure documentation should be encouraged."
        )

    elif failure_count > 0:
        insights.append(
            "Failure Memory contains documented project learning that can support institutional improvement."
        )

    # -----------------------------------------------------
    # OPPORTUNITIES
    # -----------------------------------------------------

    if opportunity_count == 0:
        insights.append(
            "No opportunities have been added to the institutional opportunity pool yet."
        )

    elif active_opportunity_count == 0:
        insights.append(
            "Opportunities exist, but there are currently no active opportunities."
        )

    else:
        insights.append(
            "Active opportunities are available for student-opportunity matching."
        )

    # -----------------------------------------------------
    # STUDENT POPULATION
    # -----------------------------------------------------

    if student_count == 0:
        insights.append(
            "Student data has not yet been populated."
        )

    else:
        insights.append(
            "Student data can be used as the foundation for campus-wide intelligence."
        )

    return insights


# =========================================================
# CAMPUS INTELLIGENCE
# =========================================================

def generate_campus_intelligence(
    db: Session,
):

    metrics = calculate_campus_metrics(
        db
    )

    activity_score = calculate_campus_activity_score(
        student_count=metrics["student_count"],
        project_count=metrics["project_count"],
        opportunity_count=metrics["opportunity_count"],
        failure_count=metrics["failure_count"],
    )

    insights = generate_campus_insights(
        metrics
    )

    return {
        "campus_metrics": metrics,
        "campus_activity_score": activity_score,
        "insights": insights,
    }