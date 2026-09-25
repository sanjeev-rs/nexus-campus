from sqlalchemy import String, Integer, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class FailureMemory(Base):
    __tablename__ = "failure_memories"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    project_id: Mapped[int] = mapped_column(
        ForeignKey("projects.id"),
        nullable=False,
    )

    failure_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    failure_description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    root_cause: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    impact: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    resolution: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    lessons_learned: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    preventive_recommendation: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    evidence_reference: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    project = relationship("Project")