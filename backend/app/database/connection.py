from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.database.base import Base


# ============================================================
# DATABASE URL
# ============================================================

DATABASE_URL = URL.create(
    "postgresql+psycopg2",
    username=settings.DB_USER,
    password=settings.DB_PASSWORD,
    host=settings.DB_HOST,
    port=settings.DB_PORT,
    database=settings.DB_NAME,
)


# ============================================================
# DATABASE ENGINE
# ============================================================

engine = create_engine(
    DATABASE_URL,
)


# ============================================================
# DATABASE SESSION
# ============================================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


# ============================================================
# DATABASE CONNECTION TEST
# ============================================================

def test_database_connection():
    """
    Verify that NEXUS can connect to PostgreSQL.
    """

    with engine.connect() as connection:

        result = connection.execute(
            text("SELECT 1")
        )

        return result.scalar()


# ============================================================
# DATABASE DEPENDENCY
# ============================================================

def get_db():
    """
    Provide a SQLAlchemy database session
    to FastAPI endpoints.
    """

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# ============================================================
# MODEL REGISTRATION
# ============================================================

# Import all models so SQLAlchemy Base.metadata
# is aware of every NEXUS database model.

from app.models.student import Student
from app.models.department import Department
from app.models.faculty import Faculty
from app.models.course import Course
from app.models.academic_year import AcademicYear

from app.models.enrollments import Enrollment
from app.models.academic_record import AcademicRecord

from app.models.skill import Skill
from app.models.student_skill import StudentSkill
from app.models.skill_evidence import SkillEvidence

from app.models.project import Project
from app.models.project_skill import ProjectSkill
from app.models.project_member import ProjectMember
from app.models.project_outcome import ProjectOutcome
from app.models.project_evidence import ProjectEvidence

from app.models.student_profile import StudentProfile
from app.models.student_activity import StudentActivity

from app.models.opportunity import Opportunity
from app.models.opportunity_skill import OpportunitySkill
from app.models.opportunity_application import OpportunityApplication

from app.models.student_twin import StudentTwin
from app.models.failure_memory import FailureMemory

from app.models.stored_file import StoredFile
from app.models.stored_file import StoredFile

from app.models.knowledge_embedding import KnowledgeEmbedding
from app.models.knowledge_ingestion import KnowledgeIngestion

from app.models.user import User