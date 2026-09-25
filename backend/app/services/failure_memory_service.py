from sqlalchemy.orm import Session

from app.models.failure_memory import FailureMemory
from app.schemas.failure_memory import (
    FailureMemoryCreate,
    FailureMemoryUpdate,
)


# ============================================================
# GET SINGLE FAILURE
# ============================================================

def get_failure(
    db: Session,
    failure_id: int,
):
    """
    Retrieve a single failure-memory record by ID.
    """

    return (
        db.query(FailureMemory)
        .filter(
            FailureMemory.id == failure_id
        )
        .first()
    )


# ============================================================
# GET SINGLE FAILURE MEMORY
# ============================================================

def get_failure_memory(
    db: Session,
    failure_id: int,
):
    """
    Backward-compatible alias for get_failure().
    """

    return get_failure(
        db,
        failure_id,
    )


# ============================================================
# GET PROJECT FAILURES
# ============================================================

def get_project_failures(
    db: Session,
    project_id: int,
):
    """
    Retrieve all failure-memory records
    associated with a project.
    """

    return (
        db.query(FailureMemory)
        .filter(
            FailureMemory.project_id == project_id
        )
        .all()
    )


# ============================================================
# GET FAILURES
# ============================================================

def get_failures(
    db: Session,
    project_id: int,
):
    """
    Retrieve all failures associated with a project.
    """

    return get_project_failures(
        db,
        project_id,
    )


# ============================================================
# CREATE FAILURE
# ============================================================

def create_failure(
    db: Session,
    failure_data: FailureMemoryCreate,
):
    """
    Create a new failure-memory record.
    """

    failure = FailureMemory(
        **failure_data.model_dump()
    )

    db.add(failure)
    db.commit()
    db.refresh(failure)

    return failure


# ============================================================
# CREATE FAILURE MEMORY
# ============================================================

def create_failure_memory(
    db: Session,
    failure_data: FailureMemoryCreate,
):
    """
    Backward-compatible alias for create_failure().
    """

    return create_failure(
        db,
        failure_data,
    )


# ============================================================
# UPDATE FAILURE
# ============================================================

def update_failure(
    db: Session,
    failure_id: int,
    failure_data: FailureMemoryUpdate,
):
    """
    Update an existing failure-memory record.
    """

    failure = get_failure(
        db,
        failure_id,
    )

    if not failure:
        return None

    update_data = failure_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(
            failure,
            field,
            value,
        )

    db.commit()
    db.refresh(failure)

    return failure


# ============================================================
# UPDATE FAILURE MEMORY
# ============================================================

def update_failure_memory(
    db: Session,
    failure_id: int,
    failure_data: FailureMemoryUpdate,
):
    """
    Backward-compatible alias for update_failure().
    """

    return update_failure(
        db,
        failure_id,
        failure_data,
    )


# ============================================================
# DELETE FAILURE
# ============================================================

def delete_failure(
    db: Session,
    failure_id: int,
):
    """
    Delete an existing failure-memory record.
    """

    failure = get_failure(
        db,
        failure_id,
    )

    if not failure:
        return None

    db.delete(failure)
    db.commit()

    return failure


# ============================================================
# DELETE FAILURE MEMORY
# ============================================================

def delete_failure_memory(
    db: Session,
    failure_id: int,
):
    """
    Backward-compatible alias for delete_failure().
    """

    return delete_failure(
        db,
        failure_id,
    )