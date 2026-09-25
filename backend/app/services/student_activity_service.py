from sqlalchemy.orm import Session

from app.models.student_activity import StudentActivity
from app.schemas.student_activity import StudentActivityCreate


def create_student_activity(
    db: Session,
    student_activity_data: StudentActivityCreate,
):
    student_activity = StudentActivity(
        student_id=student_activity_data.student_id,
        activity_type=student_activity_data.activity_type,
        title=student_activity_data.title,
        organization=student_activity_data.organization,
        description=student_activity_data.description,
        start_date=student_activity_data.start_date,
        end_date=student_activity_data.end_date,
        reference_url=student_activity_data.reference_url,
    )

    db.add(student_activity)
    db.commit()
    db.refresh(student_activity)

    return student_activity


def get_student_activities(db: Session):
    return db.query(StudentActivity).all()


def get_student_activity(
    db: Session,
    student_activity_id: int,
):
    return (
        db.query(StudentActivity)
        .filter(StudentActivity.id == student_activity_id)
        .first()
    )