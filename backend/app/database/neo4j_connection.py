from neo4j import GraphDatabase
from app.core.config import settings


class Neo4jConnection:
    """
    Manages the connection between NEXUS and Neo4j Aura.
    """

    def __init__(self):
        self.uri = settings.NEO4J_URI
        self.username = settings.NEO4J_USERNAME
        self.password = settings.NEO4J_PASSWORD
        self.database = settings.NEO4J_DATABASE

        self.driver = None

    def connect(self):
        """
        Create the Neo4j driver.
        """
        if not self.uri:
            raise ValueError("NEO4J_URI is not configured")

        if not self.password:
            raise ValueError("NEO4J_PASSWORD is not configured")

        self.driver = GraphDatabase.driver(
            self.uri,
            auth=(self.username, self.password),
        )

        return self.driver

    def verify_connection(self):
        """
        Verify that NEXUS can communicate with Neo4j.
        """
        if self.driver is None:
            self.connect()

        self.driver.verify_connectivity()

        return True

    def close(self):
        """
        Close the Neo4j connection.
        """
        if self.driver:
            self.driver.close()
            self.driver = None


neo4j_connection = Neo4jConnection()