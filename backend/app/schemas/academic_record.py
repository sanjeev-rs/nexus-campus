from pydantic import BaseModel


class AcademicRecordCreate(BaseModel):
    student_id: int
    course_id: int
    academic_year_id: int
    semester: int
    marks: float | None = None
    grade: str | None = None
    grade_point: float | None = None
    attendance_percentage: float | None = None


class AcademicRecordResponse(BaseModel):
    id: int
    student_id: int
    course_id: int
    academic_year_id: int
    semester: int
    marks: float | None
    grade: str | None
    grade_point: float | None
    attendance_percentage: float | None

    class Config:
        from_attributes = True