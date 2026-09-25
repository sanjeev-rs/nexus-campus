from sqlalchemy.orm import Session

from app.models.student_twin import StudentTwin
from app.models.academic_record import AcademicRecord
from app.models.student_skill import StudentSkill
from app.models.project_member import ProjectMember
from app.models.student_activity import StudentActivity


# ============================================================
# ACADEMIC SCORE
# ============================================================

def calculate_academic_score(
    db: Session,
    student_id: int,
) -> float:

    records = (
        db.query(AcademicRecord)
        .filter(
            AcademicRecord.student_id == student_id
        )
        .all()
    )

    if not records:
        return 0.0

    scores = [
        record.score
        for record in records
        if record.score is not None
    ]

    if not scores:
        return 0.0

    return round(
        sum(scores) / len(scores),
        2,
    )


# ============================================================
# SKILL SCORE
# ============================================================

def calculate_skill_score(
    db: Session,
    student_id: int,
) -> float:

    skills = (
        db.query(StudentSkill)
        .filter(
            StudentSkill.student_id == student_id
        )
        .all()
    )

    if not skills:
        return 0.0

    # StudentSkill.proficiency_level is stored
    # on a 0–5 scale.
    proficiency_values = [
        skill.proficiency_level
        for skill in skills
        if skill.proficiency_level is not None
    ]

    if not proficiency_values:
        return 0.0

    # Convert the 0–5 proficiency scale
    # into the 0–100 Student Twin score scale.
    average_proficiency = (
        sum(proficiency_values)
        / len(proficiency_values)
    )

    skill_score = (
        average_proficiency / 5.0
    ) * 100.0

    return round(
        skill_score,
        2,
    )


# ============================================================
# PROJECT SCORE
# ============================================================

def calculate_project_score(
    db: Session,
    student_id: int,
) -> float:

    projects = (
        db.query(ProjectMember)
        .filter(
            ProjectMember.student_id == student_id
        )
        .all()
    )

    if not projects:
        return 0.0

    project_count = len(projects)

    # Initial NEXUS scoring rule:
    # 1 project = 20 points
    # 2 projects = 40 points
    # ...
    # Maximum = 100
    return min(
        round(project_count * 20, 2),
        100.0,
    )


# ============================================================
# ENGAGEMENT SCORE
# ============================================================

def calculate_engagement_score(
    db: Session,
    student_id: int,
) -> float:

    activities = (
        db.query(StudentActivity)
        .filter(
            StudentActivity.student_id == student_id
        )
        .all()
    )

    if not activities:
        return 0.0

    activity_count = len(activities)

    # Initial NEXUS scoring rule:
    # 1 activity = 10 points
    # Maximum = 100
    return min(
        round(activity_count * 10, 2),
        100.0,
    )


# ============================================================
# CAREER READINESS SCORE
# ============================================================

def calculate_career_readiness_score(
    academic_score: float,
    skill_score: float,
    project_score: float,
    engagement_score: float,
) -> float:

    career_readiness = (
        academic_score * 0.20
        + skill_score * 0.35
        + project_score * 0.30
        + engagement_score * 0.15
    )

    return round(
        career_readiness,
        2,
    )


# ============================================================
# OVERALL SCORE
# ============================================================

def calculate_overall_score(
    academic_score: float,
    skill_score: float,
    project_score: float,
    engagement_score: float,
) -> float:

    overall = (
        academic_score * 0.30
        + skill_score * 0.30
        + project_score * 0.20
        + engagement_score * 0.20
    )

    return round(
        overall,
        2,
    )


# ============================================================
# STRENGTH DETECTION
# ============================================================

def detect_strengths(
    academic_score: float,
    skill_score: float,
    project_score: float,
    engagement_score: float,
) -> str:

    scores = {
        "Academic Performance": academic_score,
        "Technical Skills": skill_score,
        "Project Experience": project_score,
        "Student Engagement": engagement_score,
    }

    strengths = [
        name
        for name, score in scores.items()
        if score >= 70
    ]

    if not strengths:
        return "No strong areas identified yet"

    return ", ".join(strengths)


