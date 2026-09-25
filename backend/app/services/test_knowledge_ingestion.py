from unittest.mock import Mock

import pytest

from app.services.knowledge_ingestion_service import (
    KnowledgeIngestionService,
)


# ============================================================
# KNOWLEDGE INGESTION TESTS
# ============================================================

def test_knowledge_ingestion_processes_chunks(monkeypatch):
    """
    Verify that ingestion sends every chunk to the embedding
    service and stores the generated embeddings.
    """

    mock_chunking = Mock()

    mock_chunking.chunk_with_metadata.return_value = [
        {
            "content": "NEXUS uses Skill Intelligence.",
            "metadata": {
                "chunk_index": 0
            },
        },
        {
            "content": "NEXUS creates Student Digital Twins.",
            "metadata": {
                "chunk_index": 1
            },
        },
    ]

    mock_embedding_service = Mock()

    mock_embedding_service.generate_embedding.side_effect = [
        [0.1, 0.2, 0.3],
        [0.4, 0.5, 0.6],
    ]

    mock_create_embedding = Mock()

    mock_create_embedding.side_effect = [
        {
            "id": 1,
            "content": "NEXUS uses Skill Intelligence.",
        },
        {
            "id": 2,
            "content": "NEXUS creates Student Digital Twins.",
        },
    ]

    monkeypatch.setattr(
        "app.services.knowledge_ingestion_service."
        "knowledge_chunking_service",
        mock_chunking,
    )

    monkeypatch.setattr(
        "app.services.knowledge_ingestion_service."
        "embedding_service",
        mock_embedding_service,
    )

    monkeypatch.setattr(
        "app.services.knowledge_ingestion_service."
        "create_embedding",
        mock_create_embedding,
    )

    service = KnowledgeIngestionService()

    result = service.ingest_text(
        db=Mock(),
        content="NEXUS knowledge content",
        source_type="research",
        source_id=10,
        metadata={
            "title": "NEXUS Research"
        },
    )

    assert len(result) == 2

    assert result[0]["id"] == 1
    assert result[1]["id"] == 2

    assert mock_embedding_service.generate_embedding.call_count == 2
    assert mock_create_embedding.call_count == 2


def test_knowledge_ingestion_passes_metadata(monkeypatch):
    """
    Verify that metadata and source information are passed
    correctly into the chunking service.
    """

    mock_chunking = Mock()

    mock_chunking.chunk_with_metadata.return_value = []

    monkeypatch.setattr(
        "app.services.knowledge_ingestion_service."
        "knowledge_chunking_service",
        mock_chunking,
    )

    service = KnowledgeIngestionService()

    db = Mock()

    result = service.ingest_text(
        db=db,
        content="Research document",
        source_type="research",
        source_id=25,
        metadata={
            "title": "Research Paper",
            "file_name": "paper.pdf",
        },
    )

    assert result == []

    mock_chunking.chunk_with_metadata.assert_called_once_with(
        text="Research document",
        source_type="research",
        source_id=25,
        metadata={
            "title": "Research Paper",
            "file_name": "paper.pdf",
        },
    )


def test_knowledge_ingestion_stores_embeddings(monkeypatch):
    """
    Verify that each generated embedding is passed to the
    database storage function with the correct source data.
    """

    mock_chunking = Mock()

    mock_chunking.chunk_with_metadata.return_value = [
        {
            "content": "Student Digital Twin knowledge.",
            "metadata": {
                "chunk_index": 0
            },
        }
    ]

    mock_embedding_service = Mock()

    mock_embedding_service.generate_embedding.return_value = (
        [0.1, 0.2, 0.3]
    )

    mock_create_embedding = Mock()

    mock_create_embedding.return_value = {
        "id": 100,
        "content": "Student Digital Twin knowledge.",
    }

    monkeypatch.setattr(
        "app.services.knowledge_ingestion_service."
        "knowledge_chunking_service",
        mock_chunking,
    )

    monkeypatch.setattr(
        "app.services.knowledge_ingestion_service."
        "embedding_service",
        mock_embedding_service,
    )

    monkeypatch.setattr(
        "app.services.knowledge_ingestion_service."
        "create_embedding",
        mock_create_embedding,
    )

    service = KnowledgeIngestionService()

    db = Mock()

    result = service.ingest_text(
        db=db,
        content="Student Digital Twin knowledge.",
        source_type="student",
        source_id=50,
        metadata={
            "type": "student_knowledge"
        },
    )

    assert len(result) == 1
    assert result[0]["id"] == 100

    mock_embedding_service.generate_embedding.assert_called_once_with(
        "Student Digital Twin knowledge."
    )

    mock_create_embedding.assert_called_once_with(
        db=db,
        content="Student Digital Twin knowledge.",
        embedding=[0.1, 0.2, 0.3],
        source_type="student",
        source_id=50,
        metadata={
            "chunk_index": 0
        },
    )


def test_knowledge_ingestion_rejects_empty_content():
    """
    Verify that empty knowledge content is rejected before
    chunking or embedding.
    """

    service = KnowledgeIngestionService()

    with pytest.raises(
        ValueError,
        match="Knowledge content cannot be empty",
    ):
        service.ingest_text(
            db=Mock(),
            content="",
        )