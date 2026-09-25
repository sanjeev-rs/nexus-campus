from openai import OpenAI

from app.core.config import settings


class EmbeddingService:
    """
    Generates text embeddings for NEXUS.

    Current provider:
        OpenAI

    Current model:
        text-embedding-3-small

    Output dimensions:
        1536
    """

    MODEL = "text-embedding-3-small"

    def __init__(self):
        if not settings.OPENAI_API_KEY:
            raise RuntimeError(
                "OPENAI_API_KEY is not configured"
            )

        self.client = OpenAI(
            api_key=settings.OPENAI_API_KEY
        )

    def generate_embedding(
        self,
        text: str,
    ) -> list[float]:
        """
        Generate a 1536-dimensional embedding
        for a single piece of text.
        """

        if not text or not text.strip():
            raise ValueError(
                "Text cannot be empty"
            )

        response = self.client.embeddings.create(
            model=self.MODEL,
            input=text,
        )

        embedding = response.data[0].embedding

        if len(embedding) != 1536:
            raise RuntimeError(
                "Unexpected embedding dimension: "
                f"{len(embedding)}"
            )

        return embedding


embedding_service = EmbeddingService()