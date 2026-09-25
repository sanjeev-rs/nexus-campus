from unittest.mock import MagicMock, patch

from app.services.neo4j_sync_service import sync_knowledge_graph_to_neo4j


def sample_graph():
    return {
        "nodes": [
            {
                "id": "student:1",
                "type": "student",
                "label": "Student 1",
                "properties": {"student_id": 1},
            },
            {
                "id": "skill:1",
                "type": "skill",
                "label": "Python",
                "properties": {"skill_id": 1},
            },
        ],
        "relationships": [
            {
                "source": "student:1",
                "relationship": "HAS_SKILL",
                "target": "skill:1",
                "properties": {"proficiency_level": 4},
            }
        ],
    }


@patch("app.services.neo4j_sync_service.Neo4jRepository")
@patch("app.services.neo4j_sync_service.neo4j_connection")
@patch("app.services.neo4j_sync_service.build_knowledge_graph")
def test_sync_knowledge_graph_success(
    mock_build_graph,
    mock_connection,
    mock_repository,
):
    mock_db = MagicMock()

    mock_build_graph.return_value = sample_graph()

    mock_connection.driver = MagicMock()
    mock_connection.database = "neo4j"

    repository_instance = mock_repository.return_value

    repository_instance.get_graph_statistics.return_value = {
        "node_count": 2,
        "relationship_count": 1,
    }

    result = sync_knowledge_graph_to_neo4j(mock_db)

    assert result["status"] == "success"
    assert result["source_node_count"] == 2
    assert result["source_relationship_count"] == 1
    assert result["synced_node_count"] == 2
    assert result["synced_relationship_count"] == 1
    assert result["neo4j_node_count"] == 2
    assert result["neo4j_relationship_count"] == 1

    mock_connection.connect.assert_called_once()
    mock_connection.close.assert_called_once()

    assert repository_instance.create_node.call_count == 2
    assert repository_instance.create_relationship.call_count == 1
    repository_instance.get_graph_statistics.assert_called_once()


@patch("app.services.neo4j_sync_service.Neo4jRepository")
@patch("app.services.neo4j_sync_service.neo4j_connection")
@patch("app.services.neo4j_sync_service.build_knowledge_graph")
def test_sync_empty_graph(
    mock_build_graph,
    mock_connection,
    mock_repository,
):
    mock_db = MagicMock()

    mock_build_graph.return_value = {
        "nodes": [],
        "relationships": [],
    }

    mock_connection.driver = MagicMock()
    mock_connection.database = "neo4j"

    mock_repository.return_value.get_graph_statistics.return_value = {
        "node_count": 0,
        "relationship_count": 0,
    }

    result = sync_knowledge_graph_to_neo4j(mock_db)

    assert result["status"] == "success"
    assert result["source_node_count"] == 0
    assert result["source_relationship_count"] == 0
    assert result["synced_node_count"] == 0
    assert result["synced_relationship_count"] == 0
    assert result["neo4j_node_count"] == 0
    assert result["neo4j_relationship_count"] == 0


@patch("app.services.neo4j_sync_service.Neo4jRepository")
@patch("app.services.neo4j_sync_service.neo4j_connection")
@patch("app.services.neo4j_sync_service.build_knowledge_graph")
def test_sync_closes_connection_after_success(
    mock_build_graph,
    mock_connection,
    mock_repository,
):
    mock_db = MagicMock()

    mock_build_graph.return_value = sample_graph()

    mock_connection.driver = MagicMock()
    mock_connection.database = "neo4j"

    mock_repository.return_value.get_graph_statistics.return_value = {
        "node_count": 2,
        "relationship_count": 1,
    }

    sync_knowledge_graph_to_neo4j(mock_db)

    mock_connection.close.assert_called_once()


@patch("app.services.neo4j_sync_service.Neo4jRepository")
@patch("app.services.neo4j_sync_service.neo4j_connection")
@patch("app.services.neo4j_sync_service.build_knowledge_graph")
def test_sync_closes_connection_when_repository_fails(
    mock_build_graph,
    mock_connection,
    mock_repository,
):
    mock_db = MagicMock()

    mock_build_graph.return_value = sample_graph()

    mock_connection.driver = MagicMock()
    mock_connection.database = "neo4j"

    repository_instance = mock_repository.return_value

    repository_instance.create_node.side_effect = RuntimeError(
        "Neo4j write failed"
    )

    try:
        sync_knowledge_graph_to_neo4j(mock_db)
        assert False, "Expected RuntimeError"
    except RuntimeError as exc:
        assert str(exc) == "Neo4j write failed"

    mock_connection.close.assert_called_once()