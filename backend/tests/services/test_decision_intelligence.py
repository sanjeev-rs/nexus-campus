from types import SimpleNamespace
from unittest.mock import Mock

from app.services.decision_intelligence import (
    calculate_student_readiness,
    classify_readiness,
    generate_decision_recommendations,
    generate_decision_summary,
    analyze_student_decision,
    analyze_opportunity_fit,
)


# =========================================================
# calculate_student_readiness
# =========================================================

def test_calculate_student_readiness():
    result = calculate_student_readiness(
        academic_score=80,
        skill_score=70,
        project_score=60,
        engagement_score=50,
    )

    expected = (
        80 * 0.25
        + 70 * 0.35
        + 60 * 0.25
        + 50 * 0.15
    )

    assert result == round(expected, 2)


def test_calculate_student_readiness_zero():
    result = calculate_student_readiness(
        academic_score=0,
        skill_score=0,
        project_score=0,
        engagement_score=0,
    )

    assert result == 0.0


def test_calculate_student_readiness_maximum():
    result = calculate_student_readiness(
        academic_score=100,
        skill_score=100,
        project_score=100,
        engagement_score=100,
    )

    assert result == 100.0


def test_calculate_student_readiness_clamps_values():
    result = calculate_student_readiness(
        academic_score=120,
        skill_score=120,
        project_score=120,
        engagement_score=120,
    )

    assert result == 100.0


# =========================================================
# classify_readiness
# =========================================================

def test_classify_readiness_highly_ready():
    assert classify_readiness(85) == "highly-ready"
    assert classify_readiness(100) == "highly-ready"


def test_classify_readiness_ready():
    assert classify_readiness(70) == "ready"
    assert classify_readiness(84.99) == "ready"


def test_classify_readiness_developing():
    assert classify_readiness(50) == "developing"
    assert classify_readiness(69.99) == "developing"


def test_classify_readiness_needs_development():
    assert classify_readiness(30) == "needs-development"
    assert classify_readiness(49.99) == "needs-development"


def test_classify_readiness_early_stage():
    assert classify_readiness(0) == "early-stage"
    assert classify_readiness(29.99) == "early-stage"


# =========================================================
# generate_decision_recommendations
# =========================================================

def test_generate_decision_recommendations_all_gaps():
    recommendations = generate_decision_recommendations(
        academic_score=40,
        skill_score=40,
        project_score=40,
        engagement_score=40,
    )

    assert len(recommendations) == 4

    assert any(
        "academic performance" in recommendation
        for recommendation in recommendations
    )

    assert any(
        "technical or domain skills" in recommendation
        for recommendation in recommendations
    )

    assert any(
        "more projects" in recommendation
        for recommendation in recommendations
    )

    assert any(
        "campus activities" in recommendation
        for recommendation in recommendations
    )


def test_generate_decision_recommendations_balanced():
    recommendations = generate_decision_recommendations(
        academic_score=80,
        skill_score=80,
        project_score=80,
        engagement_score=80,
    )

    assert len(recommendations) == 1

    assert (
        "balanced development"
        in recommendations[0]
    )


def test_generate_decision_recommendations_partial_gaps():
    recommendations = generate_decision_recommendations(
        academic_score=40,
        skill_score=80,
        project_score=80,
        engagement_score=80,
    )

    assert len(recommendations) == 1

    assert (
        "academic performance"
        in recommendations[0]
    )


# =========================================================
# generate_decision_summary
# =========================================================

def test_generate_decision_summary():
    recommendations = [
        "Improve academic performance.",
        "Participate in more projects.",
    ]

    result = generate_decision_summary(
        readiness_score=72.5,
        readiness_level="ready",
        recommendations=recommendations,
    )

    assert result["readiness_score"] == 72.5
    assert result["readiness_level"] == "ready"
    assert result["recommendation_count"] == 2
    assert result["recommendations"] == recommendations


def test_generate_decision_summary_empty_recommendations():
    result = generate_decision_summary(
        readiness_score=50,
        readiness_level="developing",
        recommendations=[],
    )

    assert result["recommendation_count"] == 0
    assert result["recommendations"] == []


