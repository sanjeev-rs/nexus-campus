from sqlalchemy import String, Integer, ForeignKey, Float, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class ProjectOutcome(Base):
    __tablename__ = "project_outcomes"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    project_id: Mapped[int] = mapped_column(
        ForeignKey("projects.id"),
        nullable=False,
    )

    outcome_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    result: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    project = relationship("Project")