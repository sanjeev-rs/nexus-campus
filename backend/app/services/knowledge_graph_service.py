from sqlalchemy.orm import Session

from app.models.student import Student
from app.models.skill import Skill
from app.models.student_skill import StudentSkill
from app.models.project import Project
from app.models.project_skill import ProjectSkill
from app.models.project_member import ProjectMember
from app.models.opportunity import Opportunity
from app.models.opportunity_skill import OpportunitySkill
from app.models.failure_memory import FailureMemory


# =========================================================
# GRAPH NODE
# =========================================================

def create_node(
    node_id: str,
    node_type: str,
    label: str,
    properties: dict | None = None,
):
    return {
        "id": node_id,
        "type": node_type,
        "label": label,
        "properties": properties or {},
    }


# =========================================================
# GRAPH RELATIONSHIP
# =========================================================

def create_relationship(
    source: str,
    relationship_type: str,
    target: str,
    properties: dict | None = None,
):
    return {
        "source": source,
        "relationship": relationship_type,
        "target": target,
        "properties": properties or {},
    }


# =========================================================
# STUDENT NODES
# =========================================================

def build_student_nodes(
    db: Session,
):
    students = (
        db.query(Student)
        .all()
    )

    nodes = []

    for student in students:

        nodes.append(
            create_node(
                node_id=f"student:{student.id}",
                node_type="student",
                label=(
                    getattr(
                        student,
                        "name",
                        None,
                    )
                    or getattr(
                        student,
                        "student_id",
                        None,
                    )
                    or f"Student {student.id}"
                ),
                properties={
                    "student_id": student.id,
                },
            )
        )

    return nodes


# =========================================================
# SKILL NODES
# =========================================================

def build_skill_nodes(
    db: Session,
):
    skills = (
        db.query(Skill)
        .all()
    )

    nodes = []

    for skill in skills:

        nodes.append(
            create_node(
                node_id=f"skill:{skill.id}",
                node_type="skill",
                label=(
                    getattr(
                        skill,
                        "name",
                        None,
                    )
                    or f"Skill {skill.id}"
                ),
                properties={
                    "skill_id": skill.id,
                },
            )
        )

    return nodes


# =========================================================
# PROJECT NODES
# =========================================================

def build_project_nodes(
    db: Session,
):
    projects = (
        db.query(Project)
        .all()
    )

    nodes = []

    for project in projects:

        nodes.append(
            create_node(
                node_id=f"project:{project.id}",
                node_type="project",
                label=(
                    getattr(
                        project,
                        "title",
                        None,
                    )
                    or f"Project {project.id}"
                ),
                properties={
                    "project_id": project.id,
                },
            )
        )

    return nodes


# =========================================================
# OPPORTUNITY NODES
# =========================================================

def build_opportunity_nodes(
    db: Session,
):
    opportunities = (
        db.query(Opportunity)
        .all()
    )

    nodes = []

    for opportunity in opportunities:

        nodes.append(
            create_node(
                node_id=f"opportunity:{opportunity.id}",
                node_type="opportunity",
                label=(
                    getattr(
                        opportunity,
                        "title",
                        None,
                    )
                    or f"Opportunity {opportunity.id}"
                ),
                properties={
                    "opportunity_id": opportunity.id,
                    "organization": opportunity.organization,
                    "type": opportunity.opportunity_type,
                    "status": opportunity.status,
                },
            )
        )

    return nodes


# =========================================================
# FAILURE NODES
# =========================================================

def build_failure_nodes(
    db: Session,
):
    failures = (
        db.query(FailureMemory)
        .all()
    )

    nodes = []

    for failure in failures:

        nodes.append(
            create_node(
                node_id=f"failure:{failure.id}",
                node_type="failure",
                label=failure.failure_type,
                properties={
                    "failure_id": failure.id,
                    "project_id": failure.project_id,
                    "description": failure.failure_description,
                },
            )
        )

    return nodes


# =========================================================
# STUDENT → SKILL RELATIONSHIPS
# =========================================================

