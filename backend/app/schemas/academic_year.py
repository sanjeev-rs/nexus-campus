from pydantic import BaseModel


class AcademicYearCreate(BaseModel):
    name: str
    is_active: bool = True


class AcademicYearResponse(BaseModel):
    id: int
    name: str
    is_active: bool

    class Config:
        from_attributes = True