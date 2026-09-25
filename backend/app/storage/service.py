from pathlib import Path

from app.storage.client import supabase
from app.storage.config import (
    ALLOWED_CONTENT_TYPES,
    ALLOWED_EXTENSIONS,
    MAX_FILE_SIZE,
)


class StorageService:
    """
    Centralized Supabase Storage service for NEXUS.
    """

    # =====================================================
    # VALIDATE FILE
    # =====================================================

    def validate_file(
        self,
        file_name: str,
        file_size: int,
        content_type: str | None,
    ):
        """
        Validate uploaded files before sending them
        to Supabase Storage.
        """

        # -------------------------------------------------
        # FILE NAME
        # -------------------------------------------------

        if not file_name:
            raise ValueError(
                "File name is required"
            )

        # -------------------------------------------------
        # FILE SIZE
        # -------------------------------------------------

        if file_size <= 0:
            raise ValueError(
                "File cannot be empty"
            )

        if file_size > MAX_FILE_SIZE:
            raise ValueError(
                "File size exceeds the 50 MB limit"
            )

        # -------------------------------------------------
        # FILE EXTENSION
        # -------------------------------------------------

        extension = Path(file_name).suffix.lower()

        if extension not in ALLOWED_EXTENSIONS:
            raise ValueError(
                f"File type '{extension}' is not allowed"
            )

        # -------------------------------------------------
        # MIME TYPE
        # -------------------------------------------------

        if content_type:
            if content_type not in ALLOWED_CONTENT_TYPES:
                raise ValueError(
                    f"Content type '{content_type}' is not allowed"
                )

        return True

    # =====================================================
    # UPLOAD
    # =====================================================

    def upload_file(
        self,
        bucket: str,
        file_path: str,
        file_data: bytes,
        content_type: str,
    ):
        """
        Upload a validated file to Supabase Storage.
        """

        self.validate_file(
            file_name=Path(file_path).name,
            file_size=len(file_data),
            content_type=content_type,
        )

        return supabase.storage.from_(bucket).upload(
            path=file_path,
            file=file_data,
            file_options={
                "content-type": content_type,
                "upsert": False,
            },
        )

    # =====================================================
    # DOWNLOAD
    # =====================================================

    def download_file(
        self,
        bucket: str,
        file_path: str,
    ):
        """
        Download a file from Supabase Storage.
        """

        return supabase.storage.from_(bucket).download(
            file_path
        )

    # =====================================================
    # DELETE
    # =====================================================

    def delete_file(
        self,
        bucket: str,
        file_path: str,
    ):
        """
        Delete a file from Supabase Storage.
        """

        return supabase.storage.from_(bucket).remove(
            [file_path]
        )

    # =====================================================
    # SIGNED URL
    # =====================================================

    def create_signed_url(
        self,
        bucket: str,
        file_path: str,
        expires_in: int = 3600,
    ):
        """
        Create a temporary signed URL for a private file.
        """

        return supabase.storage.from_(bucket).create_signed_url(
            path=file_path,
            expires_in=expires_in,
        )

    # =====================================================
    # PUBLIC URL
    # =====================================================

    def get_public_url(
        self,
        bucket: str,
        file_path: str,
    ):
        """
        Get the public URL of a file.

        Use only for public buckets.
        """

        return supabase.storage.from_(bucket).get_public_url(
            file_path
        )


storage_service = StorageService()