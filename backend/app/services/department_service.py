from sqlalchemy.orm import Session

from app.models.department import Department
from app.schemas.department import DepartmentCreate


def create_department(
    db: Session,
    department_data: DepartmentCreate
):
    department = Department(
        code=department_data.code,
        name=department_data.name,
        description=department_data.description,
    )

    db.add(department)
    db.commit()
    db.refresh(department)

    return department


def get_departments(db: Session):
    return db.query(Department).all()


def get_department(
    db: Session,
    department_id: int
):
    return (
        db.query(Department)
        .filter(Department.id == department_id)
        .first()
    )