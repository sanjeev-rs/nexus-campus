from sqlalchemy.orm import Session

from app.models.course import Course
from app.schemas.course import CourseCreate


def create_course(
    db: Session,
    course_data: CourseCreate
):
    course = Course(
        code=course_data.code,
        name=course_data.name,
        credits=course_data.credits,
        department_id=course_data.department_id,
    )

    db.add(course)
    db.commit()
    db.refresh(course)

    return course


def get_courses(db: Session):
    return db.query(Course).all()


def get_course(
    db: Session,
    course_id: int
):
    return (
        db.query(Course)
        .filter(Course.id == course_id)
        .first()
    )