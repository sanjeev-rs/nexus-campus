from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.services.research_knowledge_service import (
    research_knowledge_service,
)


router = APIRouter(
    prefix="/research-knowledge",
    tags=["Research Knowledge"],
)


@router.post("/ingest/{stored_file_id}")
def ingest_research_file(
    stored_file_id: int,
    force_reindex: bool = False,
    db: Session = Depends(get_db),
):
    """
    Ingest a research file into the NEXUS
    knowledge pipeline.

    Pipeline:

        Supabase Storage
            ↓
        Text Extraction
            ↓
        Chunking
            ↓
        Embeddings
            ↓
        pgvector

    If the file has already been indexed:

        force_reindex=False
            → Existing knowledge is preserved.

        force_reindex=True
            → Existing embeddings are deleted and
              the document is indexed again.
    """

    try:
        result = (
            research_knowledge_service
            .ingest_research_file_by_id(
                db=db,
                stored_file_id=stored_file_id,
                force_reindex=force_reindex,
            )
        )

        if result is None:
            raise HTTPException(
                status_code=404,
                detail="Stored file not found",
            )

        return result

    except HTTPException:
        raise

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )