from sqlalchemy import String, Integer, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class AcademicRecord(Base):
    __tablename__ = "academic_records"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.id"),
        nullable=False,
    )

    course_id: Mapped[int] = mapped_column(
        ForeignKey("courses.id"),
        nullable=False,
    )

    academic_year_id: Mapped[int] = mapped_column(
        ForeignKey("academic_years.id"),
        nullable=False,
    )

    semester: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    marks: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    grade: Mapped[str | None] = mapped_column(
        String(5),
        nullable=True,
    )

    grade_point: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    attendance_percentage: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    student = relationship("Student")
    course = relationship("Course")
    academic_year = relationship("AcademicYear")