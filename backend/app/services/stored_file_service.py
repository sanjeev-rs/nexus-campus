from sqlalchemy.orm import Session

from app.models.stored_file import StoredFile
from app.schemas.stored_file import StoredFileCreate
from app.services.knowledge_ingestion_status_service import (
    knowledge_ingestion_status_service,
)


def get_stored_file(
    db: Session,
    file_id: int,
):
    return (
        db.query(StoredFile)
        .filter(StoredFile.id == file_id)
        .first()
    )


def get_stored_files(
    db: Session,
    skip: int = 0,
    limit: int = 100,
):
    return (
        db.query(StoredFile)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_student_files(
    db: Session,
    student_id: int,
):
    return (
        db.query(StoredFile)
        .filter(
            StoredFile.student_id == student_id
        )
        .all()
    )


def get_project_files(
    db: Session,
    project_id: int,
):
    return (
        db.query(StoredFile)
        .filter(
            StoredFile.project_id == project_id
        )
        .all()
    )


def get_project_evidence_files(
    db: Session,
    project_evidence_id: int,
):
    return (
        db.query(StoredFile)
        .filter(
            StoredFile.project_evidence_id
            == project_evidence_id
        )
        .all()
    )


def create_stored_file(
    db: Session,
    file_data: StoredFileCreate,
):
    stored_file = StoredFile(
        **file_data.model_dump()
    )

    db.add(stored_file)
    db.commit()
    db.refresh(stored_file)

    return stored_file


def create_research_stored_file(
    db: Session,
    file_data: StoredFileCreate,
):
    """
    Create a StoredFile record specifically for
    a research document and initialize its
    knowledge-ingestion status.

    The actual document processing is NOT started here.
    """

    stored_file = StoredFile(
        **file_data.model_dump()
    )

    db.add(stored_file)
    db.commit()
    db.refresh(stored_file)

    knowledge_ingestion_status_service.create_pending(
        db=db,
        stored_file_id=stored_file.id,
    )

    return stored_file


def delete_stored_file(
    db: Session,
    file_id: int,
):
    stored_file = get_stored_file(
        db,
        file_id,
    )

    if stored_file is None:
        return None

    db.delete(stored_file)
    db.commit()

    return stored_file