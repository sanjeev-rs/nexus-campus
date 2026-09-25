from abc import ABC, abstractmethod

from app.core.config import settings


class AIProvider(ABC):
    """
    Base interface for all NEXUS AI providers.
    """

    @abstractmethod
    def generate_response(
        self,
        prompt: str,
    ) -> str:
        """
        Generate an AI response from a prompt.
        """
        raise NotImplementedError


class OpenAIProvider(AIProvider):
    """
    OpenAI implementation of the NEXUS AI provider.

    The provider is configured through NEXUS settings.

    No API request is made when this class is created.
    """

    def __init__(
        self,
        model: str | None = None,
    ):
        self.model = (
            model
            or settings.AI_MODEL
        )

        if not settings.OPENAI_API_KEY:
            raise RuntimeError(
                "OPENAI_API_KEY is not configured"
            )

        self._client = None

    @property
    def client(self):
        """
        Lazily create the OpenAI client.

        This prevents an OpenAI client from being
        initialized until an actual AI request is made.
        """

        if self._client is None:

            from openai import OpenAI

            self._client = OpenAI(
                api_key=settings.OPENAI_API_KEY
            )

        return self._client

    def generate_response(
        self,
        prompt: str,
    ) -> str:
        """
        Generate an AI response using OpenAI.
        """

        if not prompt or not prompt.strip():
            raise ValueError(
                "AI prompt cannot be empty"
            )

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are NEXUS, an AI-powered "
                        "campus intelligence system. "
                        "Answer using the provided "
                        "NEXUS knowledge context."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt.strip(),
                },
            ],
        )

        answer = response.choices[0].message.content

        if not answer:
            raise RuntimeError(
                "AI provider returned an empty response"
            )

        return answer.strip()


class AIService:
    """
    Central AI service for NEXUS.

    Selects the configured AI provider.
    """

    def __init__(
        self,
        provider: AIProvider,
    ):
        self.provider = provider

    def generate_response(
        self,
        prompt: str,
    ) -> str:
        """
        Generate a response using the configured
        AI provider.
        """

        if not prompt or not prompt.strip():
            raise ValueError(
                "AI prompt cannot be empty"
            )

        return self.provider.generate_response(
            prompt.strip()
        )


def create_ai_provider() -> AIProvider:
    """
    Create the AI provider configured for NEXUS.
    """

    provider = settings.AI_PROVIDER.lower().strip()

    if provider == "openai":
        return OpenAIProvider()

    raise ValueError(
        f"Unsupported AI provider: {settings.AI_PROVIDER}"
    )


ai_service = AIService(
    provider=create_ai_provider()
)