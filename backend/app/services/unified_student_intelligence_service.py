from typing import Any

from sqlalchemy.orm import Session

from app.models.student import Student

from app.services.student_twin_engine import generate_student_twin

from app.services.neo4j_student_intelligence_service import (
    neo4j_student_intelligence_service,
)


class UnifiedStudentIntelligenceService:
    """
    Unified intelligence layer for NEXUS.

    Combines:

        PostgreSQL Student Twin
        +
        Neo4j relationship intelligence
        +
        Opportunity matching

    This service does not replace the existing
    Student Twin or Neo4j intelligence services.
    It orchestrates them into one response.
    """

    def get_student_intelligence(
        self,
        db: Session,
        student_id: int,
    ) -> dict[str, Any] | None:

        # =====================================================
        # 1. VERIFY STUDENT
        # =====================================================

        student = (
            db.query(Student)
            .filter(Student.id == student_id)
            .first()
        )

        if not student:
            return None

        # =====================================================
        # 2. GENERATE / REFRESH STUDENT TWIN
        # =====================================================

        student_twin = generate_student_twin(
            db,
            student_id,
        )

        # =====================================================
        # 3. GET NEO4J STUDENT PROFILE
        # =====================================================

        graph_profile = (
            neo4j_student_intelligence_service
            .get_student_profile(student_id)
        )

        # =====================================================
        # 4. GET OPPORTUNITY INTELLIGENCE
        # =====================================================

        opportunities = (
            neo4j_student_intelligence_service
            .get_student_opportunity_matches(
                student_id
            )
        )

        # =====================================================
        # 5. EXTRACT SKILL GAPS
        # =====================================================

        skill_gaps = []

        for opportunity in opportunities:

            for gap in opportunity.get(
                "skill_gaps",
                [],
            ):

                skill_gaps.append(
                    {
                        "opportunity_id":
                            opportunity[
                                "opportunity_id"
                            ],

                        "opportunity_title":
                            opportunity[
                                "opportunity_title"
                            ],

                        "skill_id":
                            gap["skill_id"],

                        "skill_name":
                            gap["skill_name"],

                        "required_proficiency":
                            gap[
                                "required_proficiency"
                            ],

                        "importance":
                            gap["importance"],

                        "student_proficiency":
                            gap[
                                "student_proficiency"
                            ],
                    }
                )

        # =====================================================
        # 6. FIND BEST OPPORTUNITY MATCH
        # =====================================================

        sorted_opportunities = sorted(
            opportunities,
            key=lambda item: item.get(
                "match_percentage",
                0,
            ),
            reverse=True,
        )

        best_opportunity = (
            sorted_opportunities[0]
            if sorted_opportunities
            else None
        )

        # =====================================================
        # 7. BUILD INTELLIGENCE INSIGHTS
        # =====================================================

        insights = []

        if student_twin.career_readiness_score is not None:

            if student_twin.career_readiness_score >= 70:
                insights.append(
                    "Student shows strong overall career readiness."
                )

            elif student_twin.career_readiness_score >= 50:
                insights.append(
                    "Student shows developing career readiness "
                    "and can benefit from targeted development."
                )

            else:
                insights.append(
                    "Student requires focused development "
                    "across key readiness dimensions."
                )

        if best_opportunity:

            if best_opportunity["match_percentage"] >= 80:
                insights.append(
                    f"Strong alignment detected with "
                    f"{best_opportunity['opportunity_title']}."
                )

            elif best_opportunity["match_percentage"] >= 50:
                insights.append(
                    f"Partial alignment detected with "
                    f"{best_opportunity['opportunity_title']}."
                )

        if skill_gaps:

            unique_gap_skills = sorted(
                {
                    gap["skill_name"]
                    for gap in skill_gaps
                }
            )

            insights.append(
                "Skill development opportunities identified: "
                + ", ".join(unique_gap_skills)
                + "."
            )

        # =====================================================
        # 8. RETURN UNIFIED INTELLIGENCE
        # =====================================================

        return {
            "student": {
                "id": student.id,
                "name": getattr(
                    student,
                    "name",
                    None,
                ),
            },

            "student_twin": {
                "overall_score":
                    student_twin.overall_score,

                "academic_score":
                    student_twin.academic_score,

                "skill_score":
                    student_twin.skill_score,

                "project_score":
                    student_twin.project_score,

                "engagement_score":
                    student_twin.engagement_score,

                "career_readiness_score":
                    student_twin.career_readiness_score,

                "strengths":
                    student_twin.strengths,

                "skill_gaps":
                    student_twin.skill_gaps,

                "recommended_focus":
                    student_twin.recommended_focus,

                "profile_status":
                    student_twin.profile_status,
            },

            "graph_profile":
                graph_profile,

            "opportunities":
                opportunities,

            "skill_gaps":
                skill_gaps,

            "best_opportunity":
                best_opportunity,

            "insights":
                insights,
        }


unified_student_intelligence_service = (
    UnifiedStudentIntelligenceService()
)