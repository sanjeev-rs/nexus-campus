from types import SimpleNamespace
from unittest.mock import Mock

from app.services.knowledge_graph_service import (
    create_node,
    create_relationship,
    build_student_nodes,
    build_skill_nodes,
    build_project_nodes,
    build_opportunity_nodes,
    build_failure_nodes,
    build_student_skill_relationships,
    build_student_project_relationships,
    build_project_skill_relationships,
    build_opportunity_skill_relationships,
    build_project_failure_relationships,
    build_knowledge_graph,
)


# =========================================================
# create_node
# =========================================================

def test_create_node():
    result = create_node(
        node_id="student:1",
        node_type="student",
        label="Student One",
        properties={"student_id": 1},
    )

    assert result == {
        "id": "student:1",
        "type": "student",
        "label": "Student One",
        "properties": {
            "student_id": 1,
        },
    }


def test_create_node_without_properties():
    result = create_node(
        node_id="skill:1",
        node_type="skill",
        label="Python",
    )

    assert result["id"] == "skill:1"
    assert result["type"] == "skill"
    assert result["label"] == "Python"
    assert result["properties"] == {}


# =========================================================
# create_relationship
# =========================================================

def test_create_relationship():
    result = create_relationship(
        source="student:1",
        relationship_type="HAS_SKILL",
        target="skill:1",
        properties={
            "proficiency_level": 4,
        },
    )

    assert result == {
        "source": "student:1",
        "relationship": "HAS_SKILL",
        "target": "skill:1",
        "properties": {
            "proficiency_level": 4,
        },
    }


def test_create_relationship_without_properties():
    result = create_relationship(
        source="project:1",
        relationship_type="HAS_FAILURE",
        target="failure:1",
    )

    assert result["source"] == "project:1"
    assert result["relationship"] == "HAS_FAILURE"
    assert result["target"] == "failure:1"
    assert result["properties"] == {}


# =========================================================
# build_student_nodes
# =========================================================

def test_build_student_nodes():
    db = Mock()

    students = [
        SimpleNamespace(
            id=1,
            name="Alice",
            student_id="ST001",
        ),
        SimpleNamespace(
            id=2,
            name="Bob",
            student_id="ST002",
        ),
    ]

    db.query.return_value.all.return_value = students

    result = build_student_nodes(db)

    assert len(result) == 2

    assert result[0]["id"] == "student:1"
    assert result[0]["type"] == "student"
    assert result[0]["label"] == "Alice"
    assert result[0]["properties"]["student_id"] == 1

    assert result[1]["id"] == "student:2"
    assert result[1]["label"] == "Bob"


def test_build_student_nodes_fallback_label():
    db = Mock()

    students = [
        SimpleNamespace(
            id=1,
            name=None,
            student_id="ST001",
        ),
    ]

    db.query.return_value.all.return_value = students

    result = build_student_nodes(db)

    assert result[0]["label"] == "ST001"


def test_build_student_nodes_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = build_student_nodes(db)

    assert result == []


# =========================================================
# build_skill_nodes
# =========================================================

def test_build_skill_nodes():
    db = Mock()

    skills = [
        SimpleNamespace(
            id=1,
            name="Python",
        ),
        SimpleNamespace(
            id=2,
            name="Machine Learning",
        ),
    ]

    db.query.return_value.all.return_value = skills

    result = build_skill_nodes(db)

    assert len(result) == 2
    assert result[0]["id"] == "skill:1"
    assert result[0]["type"] == "skill"
    assert result[0]["label"] == "Python"
    assert result[0]["properties"]["skill_id"] == 1

    assert result[1]["label"] == "Machine Learning"


def test_build_skill_nodes_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = build_skill_nodes(db)

    assert result == []


# =========================================================
# build_project_nodes
# =========================================================

def test_build_project_nodes():
    db = Mock()

    projects = [
        SimpleNamespace(
            id=1,
            title="NEXUS",
        ),
        SimpleNamespace(
            id=2,
            title="Solar Tracker",
        ),
    ]

    db.query.return_value.all.return_value = projects

    result = build_project_nodes(db)

    assert len(result) == 2

    assert result[0]["id"] == "project:1"
    assert result[0]["type"] == "project"
    assert result[0]["label"] == "NEXUS"
    assert result[0]["properties"]["project_id"] == 1

    assert result[1]["label"] == "Solar Tracker"


