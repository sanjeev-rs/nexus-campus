from pydantic import BaseModel


class CourseCreate(BaseModel):
    code: str
    name: str
    credits: int
    department_id: int


class CourseResponse(BaseModel):
    id: int
    code: str
    name: str
    credits: int
    department_id: int

    class Config:
        from_attributes = True