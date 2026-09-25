from unittest.mock import Mock

from app.services import skill_intelligence_engine


# ============================================================
# SKILL INTELLIGENCE SCORE TESTS
# ============================================================

def test_calculate_skill_intelligence_score_missing_skill():
    """
    A missing StudentSkill should return a score of 0.0.
    """

    db = Mock()

    student_skill_query = Mock()
    student_skill_query.filter.return_value.first.return_value = None

    db.query.return_value = student_skill_query

    result = (
        skill_intelligence_engine
        .calculate_skill_intelligence_score(
            db=db,
            student_skill_id=999,
        )
    )

    assert result == 0.0


def test_calculate_skill_intelligence_score_with_evidence():
    """
    Verify the score calculation when evidence exists.

    Proficiency = 80
    Evidence average = (70 + 90) / 2 = 80
    Verified = 100

    Final:
        80 * 0.50
      + 80 * 0.30
      + 100 * 0.20
      = 84
    """

    db = Mock()

    student_skill = Mock()
    student_skill.id = 1
    student_skill.proficiency_level = 80
    student_skill.verified = True

    evidence_1 = Mock()
    evidence_1.score = 70

    evidence_2 = Mock()
    evidence_2.score = 90

    student_skill_query = Mock()
    student_skill_query.filter.return_value.first.return_value = (
        student_skill
    )

    evidence_query = Mock()
    evidence_query.filter.return_value.all.return_value = [
        evidence_1,
        evidence_2,
    ]

    db.query.side_effect = [
        student_skill_query,
        evidence_query,
    ]

    result = (
        skill_intelligence_engine
        .calculate_skill_intelligence_score(
            db=db,
            student_skill_id=1,
        )
    )

    assert result == 84.0


def test_calculate_skill_intelligence_score_without_evidence():
    """
    Verify the score calculation when no evidence exists.

    Proficiency = 80
    Verified = True

    Final:
        80 * 0.80
      + 100 * 0.20
      = 84
    """

    db = Mock()

    student_skill = Mock()
    student_skill.id = 2
    student_skill.proficiency_level = 80
    student_skill.verified = True

    student_skill_query = Mock()
    student_skill_query.filter.return_value.first.return_value = (
        student_skill
    )

    evidence_query = Mock()
    evidence_query.filter.return_value.all.return_value = []

    db.query.side_effect = [
        student_skill_query,
        evidence_query,
    ]

    result = (
        skill_intelligence_engine
        .calculate_skill_intelligence_score(
            db=db,
            student_skill_id=2,
        )
    )

    assert result == 84.0


def test_calculate_skill_intelligence_score_caps_at_100():
    """
    Verify that the final intelligence score cannot exceed 100.
    """

    db = Mock()

    student_skill = Mock()
    student_skill.id = 3
    student_skill.proficiency_level = 100
    student_skill.verified = True

    evidence = Mock()
    evidence.score = 100

    student_skill_query = Mock()
    student_skill_query.filter.return_value.first.return_value = (
        student_skill
    )

    evidence_query = Mock()
    evidence_query.filter.return_value.all.return_value = [
        evidence
    ]

    db.query.side_effect = [
        student_skill_query,
        evidence_query,
    ]

    result = (
        skill_intelligence_engine
        .calculate_skill_intelligence_score(
            db=db,
            student_skill_id=3,
        )
    )

    assert result == 100.0


# ============================================================
# SKILL CLASSIFICATION TESTS
# ============================================================

def test_classify_skill_level_boundaries():
    """
    Verify every defined skill classification boundary.
    """

    assert (
        skill_intelligence_engine.classify_skill_level(100)
        == "expert"
    )

    assert (
        skill_intelligence_engine.classify_skill_level(85)
        == "expert"
    )

    assert (
        skill_intelligence_engine.classify_skill_level(84.99)
        == "advanced"
    )

    assert (
        skill_intelligence_engine.classify_skill_level(70)
        == "advanced"
    )

    assert (
        skill_intelligence_engine.classify_skill_level(69.99)
        == "intermediate"
    )

    assert (
        skill_intelligence_engine.classify_skill_level(50)
        == "intermediate"
    )

    assert (
        skill_intelligence_engine.classify_skill_level(49.99)
        == "beginner"
    )

    assert (
        skill_intelligence_engine.classify_skill_level(30)
        == "beginner"
    )

    assert (
        skill_intelligence_engine.classify_skill_level(29.99)
        == "foundational"
    )

    assert (
        skill_intelligence_engine.classify_skill_level(0)
        == "foundational"
    )


