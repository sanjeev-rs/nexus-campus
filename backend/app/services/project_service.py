from sqlalchemy.orm import Session

from app.models.project import Project
from app.schemas.project import ProjectCreate


def create_project(
    db: Session,
    project_data: ProjectCreate,
):
    project = Project(
        title=project_data.title,
        description=project_data.description,
        project_type=project_data.project_type,
        status=project_data.status,
        student_id=project_data.student_id,
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


def get_projects(db: Session):
    return db.query(Project).all()


def get_project(
    db: Session,
    project_id: int,
):
    return (
        db.query(Project)
        .filter(Project.id == project_id)
        .first()
    )