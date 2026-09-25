from pydantic import BaseModel


class ProjectCreate(BaseModel):
    title: str
    description: str | None = None
    project_type: str
    status: str = "ongoing"
    student_id: int


class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str | None
    project_type: str
    status: str
    student_id: int

    class Config:
        from_attributes = True