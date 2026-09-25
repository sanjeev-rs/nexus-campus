from sqlalchemy.orm import Session

from backend.app.models.enrollments import Enrollment
from backend.app.schemas.enrollments import (
    EnrollmentCreate,
    EnrollmentUpdate,
)


# =========================================================
# GET ALL ENROLLMENTS
# =========================================================

def get_enrollments(
    db: Session,
):
    return (
        db.query(Enrollment)
        .order_by(Enrollment.id.desc())
        .all()
    )


# =========================================================
# GET SINGLE ENROLLMENT
# =========================================================

def get_enrollment(
    db: Session,
    enrollment_id: int,
):
    return (
        db.query(Enrollment)
        .filter(
            Enrollment.id == enrollment_id
        )
        .first()
    )


# =========================================================
# GET STUDENT ENROLLMENTS
# =========================================================

def get_student_enrollments(
    db: Session,
    student_id: int,
):
    return (
        db.query(Enrollment)
        .filter(
            Enrollment.student_id == student_id
        )
        .order_by(Enrollment.id.desc())
        .all()
    )


# =========================================================
# CREATE ENROLLMENT
# =========================================================

def create_enrollment(
    db: Session,
    enrollment_data: EnrollmentCreate,
):
    enrollment = Enrollment(
        **enrollment_data.model_dump()
    )

    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)

    return enrollment


# =========================================================
# UPDATE ENROLLMENT
# =========================================================

def update_enrollment(
    db: Session,
    enrollment_id: int,
    enrollment_data: EnrollmentUpdate,
):
    enrollment = get_enrollment(
        db,
        enrollment_id,
    )

    if not enrollment:
        return None

    update_data = enrollment_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(
            enrollment,
            field,
            value,
        )

    db.commit()
    db.refresh(enrollment)

    return enrollment


# =========================================================
# DELETE ENROLLMENT
# =========================================================

def delete_enrollment(
    db: Session,
    enrollment_id: int,
):
    enrollment = get_enrollment(
        db,
        enrollment_id,
    )

    if not enrollment:
        return None

    db.delete(enrollment)
    db.commit()

    return enrollment