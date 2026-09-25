from sqlalchemy.orm import Session

from app.models.project_member import ProjectMember
from app.schemas.project_member import ProjectMemberCreate


def create_project_member(
    db: Session,
    project_member_data: ProjectMemberCreate,
):
    project_member = ProjectMember(
        project_id=project_member_data.project_id,
        student_id=project_member_data.student_id,
        role=project_member_data.role,
    )

    db.add(project_member)
    db.commit()
    db.refresh(project_member)

    return project_member


def get_project_members(db: Session):
    return db.query(ProjectMember).all()


def get_project_member(
    db: Session,
    project_member_id: int,
):
    return (
        db.query(ProjectMember)
        .filter(ProjectMember.id == project_member_id)
        .first()
    )