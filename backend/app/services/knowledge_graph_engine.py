from sqlalchemy.orm import Session

from app.services.knowledge_graph_service import (
    build_knowledge_graph,
)


# =========================================================
# GRAPH METRICS
# =========================================================

def calculate_graph_density(
    node_count: int,
    relationship_count: int,
) -> float:
    """
    Calculate a simple graph connectivity density.

    A graph with more relationships relative to its
    number of nodes has greater connectivity.
    """

    if node_count <= 1:
        return 0.0

    possible_relationships = node_count * (node_count - 1)

    density = (
        relationship_count / possible_relationships
    ) * 100

    return round(
        min(max(density, 0.0), 100.0),
        2,
    )


def calculate_connectivity_score(
    node_count: int,
    relationship_count: int,
) -> float:
    """
    Calculate an overall graph connectivity score.
    """

    if node_count == 0:
        return 0.0

    relationships_per_node = (
        relationship_count / node_count
    )

    score = relationships_per_node * 25

    return round(
        min(max(score, 0.0), 100.0),
        2,
    )


# =========================================================
# NODE ANALYSIS
# =========================================================

def count_nodes_by_type(
    nodes: list[dict],
) -> dict:
    """
    Count graph nodes by node type.
    """

    counts = {}

    for node in nodes:
        node_type = node.get("type", "unknown")

        counts[node_type] = (
            counts.get(node_type, 0) + 1
        )

    return counts


# =========================================================
# RELATIONSHIP ANALYSIS
# =========================================================

def count_relationships_by_type(
    relationships: list[dict],
) -> dict:
    """
    Count graph relationships by relationship type.
    """

    counts = {}

    for relationship in relationships:
        relationship_type = relationship.get(
            "relationship",
            "unknown",
        )

        counts[relationship_type] = (
            counts.get(relationship_type, 0) + 1
        )

    return counts


# =========================================================
# GRAPH INSIGHTS
# =========================================================

def generate_graph_insights(
    node_count: int,
    relationship_count: int,
    node_types: dict,
    relationship_types: dict,
) -> list[str]:
    """
    Generate deterministic insights from graph structure.
    """

    insights = []

    if node_count == 0:
        insights.append(
            "The knowledge graph currently contains no nodes."
        )

        return insights

    if relationship_count == 0:
        insights.append(
            "The knowledge graph contains entities "
            "but no relationships have been established."
        )
    else:
        insights.append(
            "The knowledge graph contains connected "
            "campus entities and relationships."
        )

    if node_types.get("student", 0) > 0:
        insights.append(
            "Student entities are represented in the graph."
        )

    if node_types.get("skill", 0) > 0:
        insights.append(
            "Skill entities are represented and can be "
            "connected to students, projects, and opportunities."
        )

    if node_types.get("project", 0) > 0:
        insights.append(
            "Project entities provide a basis for "
            "mapping practical student experience."
        )

    if node_types.get("opportunity", 0) > 0:
        insights.append(
            "Opportunity entities can support "
            "student-to-opportunity intelligence."
        )

    if node_types.get("failure", 0) > 0:
        insights.append(
            "Failure entities provide institutional "
            "learning information."
        )

    if relationship_types.get("HAS_SKILL", 0) > 0:
        insights.append(
            "Student skill relationships are available "
            "for skill intelligence."
        )

    if relationship_types.get("WORKS_ON", 0) > 0:
        insights.append(
            "Student-project relationships are available "
            "for project experience analysis."
        )

    if relationship_types.get("REQUIRES_SKILL", 0) > 0:
        insights.append(
            "Opportunity skill requirements are available "
            "for opportunity matching."
        )

    if relationship_types.get("HAS_FAILURE", 0) > 0:
        insights.append(
            "Project failure relationships are available "
            "for institutional learning."
        )

    return insights


# =========================================================
# GRAPH ANALYSIS
# =========================================================

def analyze_knowledge_graph(
    graph: dict,
) -> dict:
    """
    Analyze a previously generated knowledge graph.
    """

    nodes = graph.get("nodes", [])
    relationships = graph.get(
        "relationships",
        [],
    )

    node_count = len(nodes)
    relationship_count = len(relationships)

    node_types = count_nodes_by_type(nodes)

    relationship_types = (
        count_relationships_by_type(
            relationships
        )
    )

    density_score = calculate_graph_density(
        node_count=node_count,
        relationship_count=relationship_count,
    )

    connectivity_score = (
        calculate_connectivity_score(
            node_count=node_count,
            relationship_count=relationship_count,
        )
    )

    insights = generate_graph_insights(
        node_count=node_count,
        relationship_count=relationship_count,
        node_types=node_types,
        relationship_types=relationship_types,
    )

    return {
        "node_count": node_count,
        "relationship_count": relationship_count,
        "node_types": node_types,
        "relationship_types": relationship_types,
        "density_score": density_score,
        "connectivity_score": connectivity_score,
        "insights": insights,
    }


# =========================================================
# DATABASE → GRAPH → INTELLIGENCE
# =========================================================

def generate_knowledge_graph_intelligence(
    db: Session,
) -> dict:
    """
    Build the current campus knowledge graph
    and generate intelligence from it.
    """

    graph = build_knowledge_graph(db)

    analysis = analyze_knowledge_graph(
        graph
    )

    return {
        "graph": graph,
        "analysis": analysis,
    }