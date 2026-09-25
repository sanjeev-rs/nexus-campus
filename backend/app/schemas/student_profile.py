from pydantic import BaseModel


class StudentProfileCreate(BaseModel):
    student_id: int
    bio: str | None = None
    interests: str | None = None
    career_objective: str | None = None
    github_url: str | None = None
    linkedin_url: str | None = None
    portfolio_url: str | None = None


class StudentProfileResponse(BaseModel):
    id: int
    student_id: int
    bio: str | None
    interests: str | None
    career_objective: str | None
    github_url: str | None
    linkedin_url: str | None
    portfolio_url: str | None

    class Config:
        from_attributes = True