# ============================================================
# ANALYZE STUDENT SKILLS TEST
# ============================================================

def test_analyze_student_skills():
    """
    Verify that every StudentSkill is analyzed and converted
    into the expected intelligence result.
    """

    db = Mock()

    student_skill_1 = Mock()
    student_skill_1.id = 10
    student_skill_1.skill_id = 101
    student_skill_1.verified = True
    student_skill_1.source = "academic"

    student_skill_2 = Mock()
    student_skill_2.id = 20
    student_skill_2.skill_id = 202
    student_skill_2.verified = False
    student_skill_2.source = "project"

    student_skills_query = Mock()

    student_skills_query.filter.return_value.all.return_value = [
        student_skill_1,
        student_skill_2,
    ]

    db.query.return_value = student_skills_query

    mock_score = Mock(
        side_effect=[
            90.0,
            60.0,
        ]
    )

    monkeypatch = Mock()

    original_score_function = (
        skill_intelligence_engine
        .calculate_skill_intelligence_score
    )

    try:
        skill_intelligence_engine.calculate_skill_intelligence_score = (
            mock_score
        )

        result = (
            skill_intelligence_engine
            .analyze_student_skills(
                db=db,
                student_id=1,
            )
        )

    finally:
        skill_intelligence_engine.calculate_skill_intelligence_score = (
            original_score_function
        )

    assert len(result) == 2

    assert result[0] == {
        "student_skill_id": 10,
        "skill_id": 101,
        "intelligence_score": 90.0,
        "level": "expert",
        "verified": True,
        "source": "academic",
    }

    assert result[1] == {
        "student_skill_id": 20,
        "skill_id": 202,
        "intelligence_score": 60.0,
        "level": "intermediate",
        "verified": False,
        "source": "project",
    }

    assert mock_score.call_count == 2


# ============================================================
# STUDENT SKILL SUMMARY TESTS
# ============================================================

def test_get_student_skill_summary_with_no_skills(monkeypatch):
    """
    Verify the empty summary returned when a student has
    no analyzed skills.
    """

    monkeypatch.setattr(
        skill_intelligence_engine,
        "analyze_student_skills",
        Mock(return_value=[]),
    )

    result = (
        skill_intelligence_engine
        .get_student_skill_summary(
            db=Mock(),
            student_id=50,
        )
    )

    assert result == {
        "student_id": 50,
        "skill_count": 0,
        "average_score": 0.0,
        "expert_skills": 0,
        "advanced_skills": 0,
        "intermediate_skills": 0,
        "beginner_skills": 0,
        "foundational_skills": 0,
    }


def test_get_student_skill_summary():
    """
    Verify the aggregated skill summary.
    """

    analysis = [
        {
            "student_skill_id": 1,
            "skill_id": 101,
            "intelligence_score": 90.0,
            "level": "expert",
            "verified": True,
            "source": "academic",
        },
        {
            "student_skill_id": 2,
            "skill_id": 102,
            "intelligence_score": 75.0,
            "level": "advanced",
            "verified": True,
            "source": "project",
        },
        {
            "student_skill_id": 3,
            "skill_id": 103,
            "intelligence_score": 60.0,
            "level": "intermediate",
            "verified": False,
            "source": "self",
        },
        {
            "student_skill_id": 4,
            "skill_id": 104,
            "intelligence_score": 40.0,
            "level": "beginner",
            "verified": False,
            "source": "self",
        },
        {
            "student_skill_id": 5,
            "skill_id": 105,
            "intelligence_score": 20.0,
            "level": "foundational",
            "verified": False,
            "source": "self",
        },
    ]

    monkeypatch = Mock()

    original_function = (
        skill_intelligence_engine
        .analyze_student_skills
    )

    try:
        skill_intelligence_engine.analyze_student_skills = Mock(
            return_value=analysis
        )

        result = (
            skill_intelligence_engine
            .get_student_skill_summary(
                db=Mock(),
                student_id=75,
            )
        )

    finally:
        skill_intelligence_engine.analyze_student_skills = (
            original_function
        )

    assert result["student_id"] == 75
    assert result["skill_count"] == 5

    # (90 + 75 + 60 + 40 + 20) / 5 = 57
    assert result["average_score"] == 57.0

    assert result["expert_skills"] == 1
    assert result["advanced_skills"] == 1
    assert result["intermediate_skills"] == 1
    assert result["beginner_skills"] == 1
    assert result["foundational_skills"] == 1