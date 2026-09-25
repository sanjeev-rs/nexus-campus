from pydantic import BaseModel


class ProjectOutcomeCreate(BaseModel):
    project_id: int
    outcome_type: str
    result: str | None = None
    score: float | None = None
    description: str | None = None


class ProjectOutcomeResponse(BaseModel):
    id: int
    project_id: int
    outcome_type: str
    result: str | None
    score: float | None
    description: str | None

    class Config:
        from_attributes = True