def build_student_skill_relationships(
    db: Session,
):
    student_skills = (
        db.query(StudentSkill)
        .all()
    )

    relationships = []

    for student_skill in student_skills:

        relationships.append(
            create_relationship(
                source=f"student:{student_skill.student_id}",
                relationship_type="HAS_SKILL",
                target=f"skill:{student_skill.skill_id}",
                properties={
                    "proficiency_level": (
                        student_skill.proficiency_level
                    ),
                    "source": student_skill.source,
                    "verified": student_skill.verified,
                },
            )
        )

    return relationships


# =========================================================
# STUDENT → PROJECT RELATIONSHIPS
# =========================================================

def build_student_project_relationships(
    db: Session,
):
    project_members = (
        db.query(ProjectMember)
        .all()
    )

    relationships = []

    for member in project_members:

        relationships.append(
            create_relationship(
                source=f"student:{member.student_id}",
                relationship_type="WORKS_ON",
                target=f"project:{member.project_id}",
                properties={
                    "role": member.role,
                },
            )
        )

    return relationships


# =========================================================
# PROJECT → SKILL RELATIONSHIPS
# =========================================================

def build_project_skill_relationships(
    db: Session,
):
    project_skills = (
        db.query(ProjectSkill)
        .all()
    )

    relationships = []

    for project_skill in project_skills:

        relationships.append(
            create_relationship(
                source=f"project:{project_skill.project_id}",
                relationship_type="USES_SKILL",
                target=f"skill:{project_skill.skill_id}",
                properties={
                    "proficiency_level": (
                        project_skill.proficiency_level
                    ),
                },
            )
        )

    return relationships


# =========================================================
# OPPORTUNITY → SKILL RELATIONSHIPS
# =========================================================

def build_opportunity_skill_relationships(
    db: Session,
):
    opportunity_skills = (
        db.query(OpportunitySkill)
        .all()
    )

    relationships = []

    for opportunity_skill in opportunity_skills:

        relationships.append(
            create_relationship(
                source=(
                    f"opportunity:"
                    f"{opportunity_skill.opportunity_id}"
                ),
                relationship_type="REQUIRES_SKILL",
                target=f"skill:{opportunity_skill.skill_id}",
                properties={
                    "importance": (
                        opportunity_skill.importance
                    ),
                    "minimum_proficiency": (
                        opportunity_skill.minimum_proficiency
                    ),
                },
            )
        )

    return relationships


# =========================================================
# PROJECT → FAILURE RELATIONSHIPS
# =========================================================

def build_project_failure_relationships(
    db: Session,
):
    failures = (
        db.query(FailureMemory)
        .all()
    )

    relationships = []

    for failure in failures:

        relationships.append(
            create_relationship(
                source=f"project:{failure.project_id}",
                relationship_type="HAS_FAILURE",
                target=f"failure:{failure.id}",
            )
        )

    return relationships


# =========================================================
# BUILD COMPLETE GRAPH
# =========================================================

def build_knowledge_graph(
    db: Session,
):
    nodes = []

    relationships = []

    # -----------------------------------------------------
    # NODES
    # -----------------------------------------------------

    nodes.extend(
        build_student_nodes(db)
    )

    nodes.extend(
        build_skill_nodes(db)
    )

    nodes.extend(
        build_project_nodes(db)
    )

    nodes.extend(
        build_opportunity_nodes(db)
    )

    nodes.extend(
        build_failure_nodes(db)
    )

    # -----------------------------------------------------
    # RELATIONSHIPS
    # -----------------------------------------------------

    relationships.extend(
        build_student_skill_relationships(db)
    )

    relationships.extend(
        build_student_project_relationships(db)
    )

    relationships.extend(
        build_project_skill_relationships(db)
    )

    relationships.extend(
        build_opportunity_skill_relationships(db)
    )

    relationships.extend(
        build_project_failure_relationships(db)
    )

    return {
        "node_count": len(nodes),
        "relationship_count": len(relationships),
        "nodes": nodes,
        "relationships": relationships,
    }