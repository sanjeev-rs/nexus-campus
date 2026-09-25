from pydantic import BaseModel


class StudentActivityCreate(BaseModel):
    student_id: int
    activity_type: str
    title: str
    organization: str | None = None
    description: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    reference_url: str | None = None


class StudentActivityResponse(BaseModel):
    id: int
    student_id: int
    activity_type: str
    title: str
    organization: str | None
    description: str | None
    start_date: str | None
    end_date: str | None
    reference_url: str | None

    class Config:
        from_attributes = True