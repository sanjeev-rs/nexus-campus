from unittest.mock import Mock

import pytest

from app.services.knowledge_retrieval_service import (
    KnowledgeRetrievalService,
)


# ============================================================
# KNOWLEDGE RETRIEVAL TESTS
# ============================================================

def test_knowledge_retrieval_returns_results(monkeypatch):
    """
    Verify that KnowledgeRetrievalService correctly converts
    semantic search results into retrieval results.
    """

    mock_search = Mock()

    mock_search.search.return_value = [
        {
            "id": 1,
            "content": "NEXUS uses Skill Intelligence to analyze students.",
            "distance": 0.10,
            "source_type": "research",
            "source_id": 10,
            "metadata": {
                "title": "NEXUS Research"
            },
            "created_at": None,
        },
        {
            "id": 2,
            "content": "NEXUS creates Student Digital Twins.",
            "distance": 0.20,
            "source_type": "research",
            "source_id": 11,
            "metadata": {},
            "created_at": None,
        },
    ]

    monkeypatch.setattr(
        "app.services.knowledge_retrieval_service.semantic_search_service",
        mock_search,
    )

    service = KnowledgeRetrievalService()

    result = service.retrieve(
        db=Mock(),
        query="How does NEXUS analyze students?",
        limit=5,
    )

    assert len(result) == 2

    assert result[0]["id"] == 1
    assert result[0]["content"] == (
        "NEXUS uses Skill Intelligence to analyze students."
    )

    assert result[0]["distance"] == 0.10
    assert result[0]["similarity"] == 0.90

    assert result[1]["id"] == 2
    assert result[1]["similarity"] == 0.80

    mock_search.search.assert_called_once()


def test_knowledge_retrieval_passes_filters(monkeypatch):
    """
    Verify that source_type and source_id filters are passed
    correctly to semantic search.
    """

    mock_search = Mock()

    mock_search.search.return_value = []

    monkeypatch.setattr(
        "app.services.knowledge_retrieval_service.semantic_search_service",
        mock_search,
    )

    service = KnowledgeRetrievalService()

    db = Mock()

    result = service.retrieve(
        db=db,
        query="student skills",
        limit=10,
        source_type="student",
        source_id=25,
    )

    assert result == []

    mock_search.search.assert_called_once_with(
        db=db,
        query="student skills",
        limit=10,
        source_type="student",
        source_id=25,
    )


def test_knowledge_retrieval_rejects_empty_query():
    """
    Verify that empty queries are rejected before searching.
    """

    service = KnowledgeRetrievalService()

    with pytest.raises(
        ValueError,
        match="Retrieval query cannot be empty",
    ):
        service.retrieve(
            db=Mock(),
            query="",
        )


def test_knowledge_retrieval_handles_zero_similarity():
    """
    Verify that similarity never becomes negative when the
    distance is greater than 1.
    """

    mock_search = Mock()

    mock_search.search.return_value = [
        {
            "id": 1,
            "content": "Test knowledge",
            "distance": 1.5,
            "source_type": "research",
            "source_id": 1,
            "metadata": {},
            "created_at": None,
        }
    ]

    monkeypatch = Mock()

    # Patch the module-level semantic search service.
    from app.services import knowledge_retrieval_service

    original_service = knowledge_retrieval_service.semantic_search_service

    try:
        knowledge_retrieval_service.semantic_search_service = mock_search

        service = KnowledgeRetrievalService()

        result = service.retrieve(
            db=Mock(),
            query="test knowledge",
        )

        assert len(result) == 1
        assert result[0]["similarity"] == 0.0

    finally:
        knowledge_retrieval_service.semantic_search_service = original_service