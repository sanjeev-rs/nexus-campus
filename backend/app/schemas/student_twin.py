from pydantic import BaseModel, ConfigDict


class StudentTwinBase(BaseModel):
    overall_score: float | None = None
    academic_score: float | None = None
    skill_score: float | None = None
    project_score: float | None = None
    engagement_score: float | None = None
    career_readiness_score: float | None = None

    strengths: str | None = None
    skill_gaps: str | None = None
    recommended_focus: str | None = None

    profile_status: str = "initializing"


class StudentTwinCreate(StudentTwinBase):
    student_id: int


class StudentTwinUpdate(BaseModel):
    overall_score: float | None = None
    academic_score: float | None = None
    skill_score: float | None = None
    project_score: float | None = None
    engagement_score: float | None = None
    career_readiness_score: float | None = None

    strengths: str | None = None
    skill_gaps: str | None = None
    recommended_focus: str | None = None

    profile_status: str | None = None


class StudentTwinResponse(StudentTwinBase):
    id: int
    student_id: int

    model_config = ConfigDict(from_attributes=True)