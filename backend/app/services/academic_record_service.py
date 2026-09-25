from sqlalchemy.orm import Session

from app.models.academic_record import AcademicRecord
from app.schemas.academic_record import AcademicRecordCreate


def create_academic_record(
    db: Session,
    academic_record_data: AcademicRecordCreate,
):
    academic_record = AcademicRecord(
        student_id=academic_record_data.student_id,
        course_id=academic_record_data.course_id,
        academic_year_id=academic_record_data.academic_year_id,
        semester=academic_record_data.semester,
        marks=academic_record_data.marks,
        grade=academic_record_data.grade,
        grade_point=academic_record_data.grade_point,
        attendance_percentage=academic_record_data.attendance_percentage,
    )

    db.add(academic_record)
    db.commit()
    db.refresh(academic_record)

    return academic_record


def get_academic_records(db: Session):
    return db.query(AcademicRecord).all()


def get_academic_record(
    db: Session,
    academic_record_id: int,
):
    return (
        db.query(AcademicRecord)
        .filter(AcademicRecord.id == academic_record_id)
        .first()
    )