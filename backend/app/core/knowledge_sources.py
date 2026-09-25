from enum import Enum


class KnowledgeSourceType(str, Enum):
    """
    Standard knowledge source types used by NEXUS.
    """

    STUDENT = "student"
    STUDENT_PROFILE = "student_profile"
    STUDENT_SKILL = "student_skill"
    STUDENT_ACTIVITY = "student_activity"

    ACADEMIC_RECORD = "academic_record"
    COURSE = "course"

    PROJECT = "project"
    PROJECT_EVIDENCE = "project_evidence"
    PROJECT_OUTCOME = "project_outcome"

    FAILURE_MEMORY = "failure_memory"

    OPPORTUNITY = "opportunity"
    OPPORTUNITY_SKILL = "opportunity_skill"

    RESEARCH = "research"
    CAMPUS = "campus"