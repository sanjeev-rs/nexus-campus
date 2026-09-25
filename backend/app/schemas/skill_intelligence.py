from pydantic import BaseModel, ConfigDict


class SkillEvidenceResponse(BaseModel):
    id: int
    evidence_type: str
    evidence_reference: str | None = None
    score: float | None = None
    description: str | None = None

    model_config = ConfigDict(from_attributes=True)


class StudentSkillIntelligenceResponse(BaseModel):
    skill_id: int
    skill_name: str | None = None

    proficiency_level: float
    source: str
    verified: bool

    evidence_count: int
    average_evidence_score: float | None = None

    evidence: list[SkillEvidenceResponse] = []