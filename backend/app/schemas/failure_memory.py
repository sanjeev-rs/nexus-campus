from pydantic import BaseModel, ConfigDict


class FailureMemoryBase(BaseModel):
    failure_type: str
    failure_description: str

    root_cause: str | None = None
    impact: str | None = None
    resolution: str | None = None
    lessons_learned: str | None = None
    preventive_recommendation: str | None = None
    evidence_reference: str | None = None


class FailureMemoryCreate(FailureMemoryBase):
    project_id: int


class FailureMemoryUpdate(BaseModel):
    failure_type: str | None = None
    failure_description: str | None = None

    root_cause: str | None = None
    impact: str | None = None
    resolution: str | None = None
    lessons_learned: str | None = None
    preventive_recommendation: str | None = None
    evidence_reference: str | None = None


class FailureMemoryResponse(FailureMemoryBase):
    id: int
    project_id: int

    model_config = ConfigDict(from_attributes=True)