def test_build_project_nodes_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = build_project_nodes(db)

    assert result == []


# =========================================================
# build_opportunity_nodes
# =========================================================

def test_build_opportunity_nodes():
    db = Mock()

    opportunities = [
        SimpleNamespace(
            id=1,
            title="AI Internship",
            organization="Company A",
            opportunity_type="internship",
            status="active",
        ),
    ]

    db.query.return_value.all.return_value = opportunities

    result = build_opportunity_nodes(db)

    assert len(result) == 1

    node = result[0]

    assert node["id"] == "opportunity:1"
    assert node["type"] == "opportunity"
    assert node["label"] == "AI Internship"

    assert node["properties"]["opportunity_id"] == 1
    assert node["properties"]["organization"] == "Company A"
    assert node["properties"]["type"] == "internship"
    assert node["properties"]["status"] == "active"


def test_build_opportunity_nodes_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = build_opportunity_nodes(db)

    assert result == []


# =========================================================
# build_failure_nodes
# =========================================================

def test_build_failure_nodes():
    db = Mock()

    failures = [
        SimpleNamespace(
            id=1,
            failure_type="Deployment Failure",
            project_id=10,
            failure_description="Server deployment failed.",
        ),
    ]

    db.query.return_value.all.return_value = failures

    result = build_failure_nodes(db)

    assert len(result) == 1

    node = result[0]

    assert node["id"] == "failure:1"
    assert node["type"] == "failure"
    assert node["label"] == "Deployment Failure"

    assert node["properties"]["failure_id"] == 1
    assert node["properties"]["project_id"] == 10
    assert (
        node["properties"]["description"]
        == "Server deployment failed."
    )


def test_build_failure_nodes_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = build_failure_nodes(db)

    assert result == []


# =========================================================
# build_student_skill_relationships
# =========================================================

def test_build_student_skill_relationships():
    db = Mock()

    student_skills = [
        SimpleNamespace(
            student_id=1,
            skill_id=2,
            proficiency_level=4,
            source="academic",
            verified=True,
        ),
    ]

    db.query.return_value.all.return_value = student_skills

    result = build_student_skill_relationships(db)

    assert len(result) == 1

    relationship = result[0]

    assert relationship["source"] == "student:1"
    assert relationship["relationship"] == "HAS_SKILL"
    assert relationship["target"] == "skill:2"

    assert relationship["properties"]["proficiency_level"] == 4
    assert relationship["properties"]["source"] == "academic"
    assert relationship["properties"]["verified"] is True


def test_build_student_skill_relationships_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = build_student_skill_relationships(db)

    assert result == []


# =========================================================
# build_student_project_relationships
# =========================================================

def test_build_student_project_relationships():
    db = Mock()

    members = [
        SimpleNamespace(
            student_id=1,
            project_id=5,
            role="Developer",
        ),
    ]

    db.query.return_value.all.return_value = members

    result = build_student_project_relationships(db)

    assert len(result) == 1

    relationship = result[0]

    assert relationship["source"] == "student:1"
    assert relationship["relationship"] == "WORKS_ON"
    assert relationship["target"] == "project:5"
    assert relationship["properties"]["role"] == "Developer"


def test_build_student_project_relationships_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = build_student_project_relationships(db)

    assert result == []


# =========================================================
# build_project_skill_relationships
# =========================================================

def test_build_project_skill_relationships():
    db = Mock()

    project_skills = [
        SimpleNamespace(
            project_id=5,
            skill_id=2,
            proficiency_level=3,
        ),
    ]

    db.query.return_value.all.return_value = project_skills

    result = build_project_skill_relationships(db)

    assert len(result) == 1

    relationship = result[0]

    assert relationship["source"] == "project:5"
    assert relationship["relationship"] == "USES_SKILL"
    assert relationship["target"] == "skill:2"
    assert (
        relationship["properties"]["proficiency_level"]
        == 3
    )


def test_build_project_skill_relationships_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = build_project_skill_relationships(db)

    assert result == []


# =========================================================
# build_opportunity_skill_relationships
# =========================================================

