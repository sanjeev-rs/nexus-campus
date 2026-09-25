from app.database.neo4j_connection import neo4j_connection


neo4j_connection.connect()

try:
    query = """
    MATCH (n:Entity)
    WHERE n.type = $type
    RETURN n.id AS id, n.label AS label
    ORDER BY n.id
    """

    with neo4j_connection.driver.session(
        database=neo4j_connection.database
    ) as session:
        result = session.run(query, type="student")

        for record in result:
            print({
                "id": record["id"],
                "label": record["label"],
            })

finally:
    neo4j_connection.close()