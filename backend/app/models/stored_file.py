from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class StoredFile(Base):
    __tablename__ = "stored_files"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    # Supabase Storage bucket
    bucket: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    # Full path inside the Supabase bucket
    file_path: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    # Original file name
    file_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    # MIME type
    content_type: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    # File size in bytes
    file_size: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    # Optional student ownership
    student_id: Mapped[int | None] = mapped_column(
        ForeignKey("students.id"),
        nullable=True,
    )

    # Optional project ownership
    project_id: Mapped[int | None] = mapped_column(
        ForeignKey("projects.id"),
        nullable=True,
    )

    # Optional project evidence relationship
    project_evidence_id: Mapped[int | None] = mapped_column(
        ForeignKey("project_evidence.id"),
        nullable=True,
    )

    # User who uploaded the file
    uploaded_by: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"),
        nullable=True,
    )

    # Creation timestamp
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )

    # Relationships
    student = relationship("Student")

    project = relationship("Project")

    project_evidence = relationship(
        "ProjectEvidence",
        back_populates="files",
    )

    uploader = relationship("User")