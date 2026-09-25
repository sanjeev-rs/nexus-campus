from pydantic import BaseModel


class DepartmentCreate(BaseModel):
    code: str
    name: str
    description: str | None = None


class DepartmentResponse(BaseModel):
    id: int
    code: str
    name: str
    description: str | None = None

    class Config:
        from_attributes = True