from pydantic import BaseModel


class OpportunityApplicationCreate(BaseModel):
    opportunity_id: int
    student_id: int
    application_date: str | None = None
    status: str = "applied"
    notes: str | None = None


class OpportunityApplicationResponse(BaseModel):
    id: int
    opportunity_id: int
    student_id: int
    application_date: str | None
    status: str
    notes: str | None

    class Config:
        from_attributes = True