# =========================================================
# analyze_student_decision
# =========================================================

def test_analyze_student_decision_student_not_found():
    db = Mock()

    query = db.query.return_value
    query.filter.return_value.first.return_value = None

    result = analyze_student_decision(
        db,
        student_id=999,
    )

    assert result is None


def test_analyze_student_decision():
    db = Mock()

    student = SimpleNamespace(
        id=1,
        academic_average=80,
    )

    skills = [
        SimpleNamespace(
            student_id=1,
            proficiency_level=4,
        ),
        SimpleNamespace(
            student_id=1,
            proficiency_level=3,
        ),
    ]

    projects = [
        SimpleNamespace(student_id=1),
        SimpleNamespace(student_id=1),
    ]

    query_results = {
        "Student": student,
        "StudentSkill": skills,
        "ProjectMember": projects,
    }

    def query_side_effect(model):
        model_name = model.__name__

        query = Mock()

        query.filter.return_value.first.return_value = (
            query_results.get(model_name)
        )

        query.filter.return_value.all.return_value = (
            query_results.get(model_name, [])
        )

        return query

    db.query.side_effect = query_side_effect

    result = analyze_student_decision(
        db,
        student_id=1,
    )

    assert result is not None
    assert result["student_id"] == 1

    assert result["academic_score"] == 80.0

    # Average proficiency = 3.5
    # Converted to 0-100 = 70
    assert result["skill_score"] == 70.0

    # 2 projects × 20
    assert result["project_score"] == 40.0

    # 2 projects × 15
    assert result["engagement_score"] == 30.0

    assert result["project_count"] == 2

    assert "readiness_score" in result
    assert "readiness_level" in result
    assert "recommendations" in result
    assert "recommendation_count" in result


def test_analyze_student_decision_no_skills_or_projects():
    db = Mock()

    student = SimpleNamespace(
        id=1,
        academic_average=75,
    )

    query_results = {
        "Student": student,
        "StudentSkill": [],
        "ProjectMember": [],
    }

    def query_side_effect(model):
        model_name = model.__name__

        query = Mock()

        query.filter.return_value.first.return_value = (
            query_results.get(model_name)
        )

        query.filter.return_value.all.return_value = (
            query_results.get(model_name, [])
        )

        return query

    db.query.side_effect = query_side_effect

    result = analyze_student_decision(
        db,
        student_id=1,
    )

    assert result is not None
    assert result["academic_score"] == 75.0
    assert result["skill_score"] == 0.0
    assert result["project_score"] == 0.0
    assert result["engagement_score"] == 0.0
    assert result["project_count"] == 0


def test_analyze_student_decision_missing_academic_average():
    db = Mock()

    student = SimpleNamespace(
        id=1,
    )

    query_results = {
        "Student": student,
        "StudentSkill": [],
        "ProjectMember": [],
    }

    def query_side_effect(model):
        model_name = model.__name__

        query = Mock()

        query.filter.return_value.first.return_value = (
            query_results.get(model_name)
        )

        query.filter.return_value.all.return_value = (
            query_results.get(model_name, [])
        )

        return query

    db.query.side_effect = query_side_effect

    result = analyze_student_decision(
        db,
        student_id=1,
    )

    assert result is not None
    assert result["academic_score"] == 0.0


# =========================================================
# analyze_opportunity_fit
# =========================================================

def test_analyze_opportunity_fit_student_not_found():
    db = Mock()

    query = db.query.return_value
    query.filter.return_value.first.return_value = None

    result = analyze_opportunity_fit(
        db,
        student_id=999,
        opportunity_id=1,
    )

    assert result is None


def test_analyze_opportunity_fit_opportunity_not_found():
    db = Mock()

    student = SimpleNamespace(id=1)

    def query_side_effect(model):
        model_name = model.__name__

        current_query = Mock()

        if model_name == "Student":
            current_query.filter.return_value.first.return_value = student

        elif model_name == "Opportunity":
            current_query.filter.return_value.first.return_value = None

        return current_query

    db.query.side_effect = query_side_effect

    result = analyze_opportunity_fit(
        db,
        student_id=1,
        opportunity_id=999,
    )

    assert result is None


