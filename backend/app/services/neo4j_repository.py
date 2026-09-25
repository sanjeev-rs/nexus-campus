from typing import Any

from neo4j import Driver


class Neo4jRepository:
    """
    Repository responsible for reading and writing NEXUS graph data
    in Neo4j.
    """

    def __init__(self, driver: Driver, database: str = "neo4j"):
        self.driver = driver
        self.database = database

    # =====================================================
    # NODE OPERATIONS
    # =====================================================

    def create_node(
        self,
        node_id: str,
        node_type: str,
        label: str,
        properties: dict[str, Any] | None = None,
    ):
        """
        Create or update a node in Neo4j.
        """

        properties = properties or {}

        query = """
        MERGE (n:Entity {id: $node_id})
        SET n.type = $node_type,
            n.label = $label,
            n += $properties
        RETURN n
        """

        with self.driver.session(database=self.database) as session:
            result = session.run(
                query,
                node_id=node_id,
                node_type=node_type,
                label=label,
                properties=properties,
            )

            return result.single()

    # =====================================================
    # RELATIONSHIP OPERATIONS
    # =====================================================

    def create_relationship(
        self,
        source_id: str,
        relationship_type: str,
        target_id: str,
        properties: dict[str, Any] | None = None,
    ):
        """
        Create a relationship between two existing nodes.
        """

        properties = properties or {}

        query = f"""
        MATCH (source:Entity {{id: $source_id}})
        MATCH (target:Entity {{id: $target_id}})
        MERGE (source)-[r:{relationship_type}]->(target)
        SET r += $properties
        RETURN r
        """

        with self.driver.session(database=self.database) as session:
            result = session.run(
                query,
                source_id=source_id,
                target_id=target_id,
                properties=properties,
            )

            return result.single()

    # =====================================================
    # GRAPH OPERATIONS
    # =====================================================

    def get_node_count(self) -> int:
        """
        Return the total number of NEXUS graph nodes.
        """

        query = """
        MATCH (n:Entity)
        RETURN count(n) AS count
        """

        with self.driver.session(database=self.database) as session:
            result = session.run(query)
            record = result.single()

            return record["count"] if record else 0

    def get_relationship_count(self) -> int:
        """
        Return the total number of NEXUS graph relationships.
        """

        query = """
        MATCH ()-[r]->()
        RETURN count(r) AS count
        """

        with self.driver.session(database=self.database) as session:
            result = session.run(query)
            record = result.single()

            return record["count"] if record else 0

    def clear_graph(self):
        """
        Delete all NEXUS graph data.

        This is intended for development/testing only.
        """

        query = """
        MATCH (n:Entity)
        DETACH DELETE n
        """

        with self.driver.session(database=self.database) as session:
            session.run(query)

    def get_graph_statistics(self) -> dict[str, int]:
        """
        Return basic Neo4j graph statistics.
        """

        return {
            "node_count": self.get_node_count(),
            "relationship_count": self.get_relationship_count(),
        }