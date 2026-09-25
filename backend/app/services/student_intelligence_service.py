from sqlalchemy.orm import Session

from app.models.student import Student
from app.models.academic_record import AcademicRecord
from app.models.student_skill import StudentSkill
from app.models.project_member import ProjectMember
from app.models.student_activity import StudentActivity
from app.models.student_profile import StudentProfile

from app.services.student_twin_service import (
    get_student_twin,
)

from app.services.skill_intelligence_engine import (
    analyze_student_skills,
)


# ============================================================
# GET RAW STUDENT INTELLIGENCE DATA
# ============================================================

def get_student_intelligence(
    db: Session,
    student_id: int,
):
    """
    Retrieve the complete underlying data required
    for student intelligence.

    This function does not perform AI processing.
    """

    student = (
        db.query(Student)
        .filter(
            Student.id == student_id
        )
        .first()
    )

    if not student:
        return None

    academic_records = (
        db.query(AcademicRecord)
        .filter(
            AcademicRecord.student_id == student_id
        )
        .all()
    )

    skills = (
        db.query(StudentSkill)
        .filter(
            StudentSkill.student_id == student_id
        )
        .all()
    )

    projects = (
        db.query(ProjectMember)
        .filter(
            ProjectMember.student_id == student_id
        )
        .all()
    )

    activities = (
        db.query(StudentActivity)
        .filter(
            StudentActivity.student_id == student_id
        )
        .all()
    )

    profile = (
        db.query(StudentProfile)
        .filter(
            StudentProfile.student_id == student_id
        )
        .first()
    )

    return {
        "student": student,
        "academic_records": academic_records,
        "skills": skills,
        "projects": projects,
        "activities": activities,
        "profile": profile,
    }


# ============================================================
# GENERATE STUDENT INTELLIGENCE SNAPSHOT
# ============================================================

def generate_student_intelligence_snapshot(
    db: Session,
    student_id: int,
):
    """
    Generate the complete deterministic intelligence
    snapshot for a student.

    The snapshot combines:

        1. Student data
        2. Academic records
        3. Skills
        4. Skill intelligence
        5. Projects
        6. Activities
        7. Student profile
        8. Student Twin

    AI/LLM processing is intentionally not performed here.
    """

    data = get_student_intelligence(
        db,
        student_id,
    )

    if not data:
        return None

    # --------------------------------------------------------
    # STUDENT TWIN
    # --------------------------------------------------------

    student_twin = get_student_twin(
        db,
        student_id,
    )

    # --------------------------------------------------------
    # SKILL INTELLIGENCE
    # --------------------------------------------------------

    skill_intelligence = analyze_student_skills(
        db,
        student_id,
    )

    # --------------------------------------------------------
    # ACADEMIC SUMMARY
    # --------------------------------------------------------

    academic_records = data["academic_records"]

    if academic_records:

        scores = [
            float(record.score)
            for record in academic_records
            if record.score is not None
        ]

        if scores:
            academic_average = round(
                sum(scores) / len(scores),
                2,
            )
        else:
            academic_average = 0.0

    else:
        academic_average = 0.0

    # --------------------------------------------------------
    # PROJECT SUMMARY
    # --------------------------------------------------------

    project_count = len(
        data["projects"]
    )

    # --------------------------------------------------------
    # ACTIVITY SUMMARY
    # --------------------------------------------------------

    activity_count = len(
        data["activities"]
    )

    # --------------------------------------------------------
    # SKILL SUMMARY
    # --------------------------------------------------------

    skill_count = len(
        skill_intelligence
    )

    if skill_intelligence:

        skill_scores = [
            item["intelligence_score"]
            for item in skill_intelligence
        ]

        average_skill_score = round(
            sum(skill_scores)
            / len(skill_scores),
            2,
        )

    else:
        average_skill_score = 0.0

    # --------------------------------------------------------
    # STRENGTHS
    # --------------------------------------------------------

    strengths = [
        item
        for item in skill_intelligence
        if item["intelligence_score"] >= 70
    ]

    # --------------------------------------------------------
    # SKILL GAPS
    # --------------------------------------------------------

    skill_gaps = [
        item
        for item in skill_intelligence
        if item["intelligence_score"] < 50
    ]

    # --------------------------------------------------------
    # SNAPSHOT
    # --------------------------------------------------------

    return {
        "student_id": student_id,

        "student": data["student"],

        "profile": data["profile"],

        "academic": {
            "record_count": len(
                academic_records
            ),
            "average_score": academic_average,
        },

        "skills": {
            "skill_count": skill_count,
            "average_intelligence_score": (
                average_skill_score
            ),
            "strength_count": len(
                strengths
            ),
            "gap_count": len(
                skill_gaps
            ),
            "analysis": skill_intelligence,
        },

        "projects": {
            "project_count": project_count,
        },

        "activities": {
            "activity_count": activity_count,
        },

        "student_twin": student_twin,
    }