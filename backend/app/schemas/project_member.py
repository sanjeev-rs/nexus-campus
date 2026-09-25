from pydantic import BaseModel


class ProjectMemberCreate(BaseModel):
    project_id: int
    student_id: int
    role: str = "member"


class ProjectMemberResponse(BaseModel):
    id: int
    project_id: int
    student_id: int
    role: str

    class Config:
        from_attributes = True