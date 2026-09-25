from pydantic import BaseModel


class ProjectEvidenceCreate(BaseModel):
    project_id: int
    evidence_type: str
    title: str
    reference_url: str | None = None
    description: str | None = None


class ProjectEvidenceResponse(BaseModel):
    id: int
    project_id: int
    evidence_type: str
    title: str
    reference_url: str | None
    description: str | None

    class Config:
        from_attributes = True