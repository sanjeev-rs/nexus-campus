from sqlalchemy import String, Integer, ForeignKey, Float, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class StudentTwin(Base):
    __tablename__ = "student_twins"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.id"),
        unique=True,
        nullable=False,
    )

    overall_score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    academic_score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    skill_score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    project_score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    engagement_score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    career_readiness_score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    strengths: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    skill_gaps: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    recommended_focus: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    profile_status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="initializing",
    )

    student = relationship("Student")