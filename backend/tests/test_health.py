from unittest.mock import Mock

from fastapi.testclient import TestClient

from app.main import app
from app.services.ai_service import AIProvider, AIService
from app.services.nexus_ai_service import NexusAIService
from app.services.rag_context_service import rag_context_service


client = TestClient(app)


# ============================================================
# SYSTEM TESTS
# ============================================================

def test_root():
    response = client.get("/")

    assert response.status_code == 200

    data = response.json()

    assert data["system"] == "NEXUS"
    assert data["status"] == "online"


def test_health():
    response = client.get("/health")

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "healthy"
    assert data["system"] == "NEXUS"


def test_database_health():
    response = client.get("/health/database")

    assert response.status_code == 200

    data = response.json()

    assert data["database"] == "connected"
    assert data["test_result"] == 1


# ============================================================
# API ROUTING TEST
# ============================================================
def test_api_v1_routes():
    response = client.post(
        "/api/v1/knowledge-retrieval/search",
        json={
            "query": "test",
            "limit": 1,
        },
    )

    # The endpoint is registered if FastAPI does not return 404.
    assert response.status_code != 404


# ============================================================
# RAG CONTEXT TESTS
# ============================================================

def test_rag_context_build():
    retrieved_results = [
        {
            "id": 1,
            "content": (
                "NEXUS helps students identify skills "
                "and project opportunities."
            ),
            "similarity": 0.92,
            "distance": 0.08,
            "source_type": "research",
            "source_id": 10,
            "metadata": {
                "title": "NEXUS Research Document"
            },
        },
        {
            "id": 2,
            "content": (
                "Skill Intelligence analyzes "
                "student skill evidence."
            ),
            "similarity": 0.87,
            "distance": 0.13,
            "source_type": "research",
            "source_id": 11,
            "metadata": {},
        },
    ]

    result = rag_context_service.build_context(
        query="How does NEXUS analyze student skills?",
        retrieved_results=retrieved_results,
    )

    assert result["query"] == (
        "How does NEXUS analyze student skills?"
    )

    assert result["result_count"] == 2
    assert len(result["sources"]) == 2

    assert "NEXUS helps students" in result["context"]
    assert "Skill Intelligence" in result["context"]


def test_rag_prompt_context():
    retrieved_results = [
        {
            "id": 1,
            "content": "NEXUS provides campus intelligence.",
            "similarity": 0.90,
            "distance": 0.10,
            "source_type": "research",
            "source_id": 1,
            "metadata": {},
        }
    ]

    result = rag_context_service.build_prompt_context(
        query="What does NEXUS provide?",
        retrieved_results=retrieved_results,
    )

    assert "NEXUS KNOWLEDGE CONTEXT" in result
    assert "What does NEXUS provide?" in result
    assert "NEXUS provides campus intelligence." in result


# ============================================================
# AI SERVICE TESTS
# ============================================================

class MockAIProvider(AIProvider):

    def generate_response(self, prompt: str) -> str:
        if not prompt or not prompt.strip():
            raise ValueError("AI prompt cannot be empty")

        return "NEXUS AI test response"


def test_ai_service():
    mock_provider = MockAIProvider()

    service = AIService(
        provider=mock_provider
    )

    result = service.generate_response(
        "Explain how NEXUS works."
    )

    assert result == "NEXUS AI test response"


def test_ai_service_rejects_empty_prompt():
    mock_provider = MockAIProvider()

    service = AIService(
        provider=mock_provider
    )

    try:
        service.generate_response("")
        assert False, "Expected ValueError"
    except ValueError as exc:
        assert str(exc) == "AI prompt cannot be empty"


# ============================================================
# NEXUS AI ORCHESTRATION TEST
# ============================================================

def test_nexus_ai_orchestration(monkeypatch):

    mock_retrieval = Mock()

    mock_retrieval.retrieve.return_value = [
        {
            "id": 1,
            "content": (
                "NEXUS uses Skill Intelligence "
                "to analyze student capabilities."
            ),
            "similarity": 0.95,
            "distance": 0.05,
            "source_type": "research",
            "source_id": 1,
            "metadata": {},
        }
    ]

    mock_ai = Mock()

    mock_ai.generate_response.return_value = (
        "NEXUS analyzes student capabilities "
        "using Skill Intelligence."
    )

    monkeypatch.setattr(
        "app.services.nexus_ai_service.knowledge_retrieval_service",
        mock_retrieval,
    )

    monkeypatch.setattr(
        "app.services.nexus_ai_service.ai_service",
        mock_ai,
    )

    service = NexusAIService()

    result = service.generate_answer(
        db=Mock(),
        query=(
            "How does NEXUS analyze "
            "student capabilities?"
        ),
        limit=5,
    )

    assert result["query"] == (
        "How does NEXUS analyze "
        "student capabilities?"
    )

    assert result["answer"] == (
        "NEXUS analyzes student capabilities "
        "using Skill Intelligence."
    )

    assert result["retrieved_count"] == 1
    assert len(result["sources"]) == 1

    mock_retrieval.retrieve.assert_called_once()
    mock_ai.generate_response.assert_called_once()