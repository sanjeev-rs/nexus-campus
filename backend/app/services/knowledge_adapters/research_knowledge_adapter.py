from app.models.stored_file import StoredFile


class ResearchKnowledgeAdapter:
    """
    Converts research-file metadata into
    natural-language knowledge.

    Note:
        This adapter handles file metadata only.
        Actual document text extraction will be handled
        by a separate document extraction service.
    """

    def build_research_knowledge(
        self,
        stored_file: StoredFile,
    ) -> str:
        """
        Convert a research StoredFile record into
        a natural-language knowledge representation.
        """

        parts = [
            f"Research file name: {stored_file.file_name}.",
            f"Storage bucket: {stored_file.bucket}.",
            f"File path: {stored_file.file_path}.",
        ]

        if stored_file.content_type:
            parts.append(
                f"Content type: {stored_file.content_type}."
            )

        if stored_file.file_size is not None:
            parts.append(
                f"File size in bytes: {stored_file.file_size}."
            )

        if stored_file.project_id is not None:
            parts.append(
                f"Associated project ID: "
                f"{stored_file.project_id}."
            )

        if stored_file.student_id is not None:
            parts.append(
                f"Associated student ID: "
                f"{stored_file.student_id}."
            )

        if stored_file.project_evidence_id is not None:
            parts.append(
                "Associated project evidence ID: "
                f"{stored_file.project_evidence_id}."
            )

        if stored_file.uploaded_by is not None:
            parts.append(
                f"Uploaded by user ID: "
                f"{stored_file.uploaded_by}."
            )

        return " ".join(parts)


research_knowledge_adapter = (
    ResearchKnowledgeAdapter()
)