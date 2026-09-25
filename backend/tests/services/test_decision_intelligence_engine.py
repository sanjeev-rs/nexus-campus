from unittest.mock import Mock, patch

from app.services.decision_intelligence_engine import (
    calculate_priority,
    analyze_project_activity,
    analyze_opportunity_availability,
    analyze_failure_learning,
    analyze_skill_landscape,
    generate_decisions,
    calculate_decision_score,
    generate_decision_intelligence,
)


# =========================================================
# calculate_priority
# =========================================================

def test_calculate_priority_critical():
    assert calculate_priority(80) == "critical"
    assert calculate_priority(100) == "critical"


def test_calculate_priority_high():
    assert calculate_priority(60) == "high"
    assert calculate_priority(79.99) == "high"


def test_calculate_priority_medium():
    assert calculate_priority(40) == "medium"
    assert calculate_priority(59.99) == "medium"


def test_calculate_priority_low():
    assert calculate_priority(39.99) == "low"
    assert calculate_priority(0) == "low"


# =========================================================
# analyze_project_activity
# =========================================================

def test_analyze_project_activity_no_students():
    metrics = {
        "student_count": 0,
        "project_count": 0,
    }

    result = analyze_project_activity(metrics)

    assert result["area"] == "Project Activity"
    assert result["status"] == "insufficient-data"
    assert result["priority"] == "low"
    assert result["score"] == 0.0


def test_analyze_project_activity_very_low():
    metrics = {
        "student_count": 100,
        "project_count": 10,
    }

    result = analyze_project_activity(metrics)

    assert result["status"] == "low"
    assert result["score"] == 90.0
    assert result["priority"] == "critical"


def test_analyze_project_activity_developing():
    metrics = {
        "student_count": 100,
        "project_count": 30,
    }

    result = analyze_project_activity(metrics)

    assert result["status"] == "developing"
    assert result["score"] == 70.0
    assert result["priority"] == "high"


def test_analyze_project_activity_moderate():
    metrics = {
        "student_count": 100,
        "project_count": 70,
    }

    result = analyze_project_activity(metrics)

    assert result["status"] == "moderate"
    assert result["score"] == 45.0
    assert result["priority"] == "medium"


def test_analyze_project_activity_strong():
    metrics = {
        "student_count": 100,
        "project_count": 100,
    }

    result = analyze_project_activity(metrics)

    assert result["status"] == "strong"
    assert result["score"] == 20.0
    assert result["priority"] == "low"


# =========================================================
# analyze_opportunity_availability
# =========================================================

def test_analyze_opportunity_availability_no_students():
    metrics = {
        "student_count": 0,
        "active_opportunity_count": 0,
    }

    result = analyze_opportunity_availability(metrics)

    assert result["status"] == "insufficient-data"
    assert result["priority"] == "low"
    assert result["score"] == 0.0


def test_analyze_opportunity_availability_none():
    metrics = {
        "student_count": 100,
        "active_opportunity_count": 0,
    }

    result = analyze_opportunity_availability(metrics)

    assert result["status"] == "critical"
    assert result["score"] == 95.0
    assert result["priority"] == "critical"


def test_analyze_opportunity_availability_low():
    metrics = {
        "student_count": 100,
        "active_opportunity_count": 2,
    }

    result = analyze_opportunity_availability(metrics)

    assert result["status"] == "low"
    assert result["score"] == 80.0
    assert result["priority"] == "critical"


def test_analyze_opportunity_availability_developing():
    metrics = {
        "student_count": 100,
        "active_opportunity_count": 10,
    }

    result = analyze_opportunity_availability(metrics)

    assert result["status"] == "developing"
    assert result["score"] == 55.0
    assert result["priority"] == "medium"


def test_analyze_opportunity_availability_strong():
    metrics = {
        "student_count": 100,
        "active_opportunity_count": 20,
    }

    result = analyze_opportunity_availability(metrics)

    assert result["status"] == "strong"
    assert result["score"] == 25.0
    assert result["priority"] == "low"


# =========================================================
# analyze_failure_learning
# =========================================================

