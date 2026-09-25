from sqlalchemy import Integer, ForeignKey, Float, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class OpportunitySkill(Base):
    __tablename__ = "opportunity_skills"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    opportunity_id: Mapped[int] = mapped_column(
        ForeignKey("opportunities.id"),
        nullable=False,
    )

    skill_id: Mapped[int] = mapped_column(
        ForeignKey("skills.id"),
        nullable=False,
    )

    importance: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="required",
    )

    minimum_proficiency: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    opportunity = relationship("Opportunity")

    skill = relationship("Skill")