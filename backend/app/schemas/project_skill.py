from pydantic import BaseModel


class ProjectSkillCreate(BaseModel):
    project_id: int
    skill_id: int
    proficiency_level: float | None = None


class ProjectSkillResponse(BaseModel):
    id: int
    project_id: int
    skill_id: int
    proficiency_level: float | None

    class Config:
        from_attributes = True