def test_build_opportunity_skill_relationships():
    db = Mock()

    opportunity_skills = [
        SimpleNamespace(
            opportunity_id=10,
            skill_id=2,
            importance="high",
            minimum_proficiency=3,
        ),
    ]

    db.query.return_value.all.return_value = opportunity_skills

    result = build_opportunity_skill_relationships(db)

    assert len(result) == 1

    relationship = result[0]

    assert relationship["source"] == "opportunity:10"
    assert relationship["relationship"] == "REQUIRES_SKILL"
    assert relationship["target"] == "skill:2"

    assert relationship["properties"]["importance"] == "high"
    assert (
        relationship["properties"]["minimum_proficiency"]
        == 3
    )


def test_build_opportunity_skill_relationships_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = build_opportunity_skill_relationships(db)

    assert result == []


# =========================================================
# build_project_failure_relationships
# =========================================================

def test_build_project_failure_relationships():
    db = Mock()

    failures = [
        SimpleNamespace(
            id=7,
            project_id=5,
        ),
    ]

    db.query.return_value.all.return_value = failures

    result = build_project_failure_relationships(db)

    assert len(result) == 1

    relationship = result[0]

    assert relationship["source"] == "project:5"
    assert relationship["relationship"] == "HAS_FAILURE"
    assert relationship["target"] == "failure:7"
    assert relationship["properties"] == {}


def test_build_project_failure_relationships_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = build_project_failure_relationships(db)

    assert result == []


# =========================================================
# build_knowledge_graph
# =========================================================

def test_build_knowledge_graph_empty():
    db = Mock()

    db.query.return_value.all.return_value = []

    result = build_knowledge_graph(db)

    assert result["node_count"] == 0
    assert result["relationship_count"] == 0
    assert result["nodes"] == []
    assert result["relationships"] == []


def test_build_knowledge_graph():
    db = Mock()

    students = [
        SimpleNamespace(
            id=1,
            name="Alice",
            student_id="ST001",
        ),
    ]

    skills = [
        SimpleNamespace(
            id=2,
            name="Python",
        ),
    ]

    projects = [
        SimpleNamespace(
            id=3,
            title="NEXUS",
        ),
    ]

    opportunities = [
        SimpleNamespace(
            id=4,
            title="AI Internship",
            organization="Company A",
            opportunity_type="internship",
            status="active",
        ),
    ]

    failures = [
        SimpleNamespace(
            id=5,
            failure_type="Deployment Failure",
            project_id=3,
            failure_description="Deployment failed.",
        ),
    ]

    student_skills = [
        SimpleNamespace(
            student_id=1,
            skill_id=2,
            proficiency_level=4,
            source="academic",
            verified=True,
        ),
    ]

    project_members = [
        SimpleNamespace(
            student_id=1,
            project_id=3,
            role="Developer",
        ),
    ]

    project_skills = [
        SimpleNamespace(
            project_id=3,
            skill_id=2,
            proficiency_level=4,
        ),
    ]

    opportunity_skills = [
        SimpleNamespace(
            opportunity_id=4,
            skill_id=2,
            importance="high",
            minimum_proficiency=3,
        ),
    ]

    query_results = [
        students,
        skills,
        projects,
        opportunities,
        failures,
        student_skills,
        project_members,
        project_skills,
        opportunity_skills,
        failures,
    ]

    db.query.return_value.all.side_effect = query_results

    result = build_knowledge_graph(db)

    assert result["node_count"] == 5
    assert result["relationship_count"] == 5

    assert len(result["nodes"]) == 5
    assert len(result["relationships"]) == 5

    node_ids = {
        node["id"]
        for node in result["nodes"]
    }

    assert "student:1" in node_ids
    assert "skill:2" in node_ids
    assert "project:3" in node_ids
    assert "opportunity:4" in node_ids
    assert "failure:5" in node_ids

    relationship_types = {
        relationship["relationship"]
        for relationship in result["relationships"]
    }

    assert "HAS_SKILL" in relationship_types
    assert "WORKS_ON" in relationship_types
    assert "USES_SKILL" in relationship_types
    assert "REQUIRES_SKILL" in relationship_types
    assert "HAS_FAILURE" in relationship_types