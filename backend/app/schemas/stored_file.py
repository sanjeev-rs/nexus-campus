from datetime import datetime

from pydantic import BaseModel, ConfigDict


class StoredFileBase(BaseModel):
    bucket: str
    file_path: str
    file_name: str
    content_type: str | None = None
    file_size: int | None = None


class StoredFileCreate(StoredFileBase):
    student_id: int | None = None
    project_id: int | None = None
    project_evidence_id: int | None = None
    uploaded_by: int | None = None


class StoredFileResponse(StoredFileBase):
    id: int
    student_id: int | None = None
    project_id: int | None = None
    project_evidence_id: int | None = None
    uploaded_by: int | None = None
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )