from datetime import datetime


class RAGContextService:
    """
    Builds structured context from retrieved NEXUS knowledge.

    This service does NOT call an LLM.

    It prepares retrieved knowledge so that a future
    AI/RAG layer can consume it safely.
    """

    def build_context(
        self,
        query: str,
        retrieved_results: list[dict],
    ) -> dict:
        """
        Build a structured RAG context package.

        Input:
            query
                Original user question.

            retrieved_results
                Results returned by the knowledge
                retrieval service.

        Output:
            Structured context containing:
                - query
                - context text
                - sources
                - result count
                - timestamp
        """

        if not query or not query.strip():
            raise ValueError(
                "RAG query cannot be empty"
            )

        if retrieved_results is None:
            retrieved_results = []

        context_parts = []
        sources = []

        for index, result in enumerate(
            retrieved_results,
            start=1,
        ):
            content = result.get(
                "content",
                "",
            )

            if not content:
                continue

            source_type = result.get(
                "source_type"
            )

            source_id = result.get(
                "source_id"
            )

            similarity = result.get(
                "similarity"
            )

            context_parts.append(
                (
                    f"[Source {index}]\n"
                    f"Source Type: {source_type}\n"
                    f"Source ID: {source_id}\n"
                    f"Similarity: {similarity}\n"
                    f"Content:\n{content}"
                )
            )

            sources.append(
                {
                    "id": result.get("id"),
                    "source_type": source_type,
                    "source_id": source_id,
                    "similarity": similarity,
                    "distance": result.get(
                        "distance"
                    ),
                    "metadata": result.get(
                        "metadata",
                        {},
                    ),
                }
            )

        context_text = "\n\n".join(
            context_parts
        )

        return {
            "query": query.strip(),
            "context": context_text,
            "sources": sources,
            "result_count": len(sources),
            "generated_at": datetime.utcnow(),
        }

    def build_prompt_context(
        self,
        query: str,
        retrieved_results: list[dict],
    ) -> str:
        """
        Build plain-text context suitable for a future
        LLM prompt.

        No LLM/API call is performed here.
        """

        context = self.build_context(
            query=query,
            retrieved_results=retrieved_results,
        )

        if not context["context"]:
            return (
                "No relevant NEXUS knowledge was found."
            )

        return (
            "NEXUS KNOWLEDGE CONTEXT\n\n"
            f"User Query:\n"
            f"{context['query']}\n\n"
            "Relevant Knowledge:\n\n"
            f"{context['context']}"
        )


rag_context_service = RAGContextService()