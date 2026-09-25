from pydantic import BaseModel, ConfigDict


# =========================================================
# ENROLLMENT BASE
# =========================================================

class EnrollmentBase(BaseModel):
    student_id: int
    course_id: int
    academic_year_id: int
    semester: int
    status: str = "active"


# =========================================================
# CREATE ENROLLMENT
# =========================================================

class EnrollmentCreate(EnrollmentBase):
    pass


# =========================================================
# UPDATE ENROLLMENT
# =========================================================

class EnrollmentUpdate(BaseModel):
    student_id: int | None = None
    course_id: int | None = None
    academic_year_id: int | None = None
    semester: int | None = None
    status: str | None = None


# =========================================================
# ENROLLMENT RESPONSE
# =========================================================

class EnrollmentResponse(EnrollmentBase):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )