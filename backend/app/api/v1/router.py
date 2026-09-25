from fastapi import APIRouter

from app.api.students import router as students_router
from app.api.departments import router as departments_router
from app.api.faculty import router as faculty_router
from app.api.courses import router as courses_router
from app.api.academic_years import router as academic_years_router
from app.api.academic_records import router as academic_records_router
from app.api.student_skills import router as student_skills_router

from app.api.projects import router as projects_router
from app.api.project_skills import router as project_skills_router
from app.api.project_members import router as project_members_router
from app.api.project_outcomes import router as project_outcomes_router
from app.api.project_evidence import router as project_evidence_router

from app.api.student_profiles import router as student_profiles_router
from app.api.student_activities import router as student_activities_router

from app.api.opportunities import router as opportunities_router
from app.api.opportunity_skills import router as opportunity_skills_router

from app.api.student_twins import router as student_twins_router
from app.api.student_intelligence import router as student_intelligence_router
from app.api.skill_intelligence import router as skill_intelligence_router
from app.api.project_dna import router as project_dna_router
from app.api.failure_memory import router as failure_memory_router

from app.api.campus_intelligence import router as campus_intelligence_router
from app.api.decision_intelligence import router as decision_intelligence_router

from app.api.knowledge_graph import router as knowledge_graph_router
from app.api.graph_intelligence import router as graph_intelligence_router

from app.api.intelligence import router as intelligence_router
from app.api.research_knowledge import router as research_knowledge_router

from app.api.knowledge_ingestion import (
    router as knowledge_ingestion_router,
)

from app.api.knowledge_retrieval import (
    router as knowledge_retrieval_router,
)

from app.api.rag_context import (
    router as rag_context_router,
)

from app.api.nexus_ai import (
    router as nexus_ai_router,
)

from app.api.users import router as users_router
from app.api.stored_files import router as stored_files_router
from app.api.unified_student_intelligence import (
    router as unified_student_intelligence_router,
)


# ============================================================
# NEXUS API V1 ROUTER
# ============================================================

router = APIRouter()


# ============================================================
# CORE CAMPUS DATA
# ============================================================

router.include_router(
    students_router,
    prefix="/students",
    tags=["Students"],
)

router.include_router(
    departments_router,
    prefix="/departments",
    tags=["Departments"],
)

router.include_router(
    faculty_router,
    prefix="/faculty",
    tags=["Faculty"],
)

router.include_router(
    courses_router,
    prefix="/courses",
    tags=["Courses"],
)

router.include_router(
    academic_years_router,
    prefix="/academic-years",
    tags=["Academic Years"],
)

router.include_router(
    academic_records_router,
    prefix="/academic-records",
    tags=["Academic Records"],
)

router.include_router(
    student_skills_router,
    prefix="/student-skills",
    tags=["Student Skills"],
)


# ============================================================
# PROJECT DATA
# ============================================================

router.include_router(
    projects_router,
    prefix="/projects",
    tags=["Projects"],
)

router.include_router(
    project_skills_router,
    prefix="/project-skills",
    tags=["Project Skills"],
)

router.include_router(
    project_members_router,
    prefix="/project-members",
    tags=["Project Members"],
)

router.include_router(
    project_outcomes_router,
    prefix="/project-outcomes",
    tags=["Project Outcomes"],
)

router.include_router(
    project_evidence_router,
    prefix="/project-evidence",
    tags=["Project Evidence"],
)


# ============================================================
# STUDENT PROFILE & ACTIVITY
# ============================================================

router.include_router(
    student_profiles_router,
    prefix="/student-profiles",
    tags=["Student Profiles"],
)

router.include_router(
    student_activities_router,
    prefix="/student-activities",
    tags=["Student Activities"],
)


# ============================================================
# OPPORTUNITIES
# ============================================================

router.include_router(
    opportunities_router,
    prefix="/opportunities",
    tags=["Opportunities"],
)

router.include_router(
    opportunity_skills_router,
    prefix="/opportunity-skills",
    tags=["Opportunity Skills"],
)


# ============================================================
# STUDENT INTELLIGENCE
# ============================================================

router.include_router(
    student_twins_router,
    prefix="/student-twins",
    tags=["Student Twins"],
)

router.include_router(
    student_intelligence_router,
    prefix="/student-intelligence",
    tags=["Student Intelligence"],
)

router.include_router(
    skill_intelligence_router,
    prefix="/skill-intelligence",
    tags=["Skill Intelligence"],
)

router.include_router(
    project_dna_router,
    prefix="/project-dna",
    tags=["Project DNA"],
)

router.include_router(
    failure_memory_router,
    prefix="/failure-memory",
    tags=["Failure Memory"],
)


# ============================================================
# CAMPUS INTELLIGENCE
# ============================================================

router.include_router(
    campus_intelligence_router,
    prefix="/campus-intelligence",
    tags=["Campus Intelligence"],
)

router.include_router(
    decision_intelligence_router,
    prefix="/decision-intelligence",
    tags=["Decision Intelligence"],
)


# ============================================================
# KNOWLEDGE GRAPH
# ============================================================

router.include_router(
    knowledge_graph_router,
    prefix="/knowledge-graph",
    tags=["Knowledge Graph"],
)

router.include_router(
    graph_intelligence_router,
    prefix="/graph-intelligence",
    tags=["Graph Intelligence"],
)


# ============================================================
# UNIFIED INTELLIGENCE
# ============================================================

router.include_router(
    intelligence_router,
    prefix="/intelligence",
    tags=["Unified Intelligence"],
)


# ============================================================
# NEXUS USER
# ============================================================

router.include_router(
    users_router,
    prefix="/users",
    tags=["Users"],
)

router.include_router(
    stored_files_router,
    prefix="/stored-files",
    tags=["Stored Files"],
)


# ============================================================
# RESEARCH KNOWLEDGE
# ============================================================

router.include_router(
    research_knowledge_router,
)


# ============================================================
# KNOWLEDGE INGESTION
# ============================================================

router.include_router(
    knowledge_ingestion_router,
)


# ============================================================
# KNOWLEDGE RETRIEVAL
# ============================================================

router.include_router(
    knowledge_retrieval_router,
)


# ============================================================
# RAG CONTEXT
# ============================================================

router.include_router(
    rag_context_router,
)


# ============================================================
# NEXUS AI
# ============================================================

router.include_router(
    nexus_ai_router,
)
router.include_router(
    unified_student_intelligence_router,
    prefix="/unified-student-intelligence",
    tags=["Unified Student Intelligence"],
)
