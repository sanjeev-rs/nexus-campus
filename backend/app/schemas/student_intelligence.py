from pydantic import BaseModel


class StudentIntelligenceResponse(BaseModel):
    student_id: int

    academic_records: list
    skills: list
    projects: list
    activities: list

    profile: dict | None = None