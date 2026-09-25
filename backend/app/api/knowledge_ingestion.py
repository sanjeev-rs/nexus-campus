from fastapi import (
    APIRouter,
    BackgroundTasks,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.core.roles import UserRole
from app.core.security import get_current_nexus_user
from app.database.connection import get_db

from app.services.knowledge_ingestion_status_service import (
    knowledge_ingestion_status_service,
)

from app.services.research_ingestion_processor import (
    research_ingestion_processor,
)


router = APIRouter(
    prefix="/knowledge-ingestion",
    tags=["Knowledge Ingestion"],
)


# =========================================================
# GET INGESTION STATUS
# =========================================================

@router.get("/file/{stored_file_id}")
def get_ingestion_status(
    stored_file_id: int,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Get the knowledge-ingestion status of a stored file.
    """

    ingestion = (
        knowledge_ingestion_status_service
        .get_by_file_id(
            db=db,
            stored_file_id=stored_file_id,
        )
    )

    if ingestion is None:
        raise HTTPException(
            status_code=404,
            detail="Knowledge ingestion record not found",
        )

    return {
        "id": ingestion.id,
        "stored_file_id": ingestion.stored_file_id,
        "status": ingestion.status,
        "error_message": ingestion.error_message,
        "chunk_count": ingestion.chunk_count,
        "started_at": ingestion.started_at,
        "completed_at": ingestion.completed_at,
        "created_at": ingestion.created_at,
        "updated_at": ingestion.updated_at,
    }


# =========================================================
# RETRY FAILED INGESTION
# =========================================================

@router.post("/file/{stored_file_id}/retry")
def retry_ingestion(
    stored_file_id: int,
    background_tasks: BackgroundTasks,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Retry a failed research knowledge-ingestion job.

    Only faculty, HOD, admin, and super admin users
    can trigger a retry.
    """

    allowed_roles = {
        UserRole.FACULTY.value,
        UserRole.HOD.value,
        UserRole.ADMIN.value,
        UserRole.SUPER_ADMIN.value,
    }

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "Only faculty, HOD, admins, and "
                "super admins can retry ingestion"
            ),
        )

    ingestion = (
        knowledge_ingestion_status_service
        .get_by_file_id(
            db=db,
            stored_file_id=stored_file_id,
        )
    )

    if ingestion is None:
        raise HTTPException(
            status_code=404,
            detail="Knowledge ingestion record not found",
        )

    if ingestion.status != "failed":
        raise HTTPException(
            status_code=400,
            detail=(
                "Only failed ingestion jobs "
                "can be retried"
            ),
        )

    ingestion.status = "pending"
    ingestion.error_message = None
    ingestion.started_at = None
    ingestion.completed_at = None

    db.commit()
    db.refresh(ingestion)

    background_tasks.add_task(
        research_ingestion_processor.process_by_file_id,
        stored_file_id,
    )

    return {
        "status": "retry_queued",
        "stored_file_id": stored_file_id,
        "ingestion_id": ingestion.id,
    }


# =========================================================
# FORCE REINDEX
# =========================================================

@router.post("/file/{stored_file_id}/reindex")
def reindex_file(
    stored_file_id: int,
    background_tasks: BackgroundTasks,
    current_user=Depends(get_current_nexus_user),
    db: Session = Depends(get_db),
):
    """
    Force a research document to be indexed again.

    Existing embeddings for the file are deleted
    before the document is processed again.

    Only faculty, HOD, admin, and super admin users
    can trigger re-indexing.
    """

    allowed_roles = {
        UserRole.FACULTY.value,
        UserRole.HOD.value,
        UserRole.ADMIN.value,
        UserRole.SUPER_ADMIN.value,
    }

    if current_user.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=(
                "Only faculty, HOD, admins, and "
                "super admins can reindex files"
            ),
        )

    ingestion = (
        knowledge_ingestion_status_service
        .get_by_file_id(
            db=db,
            stored_file_id=stored_file_id,
        )
    )

    if ingestion is None:
        raise HTTPException(
            status_code=404,
            detail="Knowledge ingestion record not found",
        )

    ingestion.status = "pending"
    ingestion.error_message = None
    ingestion.started_at = None
    ingestion.completed_at = None
    ingestion.chunk_count = 0

    db.commit()
    db.refresh(ingestion)

    background_tasks.add_task(
        research_ingestion_processor.process_research_file_force,
        stored_file_id,
    )

    return {
        "status": "reindex_queued",
        "stored_file_id": stored_file_id,
        "ingestion_id": ingestion.id,
    }