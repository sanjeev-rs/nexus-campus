from pydantic import BaseModel, ConfigDict, field_validator

from app.core.roles import UserRole


# ============================================================
# USER RESPONSE
# ============================================================

class UserResponse(BaseModel):
    """
    Public NEXUS user representation.
    """

    id: int
    supabase_user_id: str
    role: str
    student_id: int | None = None
    faculty_id: int | None = None
    is_active: bool

    model_config = ConfigDict(
        from_attributes=True
    )


# ============================================================
# USER ROLE UPDATE
# ============================================================

class UserRoleUpdate(BaseModel):
    """
    Schema used when an authorized administrator
    changes a user's NEXUS role.
    """

    role: str

    @field_validator("role")
    @classmethod
    def validate_role(cls, value: str) -> str:
        valid_roles = {
            role.value
            for role in UserRole
        }

        if value not in valid_roles:
            raise ValueError(
                f"Invalid NEXUS role: {value}"
            )

        return value


# ============================================================
# USER MAPPING UPDATE
# ============================================================

class UserMappingUpdate(BaseModel):
    """
    Map a NEXUS user to either a Student
    or a Faculty record.

    A user cannot be mapped to both.
    """

    student_id: int | None = None
    faculty_id: int | None = None

    @field_validator("faculty_id")
    @classmethod
    def validate_mapping(cls, value, info):
        student_id = info.data.get("student_id")

        if value is not None and student_id is not None:
            raise ValueError(
                "A NEXUS user cannot be mapped to "
                "both a student and a faculty member"
            )

        return value