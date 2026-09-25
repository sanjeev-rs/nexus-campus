from pydantic import BaseModel, ConfigDict


class ProjectSkillDNAResponse(BaseModel):
    id: int
    skill_id: int
    proficiency_level: float | None = None

    model_config = ConfigDict(from_attributes=True)


class ProjectMemberDNAResponse(BaseModel):
    id: int
    student_id: int
    role: str

    model_config = ConfigDict(from_attributes=True)


class ProjectOutcomeDNAResponse(BaseModel):
    id: int
    outcome_type: str
    result: str | None = None
    score: float | None = None
    description: str | None = None

    model_config = ConfigDict(from_attributes=True)


class ProjectEvidenceDNAResponse(BaseModel):
    id: int
    evidence_type: str
    title: str
    reference_url: str | None = None
    description: str | None = None

    model_config = ConfigDict(from_attributes=True)


class ProjectDNAResponse(BaseModel):
    project_id: int

    skills: list[ProjectSkillDNAResponse]
    members: list[ProjectMemberDNAResponse]
    outcomes: list[ProjectOutcomeDNAResponse]
    evidence: list[ProjectEvidenceDNAResponse]