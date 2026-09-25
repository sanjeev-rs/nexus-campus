from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.project_skill import ProjectSkill
from app.models.project_member import ProjectMember
from app.models.project_outcome import ProjectOutcome
from app.models.project_evidence import ProjectEvidence


# ============================================================
# GET PROJECT DNA DATA
# ============================================================

def get_project_dna(
    db: Session,
    project_id: int,
):
    """
    Retrieve all underlying data required for
    Project DNA intelligence.

    This service collects project information,
    skills, members, outcomes, and evidence.

    Intelligence calculations are handled by
    project_dna_engine.py.
    """

    # --------------------------------------------------------
    # PROJECT
    # --------------------------------------------------------

    project = (
        db.query(Project)
        .filter(
            Project.id == project_id
        )
        .first()
    )

    if not project:
        return None

    # --------------------------------------------------------
    # PROJECT SKILLS
    # --------------------------------------------------------

    skills = (
        db.query(ProjectSkill)
        .filter(
            ProjectSkill.project_id == project_id
        )
        .all()
    )

    # --------------------------------------------------------
    # PROJECT MEMBERS
    # --------------------------------------------------------

    members = (
        db.query(ProjectMember)
        .filter(
            ProjectMember.project_id == project_id
        )
        .all()
    )

    # --------------------------------------------------------
    # PROJECT OUTCOMES
    # --------------------------------------------------------

    outcomes = (
        db.query(ProjectOutcome)
        .filter(
            ProjectOutcome.project_id == project_id
        )
        .all()
    )

    # --------------------------------------------------------
    # PROJECT EVIDENCE
    # --------------------------------------------------------

    evidence = (
        db.query(ProjectEvidence)
        .filter(
            ProjectEvidence.project_id == project_id
        )
        .all()
    )

    # --------------------------------------------------------
    # RETURN PROJECT DNA DATA
    # --------------------------------------------------------

    return {
        "project": project,
        "skills": skills,
        "members": members,
        "outcomes": outcomes,
        "evidence": evidence,
    }


# ============================================================
# GET PROJECT SKILLS
# ============================================================

def get_project_skills(
    db: Session,
    project_id: int,
):
    """
    Return all skills associated with a project.
    """

    return (
        db.query(ProjectSkill)
        .filter(
            ProjectSkill.project_id == project_id
        )
        .all()
    )


# ============================================================
# GET PROJECT MEMBERS
# ============================================================

def get_project_members(
    db: Session,
    project_id: int,
):
    """
    Return all members associated with a project.
    """

    return (
        db.query(ProjectMember)
        .filter(
            ProjectMember.project_id == project_id
        )
        .all()
    )


# ============================================================
# GET PROJECT OUTCOMES
# ============================================================

def get_project_outcomes(
    db: Session,
    project_id: int,
):
    """
    Return all outcomes associated with a project.
    """

    return (
        db.query(ProjectOutcome)
        .filter(
            ProjectOutcome.project_id == project_id
        )
        .all()
    )


# ============================================================
# GET PROJECT EVIDENCE
# ============================================================

def get_project_evidence(
    db: Session,
    project_id: int,
):
    """
    Return all evidence associated with a project.
    """

    return (
        db.query(ProjectEvidence)
        .filter(
            ProjectEvidence.project_id == project_id
        )
        .all()
    )


# ============================================================
# PROJECT DNA SUMMARY
# ============================================================

def get_project_dna_summary(
    db: Session,
    project_id: int,
):
    """
    Generate a basic deterministic summary of
    the project's DNA data.
    """

    data = get_project_dna(
        db,
        project_id,
    )

    if not data:
        return None

    return {
        "project_id": project_id,
        "skill_count": len(
            data["skills"]
        ),
        "member_count": len(
            data["members"]
        ),
        "outcome_count": len(
            data["outcomes"]
        ),
        "evidence_count": len(
            data["evidence"]
        ),
    }