# ============================================================
# SKILL GAP DETECTION
# ============================================================

def detect_skill_gaps(
    academic_score: float,
    skill_score: float,
    project_score: float,
    engagement_score: float,
) -> str:

    scores = {
        "Academic Performance": academic_score,
        "Technical Skills": skill_score,
        "Project Experience": project_score,
        "Student Engagement": engagement_score,
    }

    gaps = [
        name
        for name, score in scores.items()
        if score < 50
    ]

    if not gaps:
        return "No major gaps identified"

    return ", ".join(gaps)


# ============================================================
# RECOMMENDED FOCUS
# ============================================================

def generate_recommended_focus(
    academic_score: float,
    skill_score: float,
    project_score: float,
    engagement_score: float,
) -> str:

    scores = {
        "Academic Performance": academic_score,
        "Technical Skills": skill_score,
        "Project Experience": project_score,
        "Student Engagement": engagement_score,
    }

    lowest_area = min(
        scores,
        key=scores.get,
    )

    recommendations = {
        "Academic Performance":
            "Focus on improving academic performance and strengthening weak subjects.",

        "Technical Skills":
            "Focus on developing technical skills through structured learning and practical exercises.",

        "Project Experience":
            "Focus on building more real-world projects and documenting project outcomes.",

        "Student Engagement":
            "Focus on participating in hackathons, workshops, clubs, internships, and other campus activities.",
    }

    return recommendations[lowest_area]


# ============================================================
# GENERATE COMPLETE STUDENT TWIN
# ============================================================

def generate_student_twin(
    db: Session,
    student_id: int,
) -> StudentTwin:

    # --------------------------------------------------------
    # Calculate core dimensions
    # --------------------------------------------------------

    academic_score = calculate_academic_score(
        db,
        student_id,
    )

    skill_score = calculate_skill_score(
        db,
        student_id,
    )

    project_score = calculate_project_score(
        db,
        student_id,
    )

    engagement_score = calculate_engagement_score(
        db,
        student_id,
    )

    # --------------------------------------------------------
    # Calculate intelligence metrics
    # --------------------------------------------------------

    overall_score = calculate_overall_score(
        academic_score,
        skill_score,
        project_score,
        engagement_score,
    )

    career_readiness_score = calculate_career_readiness_score(
        academic_score,
        skill_score,
        project_score,
        engagement_score,
    )

    strengths = detect_strengths(
        academic_score,
        skill_score,
        project_score,
        engagement_score,
    )

    skill_gaps = detect_skill_gaps(
        academic_score,
        skill_score,
        project_score,
        engagement_score,
    )

    recommended_focus = generate_recommended_focus(
        academic_score,
        skill_score,
        project_score,
        engagement_score,
    )

    # --------------------------------------------------------
    # Find existing Student Twin
    # --------------------------------------------------------

    twin = (
        db.query(StudentTwin)
        .filter(
            StudentTwin.student_id == student_id
        )
        .first()
    )

    # --------------------------------------------------------
    # Create if it does not exist
    # --------------------------------------------------------

    if not twin:

        twin = StudentTwin(
            student_id=student_id,
        )

        db.add(twin)

    # --------------------------------------------------------
    # Update Student Twin
    # --------------------------------------------------------

    twin.overall_score = overall_score

    twin.academic_score = academic_score

    twin.skill_score = skill_score

    twin.project_score = project_score

    twin.engagement_score = engagement_score

    twin.career_readiness_score = career_readiness_score

    twin.strengths = strengths

    twin.skill_gaps = skill_gaps

    twin.recommended_focus = recommended_focus

    twin.profile_status = "generated"

    # --------------------------------------------------------
    # Save
    # --------------------------------------------------------

    db.commit()

    db.refresh(twin)

    return twin