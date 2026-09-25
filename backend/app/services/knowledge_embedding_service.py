from sqlalchemy import text
from sqlalchemy.orm import Session

from app.models.knowledge_embedding import KnowledgeEmbedding


def create_embedding(
    db: Session,
    content: str,
    embedding: list[float],
    source_type: str | None = None,
    source_id: int | None = None,
    metadata: dict | None = None,
):
    """
    Store a text embedding in the knowledge_embeddings table.
    """

    if not content or not content.strip():
        raise ValueError(
            "Embedding content cannot be empty"
        )

    if len(embedding) != 1536:
        raise ValueError(
            "Embedding must contain exactly 1536 dimensions"
        )

    knowledge_embedding = KnowledgeEmbedding(
        content=content,
        embedding=embedding,
        source_type=source_type,
        source_id=source_id,
        metadata_json=metadata or {},
    )

    db.add(knowledge_embedding)
    db.commit()
    db.refresh(knowledge_embedding)

    return knowledge_embedding


def knowledge_exists(
    db: Session,
    source_type: str,
    source_id: int,
) -> bool:
    """
    Check whether knowledge has already been stored
    for a specific source entity.
    """

    if not source_type:
        raise ValueError(
            "source_type cannot be empty"
        )

    if source_id <= 0:
        raise ValueError(
            "source_id must be greater than 0"
        )

    existing = (
        db.query(KnowledgeEmbedding.id)
        .filter(
            KnowledgeEmbedding.source_type
            == source_type,
            KnowledgeEmbedding.source_id
            == source_id,
        )
        .first()
    )

    return existing is not None


def delete_source_embeddings(
    db: Session,
    source_type: str,
    source_id: int,
) -> int:
    """
    Delete all embeddings belonging to a source.

    Returns:
        Number of deleted embeddings.
    """

    if not source_type:
        raise ValueError(
            "source_type cannot be empty"
        )

    if source_id <= 0:
        raise ValueError(
            "source_id must be greater than 0"
        )

    deleted_count = (
        db.query(KnowledgeEmbedding)
        .filter(
            KnowledgeEmbedding.source_type
            == source_type,
            KnowledgeEmbedding.source_id
            == source_id,
        )
        .delete(
            synchronize_session=False
        )
    )

    db.commit()

    return deleted_count


def get_embedding(
    db: Session,
    embedding_id: int,
):
    """
    Retrieve one stored embedding.
    """

    return (
        db.query(KnowledgeEmbedding)
        .filter(
            KnowledgeEmbedding.id == embedding_id
        )
        .first()
    )


def get_embeddings(
    db: Session,
    skip: int = 0,
    limit: int = 100,
):
    """
    Retrieve stored embeddings.
    """

    return (
        db.query(KnowledgeEmbedding)
        .offset(skip)
        .limit(limit)
        .all()
    )


def delete_embedding(
    db: Session,
    embedding_id: int,
):
    """
    Delete one stored embedding.
    """

    embedding = get_embedding(
        db,
        embedding_id,
    )

    if embedding is None:
        return None

    db.delete(embedding)
    db.commit()

    return embedding


def search_similar_embeddings(
    db: Session,
    query_embedding: list[float],
    limit: int = 5,
    source_type: str | None = None,
    source_id: int | None = None,
):
    """
    Search for semantically similar knowledge.

    Uses pgvector cosine distance.

    Optional filters:
        source_type
        source_id

    Smaller distance = more semantically similar.
    """

    if len(query_embedding) != 1536:
        raise ValueError(
            "Query embedding must contain exactly 1536 dimensions"
        )

    if limit <= 0:
        raise ValueError(
            "Search limit must be greater than 0"
        )

    conditions = []
    parameters = {}

    if source_type is not None:
        conditions.append(
            "source_type = :source_type"
        )
        parameters["source_type"] = source_type

    if source_id is not None:
        conditions.append(
            "source_id = :source_id"
        )
        parameters["source_id"] = source_id

    where_clause = ""

    if conditions:
        where_clause = (
            "WHERE "
            + " AND ".join(conditions)
        )

    query = text(
        f"""
        SELECT
            id,
            content,
            embedding <=> CAST(:query_embedding AS vector)
                AS distance,
            source_type,
            source_id,
            metadata,
            created_at
        FROM knowledge_embeddings
        {where_clause}
        ORDER BY embedding <=> CAST(:query_embedding AS vector)
        LIMIT :limit
        """
    )

    embedding_string = (
        "["
        + ",".join(
            str(value)
            for value in query_embedding
        )
        + "]"
    )

    parameters["query_embedding"] = embedding_string
    parameters["limit"] = limit

    result = db.execute(
        query,
        parameters,
    )

    return result.mappings().all()