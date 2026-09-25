from sqlalchemy.orm import Session

from app.models.academic_year import AcademicYear
from app.schemas.academic_year import AcademicYearCreate


def create_academic_year(
    db: Session,
    academic_year_data: AcademicYearCreate,
):
    academic_year = AcademicYear(
        name=academic_year_data.name,
        is_active=academic_year_data.is_active,
    )

    db.add(academic_year)
    db.commit()
    db.refresh(academic_year)

    return academic_year


def get_academic_years(db: Session):
    return db.query(AcademicYear).all()


def get_academic_year(
    db: Session,
    academic_year_id: int,
):
    return (
        db.query(AcademicYear)
        .filter(AcademicYear.id == academic_year_id)
        .first()
    )