def test_analyze_opportunity_fit_without_required_skills():
    db = Mock()

    student = SimpleNamespace(id=1)

    opportunity = SimpleNamespace(
        id=10,
    )

    def query_side_effect(model):
        model_name = model.__name__

        current_query = Mock()

        if model_name == "Student":
            current_query.filter.return_value.first.return_value = student

        elif model_name == "Opportunity":
            current_query.filter.return_value.first.return_value = opportunity

        elif model_name == "StudentSkill":
            current_query.filter.return_value.all.return_value = []

        return current_query

    db.query.side_effect = query_side_effect

    result = analyze_opportunity_fit(
        db,
        student_id=1,
        opportunity_id=10,
    )

    assert result is not None
    assert result["student_id"] == 1
    assert result["opportunity_id"] == 10
    assert result["required_skill_count"] == 0
    assert result["matched_skill_count"] == 0
    assert result["skill_match_score"] == 0.0
    assert result["fit_level"] == "low-fit"


def test_analyze_opportunity_fit_with_matching_skills():
    db = Mock()

    student = SimpleNamespace(id=1)

    student_skills = [
        SimpleNamespace(
            student_id=1,
            skill_id=1,
        ),
        SimpleNamespace(
            student_id=1,
            skill_id=2,
        ),
    ]

    opportunity = SimpleNamespace(
        id=10,
        skills=[
            SimpleNamespace(id=1),
            SimpleNamespace(id=2),
            SimpleNamespace(id=3),
            SimpleNamespace(id=4),
        ],
    )

    def query_side_effect(model):
        model_name = model.__name__

        current_query = Mock()

        if model_name == "Student":
            current_query.filter.return_value.first.return_value = student

        elif model_name == "Opportunity":
            current_query.filter.return_value.first.return_value = opportunity

        elif model_name == "StudentSkill":
            current_query.filter.return_value.all.return_value = student_skills

        return current_query

    db.query.side_effect = query_side_effect

    result = analyze_opportunity_fit(
        db,
        student_id=1,
        opportunity_id=10,
    )

    assert result is not None
    assert result["required_skill_count"] == 4
    assert result["matched_skill_count"] == 2
    assert result["skill_match_score"] == 50.0
    assert result["fit_level"] == "partial-fit"


def test_analyze_opportunity_fit_strong_match():
    db = Mock()

    student = SimpleNamespace(id=1)

    student_skills = [
        SimpleNamespace(
            student_id=1,
            skill_id=1,
        ),
        SimpleNamespace(
            student_id=1,
            skill_id=2,
        ),
        SimpleNamespace(
            student_id=1,
            skill_id=3,
        ),
        SimpleNamespace(
            student_id=1,
            skill_id=4,
        ),
    ]

    opportunity = SimpleNamespace(
        id=10,
        skills=[
            SimpleNamespace(id=1),
            SimpleNamespace(id=2),
            SimpleNamespace(id=3),
            SimpleNamespace(id=4),
            SimpleNamespace(id=5),
        ],
    )

    def query_side_effect(model):
        model_name = model.__name__

        current_query = Mock()

        if model_name == "Student":
            current_query.filter.return_value.first.return_value = student

        elif model_name == "Opportunity":
            current_query.filter.return_value.first.return_value = opportunity

        elif model_name == "StudentSkill":
            current_query.filter.return_value.all.return_value = student_skills

        return current_query

    db.query.side_effect = query_side_effect

    result = analyze_opportunity_fit(
        db,
        student_id=1,
        opportunity_id=10,
    )

    assert result is not None
    assert result["required_skill_count"] == 5
    assert result["matched_skill_count"] == 4
    assert result["skill_match_score"] == 80.0
    assert result["fit_level"] == "strong-fit"