from sqlalchemy.orm import Session

from app.models.student import Student
from app.schemas.student import StudentCreate


def create_student(
    db: Session,
    student_data: StudentCreate
):
    student = Student(
        register_number=student_data.register_number,
        name=student_data.name,
        email=student_data.email,
        department_id=student_data.department_id,
        year=student_data.year,
    )

    db.add(student)
    db.commit()
    db.refresh(student)

    return student


def get_students(db: Session):
    return db.query(Student).all()


def get_student(
    db: Session,
    student_id: int
):
    return (
        db.query(Student)
        .filter(Student.id == student_id)
        .first()
    )