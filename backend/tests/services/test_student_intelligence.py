from unittest.mock import Mock

from app.services import student_intelligence_service


# ============================================================
# GET STUDENT INTELLIGENCE TESTS
# ============================================================

def test_get_student_intelligence_returns_none_for_missing_student():
    """
    Verify that a non-existent student returns None.
    """

    db = Mock()

    student_query = Mock()
    student_query.filter.return_value.first.return_value = None

    db.query.return_value = student_query

    result = student_intelligence_service.get_student_intelligence(
        db=db,
        student_id=999,
    )

    assert result is None


def test_get_student_intelligence_returns_student_data():
    """
    Verify that the raw intelligence data contains the expected
    student, academic, skill, project, activity and profile data.
    """

    db = Mock()

    student = Mock()
    student.id = 1

    academic_records = [
        Mock(),
        Mock(),
    ]

    skills = [
        Mock(),
    ]

    projects = [
        Mock(),
        Mock(),
        Mock(),
    ]

    activities = [
        Mock(),
        Mock(),
    ]

    profile = Mock()

    # --------------------------------------------------------
    # Create mocked database queries.
    #
    # Query order must match get_student_intelligence():
    #
    # 1. Student
    # 2. Academic records
    # 3. Skills
    # 4. Projects
    # 5. Activities
    # 6. Profile
    # --------------------------------------------------------

    student_query = Mock()
    student_query.filter.return_value.first.return_value = student

    academic_query = Mock()
    academic_query.filter.return_value.all.return_value = (
        academic_records
    )

    skills_query = Mock()
    skills_query.filter.return_value.all.return_value = skills

    projects_query = Mock()
    projects_query.filter.return_value.all.return_value = projects

    activities_query = Mock()
    activities_query.filter.return_value.all.return_value = activities

    profile_query = Mock()
    profile_query.filter.return_value.first.return_value = profile

    db.query.side_effect = [
        student_query,
        academic_query,
        skills_query,
        projects_query,
        activities_query,
        profile_query,
    ]

    result = student_intelligence_service.get_student_intelligence(
        db=db,
        student_id=1,
    )

    assert result is not None

    assert result["student"] is student
    assert result["academic_records"] == academic_records
    assert result["skills"] == skills
    assert result["projects"] == projects
    assert result["activities"] == activities
    assert result["profile"] is profile


# ============================================================
# STUDENT INTELLIGENCE SNAPSHOT TESTS
# ============================================================

def test_generate_student_intelligence_snapshot_for_missing_student(
    monkeypatch,
):
    """
    Verify that snapshot generation returns None when the
    student does not exist.
    """

    monkeypatch.setattr(
        student_intelligence_service,
        "get_student_intelligence",
        Mock(return_value=None),
    )

    result = (
        student_intelligence_service
        .generate_student_intelligence_snapshot(
            db=Mock(),
            student_id=999,
        )
    )

    assert result is None


def test_generate_student_intelligence_snapshot(monkeypatch):
    """
    Verify the complete deterministic student intelligence
    snapshot structure.
    """

    student = Mock()
    student.id = 42

    # --------------------------------------------------------
    # Academic records
    # --------------------------------------------------------

    academic_record_1 = Mock()
    academic_record_1.score = 80

    academic_record_2 = Mock()
    academic_record_2.score = 90

    academic_record_3 = Mock()
    academic_record_3.score = None

    # --------------------------------------------------------
    # Skill intelligence
    # --------------------------------------------------------

    skill_intelligence = [
        {
            "intelligence_score": 85,
            "skill": "Python",
        },
        {
            "intelligence_score": 65,
            "skill": "SQL",
        },
        {
            "intelligence_score": 40,
            "skill": "Docker",
        },
    ]

    # --------------------------------------------------------
    # Mock raw student intelligence data
    # --------------------------------------------------------

    mock_data = {
        "student": student,
        "academic_records": [
            academic_record_1,
            academic_record_2,
            academic_record_3,
        ],
        "skills": [
            Mock(),
            Mock(),
            Mock(),
        ],
        "projects": [
            Mock(),
            Mock(),
        ],
        "activities": [
            Mock(),
            Mock(),
            Mock(),
            Mock(),
        ],
        "profile": Mock(),
    }

    # --------------------------------------------------------
    # Mock Student Twin
    # --------------------------------------------------------

    mock_twin = {
        "student_id": 42,
        "overall_score": 78,
    }

    # --------------------------------------------------------
    # Replace dependent services with mocks
    # --------------------------------------------------------

    monkeypatch.setattr(
        student_intelligence_service,
        "get_student_intelligence",
        Mock(return_value=mock_data),
    )

    monkeypatch.setattr(
        student_intelligence_service,
        "get_student_twin",
        Mock(return_value=mock_twin),
    )

    monkeypatch.setattr(
        student_intelligence_service,
        "analyze_student_skills",
        Mock(return_value=skill_intelligence),
    )

    # --------------------------------------------------------
    # Generate snapshot
    # --------------------------------------------------------

    result = (
        student_intelligence_service
        .generate_student_intelligence_snapshot(
            db=Mock(),
            student_id=42,
        )
    )

    # --------------------------------------------------------
    # Basic result
    # --------------------------------------------------------

    assert result is not None

    # --------------------------------------------------------
    # Student
    # --------------------------------------------------------

    assert result["student_id"] == 42
    assert result["student"] is student

    # --------------------------------------------------------
    # Profile
    # --------------------------------------------------------

    assert result["profile"] is mock_data["profile"]

    # --------------------------------------------------------
    # Academic
    #
    # Scores:
    # 80 + 90
    # ---------------- = 85
    #       2
    #
    # None score is ignored.
    # --------------------------------------------------------

    assert result["academic"]["record_count"] == 3
    assert result["academic"]["average_score"] == 85.0

    # --------------------------------------------------------
    # Skills
    #
    # Scores:
    # 85, 65, 40
    #
    # Average = 190 / 3 = 63.33
    #
    # Strengths >= 70:
    # 85 -> 1
    #
    # Gaps < 50:
    # 40 -> 1
    # --------------------------------------------------------

    assert result["skills"]["skill_count"] == 3

    assert (
        result["skills"]["average_intelligence_score"]
        == 63.33
    )

    assert result["skills"]["strength_count"] == 1
    assert result["skills"]["gap_count"] == 1

    assert (
        result["skills"]["analysis"]
        == skill_intelligence
    )

    # --------------------------------------------------------
    # Projects
    # --------------------------------------------------------

    assert result["projects"]["project_count"] == 2

    # --------------------------------------------------------
    # Activities
    # --------------------------------------------------------

    assert result["activities"]["activity_count"] == 4

    # --------------------------------------------------------
    # Student Twin
    # --------------------------------------------------------

    assert result["student_twin"] == mock_twin