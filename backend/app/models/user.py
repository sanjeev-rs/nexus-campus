from sqlalchemy import Boolean, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    supabase_user_id: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
        index=True,
    )

    role: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="student",
    )

    student_id: Mapped[int | None] = mapped_column(
        ForeignKey("students.id"),
        nullable=True,
        unique=True,
    )

    faculty_id: Mapped[int | None] = mapped_column(
        ForeignKey("faculty.id"),
        nullable=True,
        unique=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    student = relationship("Student")
    faculty = relationship("Faculty")