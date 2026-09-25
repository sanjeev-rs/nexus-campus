from sqlalchemy.orm import Session

from app.models.student_profile import StudentProfile
from app.schemas.student_profile import StudentProfileCreate


def create_student_profile(
    db: Session,
    student_profile_data: StudentProfileCreate,
):
    student_profile = StudentProfile(
        student_id=student_profile_data.student_id,
        bio=student_profile_data.bio,
        interests=student_profile_data.interests,
        career_objective=student_profile_data.career_objective,
        github_url=student_profile_data.github_url,
        linkedin_url=student_profile_data.linkedin_url,
        portfolio_url=student_profile_data.portfolio_url,
    )

    db.add(student_profile)
    db.commit()
    db.refresh(student_profile)

    return student_profile


def get_student_profiles(db: Session):
    return db.query(StudentProfile).all()


def get_student_profile(
    db: Session,
    student_profile_id: int,
):
    return (
        db.query(StudentProfile)
        .filter(StudentProfile.id == student_profile_id)
        .first()
    )