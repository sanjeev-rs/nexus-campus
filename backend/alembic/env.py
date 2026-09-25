from logging.config import fileConfig

from sqlalchemy import create_engine, pool

from alembic import context

from app.database.base import Base
from app.database.connection import DATABASE_URL


# ============================================================
# IMPORT ALL NEXUS MODELS
# ============================================================

# Academic foundation
from app.models.student import Student
from app.models.department import Department
from app.models.faculty import Faculty
from app.models.course import Course
from app.models.academic_year import AcademicYear
from app.models.enrollments import Enrollment
from app.models.academic_record import AcademicRecord

# Skills
from app.models.skill import Skill
from app.models.student_skill import StudentSkill
from app.models.skill_evidence import SkillEvidence

# Projects
from app.models.project import Project
from app.models.project_skill import ProjectSkill
from app.models.project_member import ProjectMember
from app.models.project_outcome import ProjectOutcome
from app.models.project_evidence import ProjectEvidence

# Student development
from app.models.student_profile import StudentProfile
from app.models.student_activity import StudentActivity

# Opportunities
from app.models.opportunity import Opportunity
from app.models.opportunity_skill import OpportunitySkill
from app.models.opportunity_application import OpportunityApplication

# Intelligence
from app.models.student_twin import StudentTwin
from app.models.failure_memory import FailureMemory

from app.models.stored_file import StoredFile
from app.models.knowledge_embedding import KnowledgeEmbedding

# Authentication / authorization
from app.models.user import User


# ============================================================
# ALEMBIC CONFIGURATION
# ============================================================

config = context.config


if config.config_file_name is not None:
    fileConfig(
        config.config_file_name
    )


# ============================================================
# TARGET METADATA
# ============================================================

target_metadata = Base.metadata


# ============================================================
# OFFLINE MIGRATIONS
# ============================================================

def run_migrations_offline() -> None:
    """
    Run Alembic migrations without connecting
    directly to the database.
    """

    url = str(DATABASE_URL)

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={
            "paramstyle": "named"
        },
    )

    with context.begin_transaction():
        context.run_migrations()


# ============================================================
# ONLINE MIGRATIONS
# ============================================================

def run_migrations_online() -> None:
    """
    Run Alembic migrations using a direct
    SQLAlchemy database connection.
    """

    connectable = create_engine(
        DATABASE_URL,
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:

        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


# ============================================================
# MIGRATION MODE
# ============================================================

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()