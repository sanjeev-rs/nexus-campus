from types import SimpleNamespace
from unittest.mock import Mock, patch

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


# =========================================================
# HELPERS
# =========================================================

def mock_user(role: str):
    return SimpleNamespace(role=role)


def empty_graph_intelligence():
    return {
        "graph": {
            "node_count": 0,
            "relationship_count": 0,
            "nodes": [],
            "relationships": [],
        },
        "analysis": {
            "node_count": 0,
            "relationship_count": 0,
            "node_types": {},
            "relationship_types": {},
            "density_score": 0.0,
            "connectivity_score": 0.0,
            "insights": [],
        },
    }


# =========================================================
# ACCESS CONTROL
# =========================================================

@patch(
    "app.api.knowledge_graph.get_current_nexus_user"
)
def test_knowledge_graph_requires_auth(
    mock_dependency,
):
    mock_dependency.side_effect = Exception(
        "Authentication required"
    )

    # This test only verifies that the endpoint has
    # an authentication dependency configured.
    from app.api.knowledge_graph import router

    routes = [
        route
        for route in router.routes
        if getattr(route, "path", None) == "/"
    ]

    assert len(routes) == 1

    endpoint = routes[0]

    dependency_names = {
        dependency.call.__name__
        for dependency in endpoint.dependant.dependencies
    }

    assert "get_current_nexus_user" in dependency_names


# =========================================================
# ROLE ACCESS
# =========================================================

def test_knowledge_graph_student_forbidden():
    from app.api.knowledge_graph import (
        read_knowledge_graph,
    )

    db = Mock()

    user = mock_user("student")

    with patch(
        "app.api.knowledge_graph.READ_KNOWLEDGE_GRAPH",
        [],
    ):
        try:
            read_knowledge_graph(
                current_user=user,
                db=db,
            )
            assert False
        except Exception as exc:
            assert getattr(
                exc,
                "status_code",
                None,
            ) == 403


def test_knowledge_graph_allowed_role():
    from app.api.knowledge_graph import (
        read_knowledge_graph,
    )

    db = Mock()

    user = mock_user("faculty")

    intelligence = empty_graph_intelligence()

    with patch(
        "app.api.knowledge_graph.READ_KNOWLEDGE_GRAPH",
        [
            SimpleNamespace(value="faculty"),
        ],
    ):
        with patch(
            "app.api.knowledge_graph.generate_knowledge_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_knowledge_graph(
                current_user=user,
                db=db,
            )

    assert result == intelligence


# =========================================================
# GRAPH GENERATION
# =========================================================

def test_knowledge_graph_returns_intelligence():
    from app.api.knowledge_graph import (
        read_knowledge_graph,
    )

    db = Mock()

    user = mock_user("admin")

    intelligence = {
        "graph": {
            "node_count": 5,
            "relationship_count": 5,
            "nodes": [],
            "relationships": [],
        },
        "analysis": {
            "node_count": 5,
            "relationship_count": 5,
            "node_types": {
                "student": 1,
                "skill": 1,
                "project": 1,
                "opportunity": 1,
                "failure": 1,
            },
            "relationship_types": {
                "HAS_SKILL": 1,
                "WORKS_ON": 1,
                "USES_SKILL": 1,
                "REQUIRES_SKILL": 1,
                "HAS_FAILURE": 1,
            },
            "density_score": 20.0,
            "connectivity_score": 25.0,
            "insights": [
                "The knowledge graph contains connected campus entities and relationships."
            ],
        },
    }

    with patch(
        "app.api.knowledge_graph.READ_KNOWLEDGE_GRAPH",
        [
            SimpleNamespace(value="admin"),
        ],
    ):
        with patch(
            "app.api.knowledge_graph.generate_knowledge_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_knowledge_graph(
                current_user=user,
                db=db,
            )

    assert result["graph"]["node_count"] == 5
    assert (
        result["graph"]["relationship_count"]
        == 5
    )

    assert result["analysis"]["node_count"] == 5
    assert (
        result["analysis"]["relationship_count"]
        == 5
    )


def test_knowledge_graph_not_generated():
    from app.api.knowledge_graph import (
        read_knowledge_graph,
    )
    from fastapi import HTTPException

    db = Mock()

    user = mock_user("faculty")

    with patch(
        "app.api.knowledge_graph.READ_KNOWLEDGE_GRAPH",
        [
            SimpleNamespace(value="faculty"),
        ],
    ):
        with patch(
            "app.api.knowledge_graph.generate_knowledge_graph_intelligence",
            return_value=None,
        ):
            try:
                read_knowledge_graph(
                    current_user=user,
                    db=db,
                )
                assert False
            except HTTPException as exc:
                assert exc.status_code == 404
                assert (
                    "could not be generated"
                    in exc.detail
                )


# =========================================================
# ALL ALLOWED ROLES
# =========================================================

def test_faculty_can_access():
    from app.api.knowledge_graph import (
        read_knowledge_graph,
    )

    db = Mock()
    user = mock_user("faculty")

    intelligence = empty_graph_intelligence()

    with patch(
        "app.api.knowledge_graph.READ_KNOWLEDGE_GRAPH",
        [
            SimpleNamespace(value="faculty"),
        ],
    ):
        with patch(
            "app.api.knowledge_graph.generate_knowledge_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_knowledge_graph(
                current_user=user,
                db=db,
            )

    assert result == intelligence


def test_hod_can_access():
    from app.api.knowledge_graph import (
        read_knowledge_graph,
    )

    db = Mock()
    user = mock_user("hod")

    intelligence = empty_graph_intelligence()

    with patch(
        "app.api.knowledge_graph.READ_KNOWLEDGE_GRAPH",
        [
            SimpleNamespace(value="hod"),
        ],
    ):
        with patch(
            "app.api.knowledge_graph.generate_knowledge_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_knowledge_graph(
                current_user=user,
                db=db,
            )

    assert result == intelligence


def test_management_can_access():
    from app.api.knowledge_graph import (
        read_knowledge_graph,
    )

    db = Mock()
    user = mock_user("management")

    intelligence = empty_graph_intelligence()

    with patch(
        "app.api.knowledge_graph.READ_KNOWLEDGE_GRAPH",
        [
            SimpleNamespace(value="management"),
        ],
    ):
        with patch(
            "app.api.knowledge_graph.generate_knowledge_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_knowledge_graph(
                current_user=user,
                db=db,
            )

    assert result == intelligence


def test_admin_can_access():
    from app.api.knowledge_graph import (
        read_knowledge_graph,
    )

    db = Mock()
    user = mock_user("admin")

    intelligence = empty_graph_intelligence()

    with patch(
        "app.api.knowledge_graph.READ_KNOWLEDGE_GRAPH",
        [
            SimpleNamespace(value="admin"),
        ],
    ):
        with patch(
            "app.api.knowledge_graph.generate_knowledge_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_knowledge_graph(
                current_user=user,
                db=db,
            )

    assert result == intelligence


def test_super_admin_can_access():
    from app.api.knowledge_graph import (
        read_knowledge_graph,
    )

    db = Mock()
    user = mock_user("super_admin")

    intelligence = empty_graph_intelligence()

    with patch(
        "app.api.knowledge_graph.READ_KNOWLEDGE_GRAPH",
        [
            SimpleNamespace(value="super_admin"),
        ],
    ):
        with patch(
            "app.api.knowledge_graph.generate_knowledge_graph_intelligence",
            return_value=intelligence,
        ):
            result = read_knowledge_graph(
                current_user=user,
                db=db,
            )

    assert result == intelligence