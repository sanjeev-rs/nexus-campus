from unittest.mock import Mock, patch

from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api.decision_intelligence import (
    router,
    get_current_nexus_user,
)


app = FastAPI()

app.include_router(
    router,
    prefix="/decision-intelligence",
)


def create_client(role: str):
    user = Mock()
    user.role = role

    app.dependency_overrides[
        get_current_nexus_user
    ] = lambda: user

    return TestClient(app)


def clear_overrides():
    app.dependency_overrides.clear()


# =========================================================
# ADMIN ACCESS
# =========================================================

def test_admin_can_access_decision_intelligence():

    client = create_client("admin")

    mock_result = {
        "campus_metrics": {},
        "campus_activity_score": 75.0,
        "decision_score": 50.0,
        "decision_count": 4,
        "decisions": [],
    }

    with patch(
        "app.api.decision_intelligence.generate_decision_intelligence"
    ) as mock_generate:

        mock_generate.return_value = mock_result

        response = client.get(
            "/decision-intelligence/"
        )

    clear_overrides()

    assert response.status_code == 200
    assert response.json() == mock_result


# =========================================================
# HOD ACCESS
# =========================================================

def test_hod_can_access_decision_intelligence():

    client = create_client("hod")

    with patch(
        "app.api.decision_intelligence.generate_decision_intelligence"
    ) as mock_generate:

        mock_generate.return_value = {
            "campus_metrics": {},
            "campus_activity_score": 80.0,
            "decision_score": 60.0,
            "decision_count": 4,
            "decisions": [],
        }

        response = client.get(
            "/decision-intelligence/"
        )

    clear_overrides()

    assert response.status_code == 200


# =========================================================
# MANAGEMENT ACCESS
# =========================================================

def test_management_can_access_decision_intelligence():

    client = create_client("management")

    with patch(
        "app.api.decision_intelligence.generate_decision_intelligence"
    ) as mock_generate:

        mock_generate.return_value = {
            "campus_metrics": {},
            "campus_activity_score": 85.0,
            "decision_score": 55.0,
            "decision_count": 4,
            "decisions": [],
        }

        response = client.get(
            "/decision-intelligence/"
        )

    clear_overrides()

    assert response.status_code == 200


# =========================================================
# SUPER ADMIN ACCESS
# =========================================================

def test_super_admin_can_access_decision_intelligence():

    client = create_client("super_admin")

    with patch(
        "app.api.decision_intelligence.generate_decision_intelligence"
    ) as mock_generate:

        mock_generate.return_value = {
            "campus_metrics": {},
            "campus_activity_score": 90.0,
            "decision_score": 70.0,
            "decision_count": 4,
            "decisions": [],
        }

        response = client.get(
            "/decision-intelligence/"
        )

    clear_overrides()

    assert response.status_code == 200


# =========================================================
# STUDENT ACCESS DENIED
# =========================================================

def test_student_cannot_access_decision_intelligence():

    client = create_client("student")

    response = client.get(
        "/decision-intelligence/"
    )

    clear_overrides()

    assert response.status_code == 403

    assert (
        response.json()["detail"]
        == "You do not have permission "
        "to access decision intelligence"
    )


# =========================================================
# FACULTY ACCESS DENIED
# =========================================================

def test_faculty_cannot_access_decision_intelligence():

    client = create_client("faculty")

    response = client.get(
        "/decision-intelligence/"
    )

    clear_overrides()

    assert response.status_code == 403


# =========================================================
# ENGINE RETURNS NONE
# =========================================================

def test_decision_intelligence_returns_404_when_generation_fails():

    client = create_client("admin")

    with patch(
        "app.api.decision_intelligence.generate_decision_intelligence"
    ) as mock_generate:

        mock_generate.return_value = None

        response = client.get(
            "/decision-intelligence/"
        )

    clear_overrides()

    assert response.status_code == 404

    assert (
        response.json()["detail"]
        == "Decision intelligence "
        "could not be generated"
    )


# =========================================================
# RESPONSE STRUCTURE
# =========================================================

def test_decision_intelligence_response_structure():

    client = create_client("admin")

    mock_result = {
        "campus_metrics": {
            "student_count": 100,
            "project_count": 50,
        },
        "campus_activity_score": 72.5,
        "decision_score": 45.0,
        "decision_count": 4,
        "decisions": [],
    }

    with patch(
        "app.api.decision_intelligence.generate_decision_intelligence"
    ) as mock_generate:

        mock_generate.return_value = mock_result

        response = client.get(
            "/decision-intelligence/"
        )

    clear_overrides()

    assert response.status_code == 200

    data = response.json()

    assert "campus_metrics" in data
    assert "campus_activity_score" in data
    assert "decision_score" in data
    assert "decision_count" in data
    assert "decisions" in data


# =========================================================
# ENGINE INVOCATION
# =========================================================

def test_decision_intelligence_calls_engine():

    client = create_client("admin")

    with patch(
        "app.api.decision_intelligence.generate_decision_intelligence"
    ) as mock_generate:

        mock_generate.return_value = {
            "campus_metrics": {},
            "campus_activity_score": 70.0,
            "decision_score": 40.0,
            "decision_count": 4,
            "decisions": [],
        }

        response = client.get(
            "/decision-intelligence/"
        )

    clear_overrides()

    assert response.status_code == 200
    mock_generate.assert_called_once()