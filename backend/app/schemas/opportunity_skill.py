from pydantic import BaseModel


class OpportunitySkillCreate(BaseModel):
    opportunity_id: int
    skill_id: int
    importance: str = "required"
    minimum_proficiency: float | None = None


class OpportunitySkillResponse(BaseModel):
    id: int
    opportunity_id: int
    skill_id: int
    importance: str
    minimum_proficiency: float | None

    class Config:
        from_attributes = True