from unittest.mock import MagicMock

from app.services.neo4j_repository import Neo4jRepository


def create_repository():
    driver = MagicMock()
    return Neo4jRepository(driver=driver, database="neo4j"), driver


def test_repository_initialization():
    repository, driver = create_repository()

    assert repository.driver is driver
    assert repository.database == "neo4j"


def test_create_node():
    repository, driver = create_repository()

    session = driver.session.return_value.__enter__.return_value

    record = MagicMock()
    session.run.return_value.single.return_value = record

    result = repository.create_node(
        node_id="student:1",
        node_type="student",
        label="Student 1",
        properties={"student_id": 1},
    )

    assert result is record
    session.run.assert_called_once()


def test_create_relationship():
    repository, driver = create_repository()

    session = driver.session.return_value.__enter__.return_value

    record = MagicMock()
    session.run.return_value.single.return_value = record

    result = repository.create_relationship(
        source_id="student:1",
        relationship_type="HAS_SKILL",
        target_id="skill:1",
        properties={"proficiency_level": 4},
    )

    assert result is record
    session.run.assert_called_once()


def test_get_node_count():
    repository, driver = create_repository()

    session = driver.session.return_value.__enter__.return_value

    record = {"count": 10}
    session.run.return_value.single.return_value = record

    result = repository.get_node_count()

    assert result == 10


def test_get_relationship_count():
    repository, driver = create_repository()

    session = driver.session.return_value.__enter__.return_value

    record = {"count": 15}
    session.run.return_value.single.return_value = record

    result = repository.get_relationship_count()

    assert result == 15


def test_clear_graph():
    repository, driver = create_repository()

    session = driver.session.return_value.__enter__.return_value

    repository.clear_graph()

    session.run.assert_called_once()


def test_get_graph_statistics():
    repository, driver = create_repository()

    repository.get_node_count = MagicMock(return_value=10)
    repository.get_relationship_count = MagicMock(return_value=15)

    result = repository.get_graph_statistics()

    assert result == {
        "node_count": 10,
        "relationship_count": 15,
    }