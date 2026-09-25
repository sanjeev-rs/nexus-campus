from sqlalchemy.orm import Session

from app.services.student_intelligence_service import (
    get_student_intelligence,
)

from app.services.student_twin_engine import (
    generate_student_twin,
)

from app.services.skill_intelligence_engine import (
    analyze_student_skills,
)

from app.services.project_dna_engine import (
    analyze_project_dna,
)

from app.services.failure_memory_engine import (
    analyze_project_failures,
)

from app.services.opportunity_intelligence_engine import (
    analyze_student_opportunities,
)

from app.services.campus_intelligence_engine import (
    generate_campus_intelligence,
)

from app.services.decision_intelligence_engine import (
    generate_decision_intelligence,
)


# =========================================================
# STUDENT INTELLIGENCE ORCHESTRATOR
# =========================================================

def generate_student_intelligence_snapshot(
    db: Session,
    student_id: int,
):
    """
    Generate a unified intelligence snapshot for a student.
    """

    student_data = get_student_intelligence(
        db,
        student_id,
    )

    if not student_data:
        return None

    # -----------------------------------------------------
    # STUDENT TWIN
    # -----------------------------------------------------

    student_twin = generate_student_twin(
        db,
        student_id,
    )

    # -----------------------------------------------------
    # SKILL INTELLIGENCE
    # -----------------------------------------------------

    skill_intelligence = analyze_student_skills(
        db,
        student_id,
    )

    # -----------------------------------------------------
    # OPPORTUNITY INTELLIGENCE
    # -----------------------------------------------------

    opportunity_intelligence = (
        analyze_student_opportunities(
            db,
            student_id,
        )
    )

    # -----------------------------------------------------
    # PROJECT INTELLIGENCE
    # -----------------------------------------------------

    project_intelligence = []

    for project_member in student_data[
        "projects"
    ]:

        project_analysis = analyze_project_dna(
            db,
            project_member.project_id,
        )

        if project_analysis:
            project_intelligence.append(
                project_analysis
            )

    # -----------------------------------------------------
    # RETURN UNIFIED SNAPSHOT
    # -----------------------------------------------------

    return {
        "student_id": student_id,

        "student": student_data["student"],

        "profile": student_data["profile"],

        "academic_records": student_data[
            "academic_records"
        ],

        "activities": student_data[
            "activities"
        ],

        "student_twin": student_twin,

        "skill_intelligence": skill_intelligence,

        "project_intelligence": project_intelligence,

        "opportunity_intelligence": (
            opportunity_intelligence
        ),
    }


# =========================================================
# CAMPUS INTELLIGENCE ORCHESTRATOR
# =========================================================

def generate_campus_intelligence_snapshot(
    db: Session,
):
    """
    Generate a unified institutional intelligence
    snapshot for NEXUS.
    """

    campus_intelligence = (
        generate_campus_intelligence(db)
    )

    decision_intelligence = (
        generate_decision_intelligence(db)
    )

    return {
        "campus_intelligence": campus_intelligence,

        "decision_intelligence": (
            decision_intelligence
        ),
    }