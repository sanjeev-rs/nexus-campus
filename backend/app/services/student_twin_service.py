from sqlalchemy.orm import Session

from app.models.student_twin import StudentTwin
from app.schemas.student_twin import (
    StudentTwinCreate,
    StudentTwinUpdate,
)


def get_student_twin(
    db: Session,
    student_id: int,
):
    return (
        db.query(StudentTwin)
        .filter(StudentTwin.student_id == student_id)
        .first()
    )


def create_student_twin(
    db: Session,
    twin_data: StudentTwinCreate,
):
    existing_twin = get_student_twin(
        db,
        twin_data.student_id,
    )

    if existing_twin:
        return existing_twin

    twin = StudentTwin(
        **twin_data.model_dump()
    )

    db.add(twin)
    db.commit()
    db.refresh(twin)

    return twin


def update_student_twin(
    db: Session,
    student_id: int,
    twin_data: StudentTwinUpdate,
):
    twin = get_student_twin(
        db,
        student_id,
    )

    if not twin:
        return None

    update_data = twin_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(twin, field, value)

    db.commit()
    db.refresh(twin)

    return twin


def delete_student_twin(
    db: Session,
    student_id: int,
):
    twin = get_student_twin(
        db,
        student_id,
    )

    if not twin:
        return None

    db.delete(twin)
    db.commit()

    return twin