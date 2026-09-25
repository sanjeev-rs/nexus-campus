from pydantic import BaseModel, ConfigDict


# =========================================================
# OPPORTUNITY BASE
# =========================================================

class OpportunityBase(BaseModel):
    title: str
    opportunity_type: str
    organization: str
    description: str | None = None
    eligibility: str | None = None
    location: str | None = None
    application_url: str | None = None
    status: str = "active"
    created_by: int | None = None


# =========================================================
# CREATE OPPORTUNITY
# =========================================================

class OpportunityCreate(OpportunityBase):
    pass


# =========================================================
# UPDATE OPPORTUNITY
# =========================================================

class OpportunityUpdate(BaseModel):
    title: str | None = None
    opportunity_type: str | None = None
    organization: str | None = None
    description: str | None = None
    eligibility: str | None = None
    location: str | None = None
    application_url: str | None = None
    status: str | None = None
    created_by: int | None = None


# =========================================================
# OPPORTUNITY RESPONSE
# =========================================================

class OpportunityResponse(OpportunityBase):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )