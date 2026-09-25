from sqlalchemy.orm import Session

from app.database.neo4j_connection import neo4j_connection
from app.services.knowledge_graph_service import build_knowledge_graph
from app.services.neo4j_repository import Neo4jRepository


def sync_knowledge_graph_to_neo4j(db: Session) -> dict:
    """
    Synchronize the NEXUS knowledge graph from PostgreSQL
    into Neo4j.
    """

    graph = build_knowledge_graph(db)

    neo4j_connection.connect()

    repository = Neo4jRepository(
        driver=neo4j_connection.driver,
        database=neo4j_connection.database,
    )

    node_count = 0
    relationship_count = 0

    try:
        # =================================================
        # NODES
        # =================================================

        for node in graph["nodes"]:
            repository.create_node(
                node_id=node["id"],
                node_type=node["type"],
                label=node["label"],
                properties=node.get("properties", {}),
            )

            node_count += 1

        # =================================================
        # RELATIONSHIPS
        # =================================================

        for relationship in graph["relationships"]:
            repository.create_relationship(
                source_id=relationship["source"],
                relationship_type=relationship["relationship"],
                target_id=relationship["target"],
                properties=relationship.get("properties", {}),
            )

            relationship_count += 1

        # =================================================
        # STATISTICS
        # =================================================

        statistics = repository.get_graph_statistics()

        return {
            "status": "success",
            "source_node_count": len(graph["nodes"]),
            "source_relationship_count": len(graph["relationships"]),
            "synced_node_count": node_count,
            "synced_relationship_count": relationship_count,
            "neo4j_node_count": statistics["node_count"],
            "neo4j_relationship_count": statistics["relationship_count"],
        }

    finally:
        neo4j_connection.close()