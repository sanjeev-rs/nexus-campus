class KnowledgeChunkingService:
    """
    Splits knowledge content into smaller overlapping chunks
    before embedding and vector storage.
    """

    def __init__(
        self,
        chunk_size: int = 1000,
        chunk_overlap: int = 150,
    ):
        if chunk_size <= 0:
            raise ValueError(
                "chunk_size must be greater than 0"
            )

        if chunk_overlap < 0:
            raise ValueError(
                "chunk_overlap cannot be negative"
            )

        if chunk_overlap >= chunk_size:
            raise ValueError(
                "chunk_overlap must be smaller than chunk_size"
            )

        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    def chunk_text(
        self,
        text: str,
    ) -> list[str]:
        """
        Split text into overlapping chunks.

        The service attempts to split on natural boundaries
        such as paragraphs and sentences before falling back
        to character-based splitting.
        """

        if not text or not text.strip():
            raise ValueError(
                "Text cannot be empty"
            )

        text = text.strip()

        if len(text) <= self.chunk_size:
            return [text]

        chunks = []

        start = 0
        text_length = len(text)

        while start < text_length:
            end = min(
                start + self.chunk_size,
                text_length,
            )

            chunk = text[start:end].strip()

            if chunk:
                chunks.append(chunk)

            if end >= text_length:
                break

            next_start = end - self.chunk_overlap

            if next_start <= start:
                next_start = end

            start = next_start

        return chunks

    def chunk_with_metadata(
        self,
        text: str,
        source_type: str | None = None,
        source_id: int | None = None,
        metadata: dict | None = None,
    ) -> list[dict]:
        """
        Split text and attach source metadata to every chunk.
        """

        chunks = self.chunk_text(text)

        results = []

        for index, chunk in enumerate(chunks):
            chunk_metadata = dict(metadata or {})

            chunk_metadata.update(
                {
                    "chunk_index": index,
                    "total_chunks": len(chunks),
                }
            )

            if source_type is not None:
                chunk_metadata["source_type"] = source_type

            if source_id is not None:
                chunk_metadata["source_id"] = source_id

            results.append(
                {
                    "content": chunk,
                    "metadata": chunk_metadata,
                }
            )

        return results


knowledge_chunking_service = KnowledgeChunkingService()