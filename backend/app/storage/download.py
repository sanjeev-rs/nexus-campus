import tempfile
from pathlib import Path

from app.storage.client import supabase


class StorageDownloadService:
    """
    Downloads files from Supabase Storage to a
    temporary local file for processing.
    """

    def download_to_temp(
        self,
        bucket: str,
        file_path: str,
        file_name: str | None = None,
    ) -> str:
        """
        Download a Supabase Storage file into a
        temporary local file.

        Returns:
            Path to the temporary file.
        """

        if not bucket:
            raise ValueError(
                "Storage bucket cannot be empty"
            )

        if not file_path:
            raise ValueError(
                "Storage file path cannot be empty"
            )

        file_bytes = (
            supabase.storage
            .from_(bucket)
            .download(file_path)
        )

        if not file_bytes:
            raise ValueError(
                "Downloaded file is empty"
            )

        suffix = ""

        if file_name:
            suffix = Path(file_name).suffix.lower()

        temporary_file = tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix,
        )

        try:
            temporary_file.write(file_bytes)
            temporary_file.flush()
            return temporary_file.name

        finally:
            temporary_file.close()


storage_download_service = (
    StorageDownloadService()
)