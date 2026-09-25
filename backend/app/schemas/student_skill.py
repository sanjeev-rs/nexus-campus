from pydantic import BaseModel


class StudentSkillCreate(BaseModel):
    student_id: int
    skill_id: int
    proficiency_level: float
    source: str = "self_assessed"
    verified: bool = False


class StudentSkillResponse(BaseModel):
    id: int
    student_id: int
    skill_id: int
    proficiency_level: float
    source: str
    verified: bool

    class Config:
        from_attributes = True