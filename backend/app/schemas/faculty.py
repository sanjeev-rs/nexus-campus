from pydantic import BaseModel, EmailStr


class FacultyCreate(BaseModel):
    employee_id: str
    name: str
    email: EmailStr
    designation: str
    department_id: int


class FacultyResponse(BaseModel):
    id: int
    employee_id: str
    name: str
    email: EmailStr
    designation: str
    department_id: int

    class Config:
        from_attributes = True