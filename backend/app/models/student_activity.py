from sqlalchemy import String, Integer, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class StudentActivity(Base):
    __tablename__ = "student_activities"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.id"),
        nullable=False,
    )

    activity_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    organization: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    start_date: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True,
    )

    end_date: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True,
    )

    reference_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    student = relationship("Student")