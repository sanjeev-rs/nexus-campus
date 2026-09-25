from sqlalchemy.orm import Session

from app.models.project_evidence import ProjectEvidence
from app.schemas.project_evidence import ProjectEvidenceCreate


def create_project_evidence(
    db: Session,
    project_evidence_data: ProjectEvidenceCreate,
):
    project_evidence = ProjectEvidence(
        project_id=project_evidence_data.project_id,
        evidence_type=project_evidence_data.evidence_type,
        title=project_evidence_data.title,
        reference_url=project_evidence_data.reference_url,
        description=project_evidence_data.description,
    )

    db.add(project_evidence)
    db.commit()
    db.refresh(project_evidence)

    return project_evidence


def get_project_evidence_list(db: Session):
    return db.query(ProjectEvidence).all()


def get_project_evidence(
    db: Session,
    project_evidence_id: int,
):
    return (
        db.query(ProjectEvidence)
        .filter(ProjectEvidence.id == project_evidence_id)
        .first()
    )