def test_analyze_failure_learning_no_projects():
    metrics = {
        "project_count": 0,
        "failure_count": 0,
    }

    result = analyze_failure_learning(metrics)

    assert result["status"] == "insufficient-data"
    assert result["priority"] == "low"
    assert result["score"] == 0.0


def test_analyze_failure_learning_missing():
    metrics = {
        "project_count": 100,
        "failure_count": 0,
    }

    result = analyze_failure_learning(metrics)

    assert result["status"] == "missing"
    assert result["score"] == 65.0
    assert result["priority"] == "high"


def test_analyze_failure_learning_healthy():
    metrics = {
        "project_count": 100,
        "failure_count": 5,
    }

    result = analyze_failure_learning(metrics)

    assert result["status"] == "healthy"
    assert result["score"] == 30.0
    assert result["priority"] == "low"


def test_analyze_failure_learning_active():
    metrics = {
        "project_count": 100,
        "failure_count": 20,
    }

    result = analyze_failure_learning(metrics)

    assert result["status"] == "active-learning"
    assert result["score"] == 50.0
    assert result["priority"] == "medium"


# =========================================================
# analyze_skill_landscape
# =========================================================

def test_analyze_skill_landscape_missing():
    metrics = {
        "skill_count": 0,
    }

    result = analyze_skill_landscape(metrics)

    assert result["status"] == "missing"
    assert result["score"] == 90.0
    assert result["priority"] == "critical"


def test_analyze_skill_landscape_developing():
    metrics = {
        "skill_count": 5,
    }

    result = analyze_skill_landscape(metrics)

    assert result["status"] == "developing"
    assert result["score"] == 65.0
    assert result["priority"] == "high"


def test_analyze_skill_landscape_strong():
    metrics = {
        "skill_count": 10,
    }

    result = analyze_skill_landscape(metrics)

    assert result["status"] == "strong"
    assert result["score"] == 20.0
    assert result["priority"] == "low"


# =========================================================
# generate_decisions
# =========================================================

def test_generate_decisions():
    metrics = {
        "student_count": 100,
        "project_count": 20,
        "active_opportunity_count": 2,
        "failure_count": 5,
        "skill_count": 5,
    }

    decisions = generate_decisions(metrics)

    assert len(decisions) == 4

    assert all("area" in decision for decision in decisions)
    assert all("status" in decision for decision in decisions)
    assert all("priority" in decision for decision in decisions)
    assert all("score" in decision for decision in decisions)
    assert all("finding" in decision for decision in decisions)
    assert all("recommendation" in decision for decision in decisions)

    scores = [decision["score"] for decision in decisions]

    assert scores == sorted(scores, reverse=True)


# =========================================================
# calculate_decision_score
# =========================================================

def test_calculate_decision_score_empty():
    assert calculate_decision_score([]) == 0.0


def test_calculate_decision_score():
    decisions = [
        {"score": 80.0},
        {"score": 60.0},
        {"score": 40.0},
        {"score": 20.0},
    ]

    assert calculate_decision_score(decisions) == 50.0


def test_calculate_decision_score_capped():
    decisions = [
        {"score": 120.0},
        {"score": 100.0},
    ]

    assert calculate_decision_score(decisions) == 100.0


# =========================================================
# generate_decision_intelligence
# =========================================================

@patch(
    "app.services.decision_intelligence_engine.calculate_campus_metrics"
)
@patch(
    "app.services.decision_intelligence_engine.calculate_campus_activity_score"
)
def test_generate_decision_intelligence(
    mock_activity_score,
    mock_metrics,
):
    metrics = {
        "student_count": 100,
        "project_count": 50,
        "opportunity_count": 10,
        "active_opportunity_count": 10,
        "failure_count": 5,
        "skill_count": 20,
    }

    mock_metrics.return_value = metrics
    mock_activity_score.return_value = 75.0

    db = Mock()

    result = generate_decision_intelligence(db)

    assert result["campus_metrics"] == metrics
    assert result["campus_activity_score"] == 75.0
    assert "decision_score" in result
    assert result["decision_count"] == 4
    assert len(result["decisions"]) == 4

    mock_metrics.assert_called_once_with(db)

    mock_activity_score.assert_called_once_with(
        student_count=100,
        project_count=50,
        opportunity_count=10,
        failure_count=5,
    )