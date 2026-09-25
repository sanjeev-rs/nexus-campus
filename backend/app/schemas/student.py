from pydantic import BaseModel, EmailStr


class StudentCreate(BaseModel):
    register_number: str
    name: str
    email: EmailStr
    department_id: int
    year: int


class StudentResponse(BaseModel):
    id: int
    register_number: str
    name: str
    email: EmailStr
    department_id: int
    year: int

    class Config:
        from_attributes = True