from app.services.knowledge_graph_engine import (
    calculate_graph_density,
    calculate_connectivity_score,
    count_nodes_by_type,
    count_relationships_by_type,
    generate_graph_insights,
    analyze_knowledge_graph,
)


# =========================================================
# calculate_graph_density
# =========================================================

def test_calculate_graph_density_empty():
    result = calculate_graph_density(
        node_count=0,
        relationship_count=0,
    )

    assert result == 0.0


def test_calculate_graph_density_single_node():
    result = calculate_graph_density(
        node_count=1,
        relationship_count=0,
    )

    assert result == 0.0


def test_calculate_graph_density():
    result = calculate_graph_density(
        node_count=5,
        relationship_count=5,
    )

    assert result == 25.0


def test_calculate_graph_density_clamped():
    result = calculate_graph_density(
        node_count=2,
        relationship_count=10,
    )

    assert result == 100.0


# =========================================================
# calculate_connectivity_score
# =========================================================

def test_calculate_connectivity_score_empty():
    result = calculate_connectivity_score(
        node_count=0,
        relationship_count=0,
    )

    assert result == 0.0


def test_calculate_connectivity_score():
    result = calculate_connectivity_score(
        node_count=5,
        relationship_count=5,
    )

    assert result == 25.0


def test_calculate_connectivity_score_clamped():
    result = calculate_connectivity_score(
        node_count=1,
        relationship_count=10,
    )

    assert result == 100.0


# =========================================================
# count_nodes_by_type
# =========================================================

def test_count_nodes_by_type():
    nodes = [
        {"id": "student:1", "type": "student"},
        {"id": "student:2", "type": "student"},
        {"id": "skill:1", "type": "skill"},
        {"id": "project:1", "type": "project"},
    ]

    result = count_nodes_by_type(nodes)

    assert result == {
        "student": 2,
        "skill": 1,
        "project": 1,
    }


def test_count_nodes_by_type_empty():
    result = count_nodes_by_type([])

    assert result == {}


def test_count_nodes_by_type_unknown():
    nodes = [
        {"id": "x:1"},
    ]

    result = count_nodes_by_type(nodes)

    assert result == {
        "unknown": 1,
    }


# =========================================================
# count_relationships_by_type
# =========================================================

def test_count_relationships_by_type():
    relationships = [
        {
            "source": "student:1",
            "relationship": "HAS_SKILL",
            "target": "skill:1",
        },
        {
            "source": "student:2",
            "relationship": "HAS_SKILL",
            "target": "skill:1",
        },
        {
            "source": "student:1",
            "relationship": "WORKS_ON",
            "target": "project:1",
        },
    ]

    result = count_relationships_by_type(
        relationships
    )

    assert result == {
        "HAS_SKILL": 2,
        "WORKS_ON": 1,
    }


def test_count_relationships_by_type_empty():
    result = count_relationships_by_type([])

    assert result == {}


def test_count_relationships_by_type_unknown():
    relationships = [
        {
            "source": "student:1",
            "target": "skill:1",
        },
    ]

    result = count_relationships_by_type(
        relationships
    )

    assert result == {
        "unknown": 1,
    }


# =========================================================
# generate_graph_insights
# =========================================================

def test_generate_graph_insights_empty():
    result = generate_graph_insights(
        node_count=0,
        relationship_count=0,
        node_types={},
        relationship_types={},
    )

    assert result == [
        "The knowledge graph currently contains no nodes."
    ]


def test_generate_graph_insights_connected_graph():
    result = generate_graph_insights(
        node_count=5,
        relationship_count=5,
        node_types={
            "student": 1,
            "skill": 1,
            "project": 1,
            "opportunity": 1,
            "failure": 1,
        },
        relationship_types={
            "HAS_SKILL": 1,
            "WORKS_ON": 1,
            "REQUIRES_SKILL": 1,
            "HAS_FAILURE": 1,
        },
    )

    assert (
        "The knowledge graph contains connected "
        "campus entities and relationships."
        in result
    )

    assert (
        "Student entities are represented in the graph."
        in result
    )

    assert (
        "Skill entities are represented and can be "
        "connected to students, projects, and opportunities."
        in result
    )

    assert (
        "Project entities provide a basis for "
        "mapping practical student experience."
        in result
    )

    assert (
        "Opportunity entities can support "
        "student-to-opportunity intelligence."
        in result
    )

    assert (
        "Failure entities provide institutional "
        "learning information."
        in result
    )


def test_generate_graph_insights_no_relationships():
    result = generate_graph_insights(
        node_count=2,
        relationship_count=0,
        node_types={
            "student": 1,
            "skill": 1,
        },
        relationship_types={},
    )

    assert (
        "The knowledge graph contains entities "
        "but no relationships have been established."
        in result
    )


# =========================================================
# analyze_knowledge_graph
# =========================================================

def test_analyze_knowledge_graph_empty():
    graph = {
        "nodes": [],
        "relationships": [],
    }

    result = analyze_knowledge_graph(graph)

    assert result["node_count"] == 0
    assert result["relationship_count"] == 0
    assert result["node_types"] == {}
    assert result["relationship_types"] == {}
    assert result["density_score"] == 0.0
    assert result["connectivity_score"] == 0.0

    assert result["insights"] == [
        "The knowledge graph currently contains no nodes."
    ]


def test_analyze_knowledge_graph():
    graph = {
        "nodes": [
            {
                "id": "student:1",
                "type": "student",
            },
            {
                "id": "skill:1",
                "type": "skill",
            },
            {
                "id": "project:1",
                "type": "project",
            },
        ],
        "relationships": [
            {
                "source": "student:1",
                "relationship": "HAS_SKILL",
                "target": "skill:1",
            },
            {
                "source": "student:1",
                "relationship": "WORKS_ON",
                "target": "project:1",
            },
        ],
    }

    result = analyze_knowledge_graph(graph)

    assert result["node_count"] == 3
    assert result["relationship_count"] == 2

    assert result["node_types"] == {
        "student": 1,
        "skill": 1,
        "project": 1,
    }

    assert result["relationship_types"] == {
        "HAS_SKILL": 1,
        "WORKS_ON": 1,
    }

    assert result["density_score"] == 33.33
    assert result["connectivity_score"] == 16.67

    assert len(result["insights"]) > 0