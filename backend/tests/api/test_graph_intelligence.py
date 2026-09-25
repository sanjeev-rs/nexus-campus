from types import SimpleNamespace
from unittest.mock import Mock, patch

from fastapi import HTTPException

from app.api.graph_intelligence import (
    read_graph_intelligence,
)


# =========================================================
# HELPERS
# =========================================================

def mock_user(role: str):
    return SimpleNamespace(role=role)


def sample_graph_intelligence():
    return {
        "skill_network": [
            {
                "skill_id": 1,
                "skill_name": "Python",
                "student_count": 10,
                "project_count": 5,
                "opportunity_count": 3,
                "connection_score": 18,
            }
        ],
        "student_network": [
            {
                "student_id": 1,
                "skill_count": 4,
                "project_count": 2,
                "network_score": 14,
            }
        ],
        "project_network": [
            {
                "project_id": 1,
                "project_title": "NEXUS",
                "skill_count": 4,
                "member_count": 3,
                "failure_count": 1,
                "network_score": 15,
            }
        ],
        "opportunity_network": [
            {
                "opportunity_id": 1,
                "opportunity_title": "AI Internship",
                "organization": "Company A",
                "skill_count": 3,
                "status": "active",
                "network_score": 3,
            }
        ],
        "failure_network": [
            {
                "failure_type": "Deployment Failure",
                "count": 2,
                "projects": [1, 2],
            }
        ],
        "opportunity_skill_gaps": [
            {
                "opportunity_id": 1,
                "opportunity_title": "AI Internship",
                "skill_gap_count": 1,
                "required_skill_count": 3,
            }
        ],
    }


# =========================================================
# ACCESS CONTROL
# =========================================================

def test_graph_intelligence_student_forbidden():
    db = Mock()

    user = mock_user("student")

    with patch(
        "app.api.graph_intelligence.READ_GRAPH_INTELLIGENCE",
        [],
    ):
        try:
            read_graph_intelligence(
                current_user=user,
                db=db,
            )
            assert False
        except HTTPException as exc:
            assert exc.status_code == 403
            assert (
                "permission"
                in exc.detail.lower()
            )


def test_graph_intelligence_unauthorized_role_forbidden():
    db = Mock()

    user = mock_user("unknown")

    with patch(
        "app.api.graph_intelligence.READ_GRAPH_INTELLIGENCE",
        [
            SimpleNamespace(value="faculty"),
            SimpleNamespace(value="hod"),
            SimpleNamespace(value="management"),
            SimpleNamespace(value="admin"),
            SimpleNamespace(value="super_admin"),
        ],
    ):
        try:
            read_graph_intelligence(
                current_user=user,
                db=db,
            )
            assert False
        except HTTPException as exc:
            assert exc.status_code == 403


# =========================================================
# FACULTY ACCESS
# =========================================================

def test_graph_intelligence_faculty_access():
    db = Mock()

    user = mock_user("faculty")

    intelligence = sample_graph_intelligence()

    with patch(
        "app.api.graph_intelligence.READ_GRAPH_INTELLIGENCE",
        [
            SimpleNamespace(value="faculty"),
        ],
    ):
        with patch(
            "app.api.graph_intelligence.generate_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_graph_intelligence(
                current_user=user,
                db=db,
            )

    assert result == intelligence


# =========================================================
# HOD ACCESS
# =========================================================

def test_graph_intelligence_hod_access():
    db = Mock()

    user = mock_user("hod")

    intelligence = sample_graph_intelligence()

    with patch(
        "app.api.graph_intelligence.READ_GRAPH_INTELLIGENCE",
        [
            SimpleNamespace(value="hod"),
        ],
    ):
        with patch(
            "app.api.graph_intelligence.generate_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_graph_intelligence(
                current_user=user,
                db=db,
            )

    assert result == intelligence


# =========================================================
# MANAGEMENT ACCESS
# =========================================================

def test_graph_intelligence_management_access():
    db = Mock()

    user = mock_user("management")

    intelligence = sample_graph_intelligence()

    with patch(
        "app.api.graph_intelligence.READ_GRAPH_INTELLIGENCE",
        [
            SimpleNamespace(value="management"),
        ],
    ):
        with patch(
            "app.api.graph_intelligence.generate_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_graph_intelligence(
                current_user=user,
                db=db,
            )

    assert result == intelligence


# =========================================================
# ADMIN ACCESS
# =========================================================

def test_graph_intelligence_admin_access():
    db = Mock()

    user = mock_user("admin")

    intelligence = sample_graph_intelligence()

    with patch(
        "app.api.graph_intelligence.READ_GRAPH_INTELLIGENCE",
        [
            SimpleNamespace(value="admin"),
        ],
    ):
        with patch(
            "app.api.graph_intelligence.generate_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_graph_intelligence(
                current_user=user,
                db=db,
            )

    assert result == intelligence


# =========================================================
# SUPER ADMIN ACCESS
# =========================================================

def test_graph_intelligence_super_admin_access():
    db = Mock()

    user = mock_user("super_admin")

    intelligence = sample_graph_intelligence()

    with patch(
        "app.api.graph_intelligence.READ_GRAPH_INTELLIGENCE",
        [
            SimpleNamespace(value="super_admin"),
        ],
    ):
        with patch(
            "app.api.graph_intelligence.generate_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_graph_intelligence(
                current_user=user,
                db=db,
            )

    assert result == intelligence


# =========================================================
# INTELLIGENCE GENERATION
# =========================================================

def test_graph_intelligence_returns_complete_result():
    db = Mock()

    user = mock_user("faculty")

    intelligence = sample_graph_intelligence()

    with patch(
        "app.api.graph_intelligence.READ_GRAPH_INTELLIGENCE",
        [
            SimpleNamespace(value="faculty"),
        ],
    ):
        with patch(
            "app.api.graph_intelligence.generate_graph_intelligence",
            return_value=intelligence,
        ) as mock_generate:

            result = read_graph_intelligence(
                current_user=user,
                db=db,
            )

    mock_generate.assert_called_once_with(db)

    assert "skill_network" in result
    assert "student_network" in result
    assert "project_network" in result
    assert "opportunity_network" in result
    assert "failure_network" in result
    assert "opportunity_skill_gaps" in result


def test_graph_intelligence_empty_lists():
    db = Mock()

    user = mock_user("faculty")

    intelligence = {
        "skill_network": [],
        "student_network": [],
        "project_network": [],
        "opportunity_network": [],
        "failure_network": [],
        "opportunity_skill_gaps": [],
    }

    with patch(
        "app.api.graph_intelligence.READ_GRAPH_INTELLIGENCE",
        [
            SimpleNamespace(value="faculty"),
        ],
    ):
        with patch(
            "app.api.graph_intelligence.generate_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_graph_intelligence(
                current_user=user,
                db=db,
            )

    assert result == intelligence


# =========================================================
# GENERATION FAILURE
# =========================================================

def test_graph_intelligence_not_generated():
    db = Mock()

    user = mock_user("faculty")

    with patch(
        "app.api.graph_intelligence.READ_GRAPH_INTELLIGENCE",
        [
            SimpleNamespace(value="faculty"),
        ],
    ):
        with patch(
            "app.api.graph_intelligence.generate_graph_intelligence",
            return_value=None,
        ):
            try:
                read_graph_intelligence(
                    current_user=user,
                    db=db,
                )
                assert False
            except HTTPException as exc:
                assert exc.status_code == 404
                assert (
                    "could not be generated"
                    in exc.detail.lower()
                )