from typing import Any

from app.database.neo4j_connection import neo4j_connection


class Neo4jStudentIntelligenceService:
    """
    Provides student-centric intelligence using the NEXUS Neo4j graph.

    Current intelligence:
        Student -> Skills
        Student -> Projects
        Student -> Opportunities
        Student -> Skill Gaps
    """

    def __init__(self):
        self.driver = None
        self.database = None

    def _connect(self):
        neo4j_connection.connect()
        self.driver = neo4j_connection.driver
        self.database = neo4j_connection.database

    def _close(self):
        neo4j_connection.close()
        self.driver = None
        self.database = None

    # =========================================================
    # STUDENT PROFILE
    # =========================================================

    def get_student_profile(self, student_id: int) -> dict[str, Any] | None:
        self._connect()

        try:
            query = """
            MATCH (student:Entity {
                id: $student_id
            })

            OPTIONAL MATCH
                (student)-[skill_rel:HAS_SKILL]->(skill:Entity)

            OPTIONAL MATCH
                (student)-[project_rel:WORKS_ON]->(project:Entity)

            RETURN
                student.id AS student_id,
                student.label AS student_name,

                collect(
                    DISTINCT {
                        skill_id: skill.id,
                        skill_name: skill.label,
                        proficiency_level: skill_rel.proficiency_level,
                        verified: skill_rel.verified
                    }
                ) AS skills,

                collect(
                    DISTINCT {
                        project_id: project.id,
                        project_name: project.label,
                        role: project_rel.role
                    }
                ) AS projects
            """

            with self.driver.session(
                database=self.database
            ) as session:

                record = session.run(
                    query,
                    student_id=f"student:{student_id}",
                ).single()

                if not record:
                    return None

                skills = [
                    skill
                    for skill in record["skills"]
                    if skill["skill_id"] is not None
                ]

                projects = [
                    project
                    for project in record["projects"]
                    if project["project_id"] is not None
                ]

                return {
                    "student_id": record["student_id"],
                    "student_name": record["student_name"],
                    "skills": skills,
                    "projects": projects,
                    "skill_count": len(skills),
                    "project_count": len(projects),
                }

        finally:
            self._close()

    # =========================================================
    # STUDENT -> OPPORTUNITY MATCHING
    # =========================================================

    def get_student_opportunity_matches(
        self,
        student_id: int,
    ) -> list[dict[str, Any]]:

        self._connect()

        try:
            query = """
            MATCH (student:Entity {
                id: $student_id
            })

            MATCH (opportunity:Entity)

            WHERE opportunity.type IN [
                'internship',
                'competition',
                'fellowship'
            ]

            OPTIONAL MATCH
                (opportunity)-[
                    requirement:REQUIRES_SKILL
                ]->(required_skill:Entity)

            OPTIONAL MATCH
                (student)-[
                    student_skill:HAS_SKILL
                ]->(required_skill)

            WITH
                opportunity,
                collect(
                    DISTINCT {
                        skill_id: required_skill.id,
                        skill_name: required_skill.label,
                        required_proficiency:
                            requirement.minimum_proficiency,
                        importance:
                            requirement.importance,
                        student_proficiency:
                            student_skill.proficiency_level
                    }
                ) AS requirements

            RETURN
                opportunity.id AS opportunity_id,
                opportunity.label AS opportunity_title,
                opportunity.type AS opportunity_type,
                opportunity.organization AS organization,
                opportunity.status AS status,
                requirements

            ORDER BY opportunity.label
            """

            with self.driver.session(
                database=self.database
            ) as session:

                records = session.run(
                    query,
                    student_id=f"student:{student_id}",
                )

                results = []

                for record in records:

                    requirements = [
                        item
                        for item in record["requirements"]
                        if item["skill_id"] is not None
                    ]

                    matching_skills = []
                    skill_gaps = []

                    for requirement in requirements:

                        student_proficiency = (
                            requirement["student_proficiency"]
                        )

                        required_proficiency = (
                            requirement["required_proficiency"]
                        )

                        if (
                            student_proficiency is not None
                            and required_proficiency is not None
                            and student_proficiency
                            >= required_proficiency
                        ):
                            matching_skills.append(requirement)

                        else:
                            skill_gaps.append(requirement)

                    required_skill_count = len(requirements)
                    matching_skill_count = len(matching_skills)
                    skill_gap_count = len(skill_gaps)

                    if required_skill_count > 0:
                        match_percentage = round(
                            (
                                matching_skill_count
                                / required_skill_count
                            )
                            * 100,
                            2,
                        )
                    else:
                        match_percentage = 0

                    results.append(
                        {
                            "opportunity_id": record[
                                "opportunity_id"
                            ],
                            "opportunity_title": record[
                                "opportunity_title"
                            ],
                            "opportunity_type": record[
                                "opportunity_type"
                            ],
                            "organization": record[
                                "organization"
                            ],
                            "status": record["status"],
                            "matching_skills": matching_skills,
                            "skill_gaps": skill_gaps,
                            "required_skill_count": required_skill_count,
                            "matching_skill_count": matching_skill_count,
                            "skill_gap_count": skill_gap_count,
                            "match_percentage": match_percentage,
                        }
                    )

                return results

        finally:
            self._close()


neo4j_student_intelligence_service = (
    Neo4jStudentIntelligenceService()
)