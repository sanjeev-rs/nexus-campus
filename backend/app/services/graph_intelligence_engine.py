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
# SKILL NETWORK
# =========================================================

def analyze_skill_network(
    db: Session,
):
    skills = db.query(Skill).all()

    results = []

    for skill in skills:

        student_count = (
            db.query(StudentSkill)
            .filter(
                StudentSkill.skill_id == skill.id
            )
            .count()
        )

        project_count = (
            db.query(ProjectSkill)
            .filter(
                ProjectSkill.skill_id == skill.id
            )
            .count()
        )

        opportunity_count = (
            db.query(OpportunitySkill)
            .filter(
                OpportunitySkill.skill_id == skill.id
            )
            .count()
        )

        results.append({
            "skill_id": skill.id,
            "skill_name": getattr(
                skill,
                "name",
                f"Skill {skill.id}",
            ),
            "student_count": student_count,
            "project_count": project_count,
            "opportunity_count": opportunity_count,
            "connection_score": (
                student_count
                + project_count
                + opportunity_count
            ),
        })

    results.sort(
        key=lambda item: item["connection_score"],
        reverse=True,
    )

    return results


# =========================================================
# STUDENT NETWORK
# =========================================================

def analyze_student_network(
    db: Session,
):
    students = db.query(Student).all()

    results = []

    for student in students:

        skill_count = (
            db.query(StudentSkill)
            .filter(
                StudentSkill.student_id == student.id
            )
            .count()
        )

        project_count = (
            db.query(ProjectMember)
            .filter(
                ProjectMember.student_id == student.id
            )
            .count()
        )

        results.append({
            "student_id": student.id,
            "skill_count": skill_count,
            "project_count": project_count,
            "network_score": (
                skill_count * 2
                + project_count * 3
            ),
        })

    results.sort(
        key=lambda item: item["network_score"],
        reverse=True,
    )

    return results


# =========================================================
# PROJECT NETWORK
# =========================================================

def analyze_project_network(
    db: Session,
):
    projects = db.query(Project).all()

    results = []

    for project in projects:

        skill_count = (
            db.query(ProjectSkill)
            .filter(
                ProjectSkill.project_id == project.id
            )
            .count()
        )

        member_count = (
            db.query(ProjectMember)
            .filter(
                ProjectMember.project_id == project.id
            )
            .count()
        )

        failure_count = (
            db.query(FailureMemory)
            .filter(
                FailureMemory.project_id == project.id
            )
            .count()
        )

        results.append({
            "project_id": project.id,
            "project_title": getattr(
                project,
                "title",
                f"Project {project.id}",
            ),
            "skill_count": skill_count,
            "member_count": member_count,
            "failure_count": failure_count,
            "network_score": (
                skill_count * 2
                + member_count * 2
                + failure_count
            ),
        })

    results.sort(
        key=lambda item: item["network_score"],
        reverse=True,
    )

    return results


# =========================================================
# OPPORTUNITY NETWORK
# =========================================================

def analyze_opportunity_network(
    db: Session,
):
    opportunities = (
        db.query(Opportunity)
        .all()
    )

    results = []

    for opportunity in opportunities:

        skill_count = (
            db.query(OpportunitySkill)
            .filter(
                OpportunitySkill.opportunity_id
                == opportunity.id
            )
            .count()
        )

        results.append({
            "opportunity_id": opportunity.id,
            "opportunity_title": opportunity.title,
            "organization": opportunity.organization,
            "skill_count": skill_count,
            "status": opportunity.status,
            "network_score": skill_count,
        })

    results.sort(
        key=lambda item: item["network_score"],
        reverse=True,
    )

    return results


# =========================================================
# FAILURE NETWORK
# =========================================================

def analyze_failure_network(
    db: Session,
):
    failures = (
        db.query(FailureMemory)
        .all()
    )

    failure_types = {}

    for failure in failures:

        failure_type = (
            failure.failure_type
            or "unknown"
        )

        if failure_type not in failure_types:
            failure_types[failure_type] = {
                "failure_type": failure_type,
                "count": 0,
                "projects": [],
            }

        failure_types[failure_type]["count"] += 1

        if failure.project_id not in (
            failure_types[failure_type]["projects"]
        ):
            failure_types[failure_type][
                "projects"
            ].append(
                failure.project_id
            )

    results = list(
        failure_types.values()
    )

    results.sort(
        key=lambda item: item["count"],
        reverse=True,
    )

    return results


# =========================================================
# SKILL GAPS AGAINST OPPORTUNITIES
# =========================================================

def analyze_opportunity_skill_gaps(
    db: Session,
):
    opportunities = (
        db.query(Opportunity)
        .all()
    )

    results = []

    for opportunity in opportunities:

        required_skills = (
            db.query(OpportunitySkill)
            .filter(
                OpportunitySkill.opportunity_id
                == opportunity.id
            )
            .all()
        )

        skill_gap_count = 0

        for required_skill in required_skills:

            student_count = (
                db.query(StudentSkill)
                .filter(
                    StudentSkill.skill_id
                    == required_skill.skill_id
                )
                .count()
            )

            if student_count == 0:
                skill_gap_count += 1

        results.append({
            "opportunity_id": opportunity.id,
            "opportunity_title": opportunity.title,
            "skill_gap_count": skill_gap_count,
            "required_skill_count": len(
                required_skills
            ),
        })

    results.sort(
        key=lambda item: item["skill_gap_count"],
        reverse=True,
    )

    return results


# =========================================================
# GRAPH INTELLIGENCE SUMMARY
# =========================================================

def generate_graph_intelligence(
    db: Session,
):
    skill_network = analyze_skill_network(db)

    student_network = analyze_student_network(db)

    project_network = analyze_project_network(db)

    opportunity_network = (
        analyze_opportunity_network(db)
    )

    failure_network = analyze_failure_network(db)

    opportunity_skill_gaps = (
        analyze_opportunity_skill_gaps(db)
    )

    return {
        "skill_network": skill_network,
        "student_network": student_network,
        "project_network": project_network,
        "opportunity_network": opportunity_network,
        "failure_network": failure_network,
        "opportunity_skill_gaps": opportunity_skill_gaps,
    }