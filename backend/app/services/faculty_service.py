from sqlalchemy.orm import Session

from app.models.faculty import Faculty
from app.schemas.faculty import FacultyCreate


def create_faculty(
    db: Session,
    faculty_data: FacultyCreate
):
    faculty = Faculty(
        employee_id=faculty_data.employee_id,
        name=faculty_data.name,
        email=faculty_data.email,
        designation=faculty_data.designation,
        department_id=faculty_data.department_id,
    )

    db.add(faculty)
    db.commit()
    db.refresh(faculty)

    return faculty


def get_faculty_members(db: Session):
    return db.query(Faculty).all()


def get_faculty(
    db: Session,
    faculty_id: int
):
    return (
        db.query(Faculty)
        .filter(Faculty.id == faculty_id)
        .first()
    )