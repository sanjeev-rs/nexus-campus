from sqlalchemy.orm import Session

from app.models.project_outcome import ProjectOutcome
from app.schemas.project_outcome import ProjectOutcomeCreate


def create_project_outcome(
    db: Session,
    project_outcome_data: ProjectOutcomeCreate,
):
    project_outcome = ProjectOutcome(
        project_id=project_outcome_data.project_id,
        outcome_type=project_outcome_data.outcome_type,
        result=project_outcome_data.result,
        score=project_outcome_data.score,
        description=project_outcome_data.description,
    )

    db.add(project_outcome)
    db.commit()
    db.refresh(project_outcome)

    return project_outcome


def get_project_outcomes(db: Session):
    return db.query(ProjectOutcome).all()


def get_project_outcome(
    db: Session,
    project_outcome_id: int,
):
    return (
        db.query(ProjectOutcome)
        .filter(ProjectOutcome.id == project_outcome_id)
        .first()
    )