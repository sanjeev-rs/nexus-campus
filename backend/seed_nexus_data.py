from sqlalchemy.orm import Session

from app.database.connection import SessionLocal

from app.models.department import Department
from app.models.faculty import Faculty
from app.models.student import Student
from app.models.skill import Skill
from app.models.student_skill import StudentSkill
from app.models.project import Project
from app.models.project_member import ProjectMember
from app.models.project_skill import ProjectSkill
from app.models.opportunity import Opportunity
from app.models.opportunity_skill import OpportunitySkill
from app.models.failure_memory import FailureMemory


# ============================================================
# DEPARTMENT
# ============================================================

def get_or_create_department(
    db: Session,
    code: str,
    name: str,
    description: str,
):
    department = (
        db.query(Department)
        .filter(Department.code == code)
        .first()
    )

    if department:
        return department

    department = Department(
        code=code,
        name=name,
        description=description,
    )

    db.add(department)
    db.flush()

    return department


# ============================================================
# FACULTY
# ============================================================

def get_or_create_faculty(
    db: Session,
    employee_id: str,
    name: str,
    email: str,
    designation: str,
    department_id: int,
):
    faculty = (
        db.query(Faculty)
        .filter(Faculty.employee_id == employee_id)
        .first()
    )

    if faculty:
        return faculty

    faculty = Faculty(
        employee_id=employee_id,
        name=name,
        email=email,
        designation=designation,
        department_id=department_id,
    )

    db.add(faculty)
    db.flush()

    return faculty


# ============================================================
# STUDENT
# ============================================================

def get_or_create_student(
    db: Session,
    register_number: str,
    name: str,
    email: str,
    department_id: int,
    year: int,
):
    student = (
        db.query(Student)
        .filter(Student.register_number == register_number)
        .first()
    )

    if student:
        return student

    student = Student(
        register_number=register_number,
        name=name,
        email=email,
        department_id=department_id,
        year=year,
    )

    db.add(student)
    db.flush()

    return student


# ============================================================
# SKILL
# ============================================================

def get_or_create_skill(
    db: Session,
    name: str,
    category: str,
    description: str,
):
    skill = (
        db.query(Skill)
        .filter(Skill.name == name)
        .first()
    )

    if skill:
        return skill

    skill = Skill(
        name=name,
        category=category,
        description=description,
    )

    db.add(skill)
    db.flush()

    return skill


# ============================================================
# STUDENT → SKILL
# ============================================================

def get_or_create_student_skill(
    db: Session,
    student_id: int,
    skill_id: int,
    proficiency_level: float,
    source: str = "project_evidence",
    verified: bool = True,
):
    record = (
        db.query(StudentSkill)
        .filter(
            StudentSkill.student_id == student_id,
            StudentSkill.skill_id == skill_id,
        )
        .first()
    )

    if record:
        return record

    record = StudentSkill(
        student_id=student_id,
        skill_id=skill_id,
        proficiency_level=proficiency_level,
        source=source,
        verified=verified,
    )

    db.add(record)
    db.flush()

    return record


# ============================================================
# PROJECT
# ============================================================

def get_or_create_project(
    db: Session,
    title: str,
    description: str,
    project_type: str,
    status: str,
    student_id: int,
):
    project = (
        db.query(Project)
        .filter(Project.title == title)
        .first()
    )

    if project:
        return project

    project = Project(
        title=title,
        description=description,
        project_type=project_type,
        status=status,
        student_id=student_id,
    )

    db.add(project)
    db.flush()

    return project


# ============================================================
# PROJECT → MEMBER
# ============================================================

def get_or_create_project_member(
    db: Session,
    project_id: int,
    student_id: int,
    role: str,
):
    record = (
        db.query(ProjectMember)
        .filter(
            ProjectMember.project_id == project_id,
            ProjectMember.student_id == student_id,
        )
        .first()
    )

    if record:
        return record

    record = ProjectMember(
        project_id=project_id,
        student_id=student_id,
        role=role,
    )

    db.add(record)
    db.flush()

    return record


# ============================================================
# PROJECT → SKILL
# ============================================================

def get_or_create_project_skill(
    db: Session,
    project_id: int,
    skill_id: int,
    proficiency_level: float,
):
    record = (
        db.query(ProjectSkill)
        .filter(
            ProjectSkill.project_id == project_id,
            ProjectSkill.skill_id == skill_id,
        )
        .first()
    )

    if record:
        return record

    record = ProjectSkill(
        project_id=project_id,
        skill_id=skill_id,
        proficiency_level=proficiency_level,
    )

    db.add(record)
    db.flush()

    return record


# ============================================================
# OPPORTUNITY
# ============================================================

def get_or_create_opportunity(
    db: Session,
    title: str,
    opportunity_type: str,
    organization: str,
    description: str,
    eligibility: str,
    location: str,
    application_url: str,
    status: str,
    created_by: int,
):
    opportunity = (
        db.query(Opportunity)
        .filter(Opportunity.title == title)
        .first()
    )

    if opportunity:
        return opportunity

    opportunity = Opportunity(
        title=title,
        opportunity_type=opportunity_type,
        organization=organization,
        description=description,
        eligibility=eligibility,
        location=location,
        application_url=application_url,
        status=status,
        created_by=created_by,
    )

    db.add(opportunity)
    db.flush()

    return opportunity


# ============================================================
# OPPORTUNITY → SKILL
# ============================================================

def get_or_create_opportunity_skill(
    db: Session,
    opportunity_id: int,
    skill_id: int,
    importance: str,
    minimum_proficiency: float,
):
    record = (
        db.query(OpportunitySkill)
        .filter(
            OpportunitySkill.opportunity_id == opportunity_id,
            OpportunitySkill.skill_id == skill_id,
        )
        .first()
    )

    if record:
        return record

    record = OpportunitySkill(
        opportunity_id=opportunity_id,
        skill_id=skill_id,
        importance=importance,
        minimum_proficiency=minimum_proficiency,
    )

    db.add(record)
    db.flush()

    return record


# ============================================================
# FAILURE MEMORY
# ============================================================

def get_or_create_failure(
    db: Session,
    project_id: int,
    failure_type: str,
    failure_description: str,
    root_cause: str,
    impact: str,
    resolution: str,
    lessons_learned: str,
    preventive_recommendation: str,
    evidence_reference: str,
):
    failure = (
        db.query(FailureMemory)
        .filter(
            FailureMemory.project_id == project_id,
            FailureMemory.failure_type == failure_type,
        )
        .first()
    )

    if failure:
        return failure

    failure = FailureMemory(
        project_id=project_id,
        failure_type=failure_type,
        failure_description=failure_description,
        root_cause=root_cause,
        impact=impact,
        resolution=resolution,
        lessons_learned=lessons_learned,
        preventive_recommendation=preventive_recommendation,
        evidence_reference=evidence_reference,
    )

    db.add(failure)
    db.flush()

    return failure


# ============================================================
# MAIN SEED FUNCTION
# ============================================================

def seed_nexus_data():
    db = SessionLocal()

    try:
        print()
        print("==============================================")
        print("       NEXUS DEVELOPMENT DATA SEED")
        print("==============================================")
        print()

        # ========================================================
        # 1. DEPARTMENTS
        # ========================================================

        ai_ds = get_or_create_department(
            db=db,
            code="AI-DS",
            name="Artificial Intelligence and Data Science",
            description=(
                "Artificial intelligence, machine learning, "
                "and data science."
            ),
        )

        icd = get_or_create_department(
            db=db,
            code="ICD",
            name="Industrial and Communication Design",
            description=(
                "Industrial, communication, and interaction design."
            ),
        )

        print("Departments ready")

        # ========================================================
        # 2. FACULTY
        # ========================================================

        faculty_1 = get_or_create_faculty(
            db=db,
            employee_id="FAC001",
            name="Dr. Arun Kumar",
            email="arun.kumar@campus.edu",
            designation="Professor",
            department_id=ai_ds.id,
        )

        faculty_2 = get_or_create_faculty(
            db=db,
            employee_id="FAC002",
            name="Dr. Meera Nair",
            email="meera.nair@campus.edu",
            designation="Associate Professor",
            department_id=icd.id,
        )

        print("Faculty ready")

        # ========================================================
        # 3. STUDENTS
        # ========================================================

        student_1 = get_or_create_student(
            db=db,
            register_number="NEX001",
            name="Aarav Sharma",
            email="aarav@campus.edu",
            department_id=ai_ds.id,
            year=2,
        )

        student_2 = get_or_create_student(
            db=db,
            register_number="NEX002",
            name="Diya Menon",
            email="diya@campus.edu",
            department_id=ai_ds.id,
            year=2,
        )

        student_3 = get_or_create_student(
            db=db,
            register_number="NEX003",
            name="Rahul Krishnan",
            email="rahul@campus.edu",
            department_id=ai_ds.id,
            year=3,
        )

        student_4 = get_or_create_student(
            db=db,
            register_number="NEX004",
            name="Ananya Rao",
            email="ananya@campus.edu",
            department_id=icd.id,
            year=2,
        )

        student_5 = get_or_create_student(
            db=db,
            register_number="NEX005",
            name="Vikram Das",
            email="vikram@campus.edu",
            department_id=icd.id,
            year=3,
        )

        print("Students ready")

        # ========================================================
        # 4. SKILLS
        # ========================================================

        skill_data = [
            (
                "Python",
                "technical",
                "Python programming and application development.",
            ),
            (
                "Machine Learning",
                "technical",
                "Machine learning model development and evaluation.",
            ),
            (
                "Data Analysis",
                "technical",
                "Data cleaning, analysis, and interpretation.",
            ),
            (
                "SQL",
                "technical",
                "Relational database querying and data management.",
            ),
            (
                "React",
                "technical",
                "Frontend development using React.",
            ),
            (
                "FastAPI",
                "technical",
                "Backend API development using FastAPI.",
            ),
            (
                "UI/UX Design",
                "design",
                "User interface and user experience design.",
            ),
            (
                "Figma",
                "design",
                "Interface design and prototyping using Figma.",
            ),
            (
                "Communication",
                "soft",
                "Technical and professional communication.",
            ),
            (
                "Project Management",
                "soft",
                "Planning, coordination, and project execution.",
            ),
        ]

        skills = {}

        for name, category, description in skill_data:
            skills[name] = get_or_create_skill(
                db=db,
                name=name,
                category=category,
                description=description,
            )

        print("Skills ready")

        # ========================================================
        # 5. STUDENT → SKILL
        # ========================================================

        student_skill_data = [
            (student_1, "Python", 4.5),
            (student_1, "Machine Learning", 4.0),
            (student_1, "Data Analysis", 4.0),
            (student_1, "FastAPI", 3.5),

            (student_2, "Python", 4.0),
            (student_2, "SQL", 3.5),
            (student_2, "React", 4.0),

            (student_3, "Machine Learning", 4.5),
            (student_3, "Data Analysis", 4.5),
            (student_3, "SQL", 4.0),

            (student_4, "UI/UX Design", 4.5),
            (student_4, "Figma", 4.5),
            (student_4, "Communication", 4.0),

            (student_5, "Figma", 4.0),
            (student_5, "UI/UX Design", 4.0),
            (student_5, "Project Management", 3.5),
        ]

        for student, skill_name, proficiency in student_skill_data:
            get_or_create_student_skill(
                db=db,
                student_id=student.id,
                skill_id=skills[skill_name].id,
                proficiency_level=proficiency,
                source="project_evidence",
                verified=True,
            )

        print("Student-skill relationships ready")

        # ========================================================
        # 6. PROJECTS
        # ========================================================

        project_1 = get_or_create_project(
            db=db,
            title="NEXUS Campus Intelligence",
            description=(
                "AI-powered campus intelligence and "
                "student development platform."
            ),
            project_type="AI",
            status="ongoing",
            student_id=student_1.id,
        )

        project_2 = get_or_create_project(
            db=db,
            title="Smart Inventory Analytics",
            description=(
                "Analytics platform for inventory monitoring "
                "and revenue insights."
            ),
            project_type="Data Science",
            status="completed",
            student_id=student_2.id,
        )

        project_3 = get_or_create_project(
            db=db,
            title="Student Portfolio Platform",
            description=(
                "Digital portfolio platform for student "
                "projects and achievements."
            ),
            project_type="Web Development",
            status="ongoing",
            student_id=student_3.id,
        )

        project_4 = get_or_create_project(
            db=db,
            title="Campus Experience Redesign",
            description=(
                "Redesign of the student campus experience "
                "using user-centered design."
            ),
            project_type="Design",
            status="ongoing",
            student_id=student_4.id,
        )

        print("Projects ready")

        # ========================================================
        # 7. PROJECT → MEMBER
        # ========================================================

        project_member_data = [
            (project_1, student_1, "lead"),
            (project_1, student_2, "backend"),
            (project_1, student_4, "designer"),

            (project_2, student_2, "lead"),
            (project_2, student_3, "data analyst"),

            (project_3, student_3, "lead"),
            (project_3, student_5, "designer"),

            (project_4, student_4, "lead"),
            (project_4, student_5, "designer"),
        ]

        for project, student, role in project_member_data:
            get_or_create_project_member(
                db=db,
                project_id=project.id,
                student_id=student.id,
                role=role,
            )

        print("Project-member relationships ready")

        # ========================================================
        # 8. PROJECT → SKILL
        # ========================================================

        project_skill_data = [
            (project_1, "Python", 4.5),
            (project_1, "FastAPI", 4.0),
            (project_1, "React", 4.0),
            (project_1, "Machine Learning", 3.5),

            (project_2, "Python", 4.0),
            (project_2, "Data Analysis", 4.5),
            (project_2, "SQL", 4.0),

            (project_3, "React", 4.0),
            (project_3, "FastAPI", 3.5),
            (project_3, "UI/UX Design", 4.0),

            (project_4, "UI/UX Design", 4.5),
            (project_4, "Figma", 4.5),
            (project_4, "Communication", 4.0),
        ]

        for project, skill_name, proficiency in project_skill_data:
            get_or_create_project_skill(
                db=db,
                project_id=project.id,
                skill_id=skills[skill_name].id,
                proficiency_level=proficiency,
            )

        print("Project-skill relationships ready")

        # ========================================================
        # 9. OPPORTUNITIES
        # ========================================================

        opportunity_1 = get_or_create_opportunity(
            db=db,
            title="AI Research Internship",
            opportunity_type="internship",
            organization="Campus AI Labs",
            description=(
                "Research internship focused on "
                "applied artificial intelligence."
            ),
            eligibility=(
                "Students with Python and machine learning experience."
            ),
            location="Coimbatore",
            application_url="https://example.com/ai-internship",
            status="active",
            created_by=faculty_1.id,
        )

        opportunity_2 = get_or_create_opportunity(
            db=db,
            title="Data Science Challenge",
            opportunity_type="competition",
            organization="DataTech Community",
            description=(
                "Data science competition using "
                "real-world datasets."
            ),
            eligibility=(
                "Students with Python, SQL, and data analysis skills."
            ),
            location="Online",
            application_url="https://example.com/data-challenge",
            status="active",
            created_by=faculty_1.id,
        )

        opportunity_3 = get_or_create_opportunity(
            db=db,
            title="Product Design Internship",
            opportunity_type="internship",
            organization="Design Studio",
            description=(
                "Product design internship focused "
                "on user experience."
            ),
            eligibility=(
                "Students with Figma and UI/UX experience."
            ),
            location="Bengaluru",
            application_url="https://example.com/design-internship",
            status="active",
            created_by=faculty_2.id,
        )

        opportunity_4 = get_or_create_opportunity(
            db=db,
            title="Campus Innovation Fellowship",
            opportunity_type="fellowship",
            organization="Innovation Foundation",
            description=(
                "Fellowship for interdisciplinary "
                "campus innovation projects."
            ),
            eligibility=(
                "Students with project experience "
                "and communication skills."
            ),
            location="Coimbatore",
            application_url="https://example.com/innovation-fellowship",
            status="active",
            created_by=faculty_2.id,
        )

        print("Opportunities ready")

        # ========================================================
        # 10. OPPORTUNITY → SKILL
        # ========================================================

        opportunity_skill_data = [
            (opportunity_1, "Python", "required", 3.5),
            (opportunity_1, "Machine Learning", "required", 3.5),
            (opportunity_1, "FastAPI", "preferred", 3.0),

            (opportunity_2, "Python", "required", 3.0),
            (opportunity_2, "SQL", "required", 3.0),
            (opportunity_2, "Data Analysis", "required", 3.5),

            (opportunity_3, "UI/UX Design", "required", 3.5),
            (opportunity_3, "Figma", "required", 3.5),

            (opportunity_4, "Communication", "required", 3.0),
            (opportunity_4, "Project Management", "preferred", 3.0),
        ]

        for (
            opportunity,
            skill_name,
            importance,
            minimum_proficiency,
        ) in opportunity_skill_data:

            get_or_create_opportunity_skill(
                db=db,
                opportunity_id=opportunity.id,
                skill_id=skills[skill_name].id,
                importance=importance,
                minimum_proficiency=minimum_proficiency,
            )

        print("Opportunity-skill relationships ready")

        # ========================================================
        # 11. FAILURE MEMORY
        # ========================================================

        get_or_create_failure(
            db=db,
            project_id=project_1.id,
            failure_type="database_connection",
            failure_description=(
                "Initial backend deployment failed because "
                "database environment variables were not "
                "configured correctly."
            ),
            root_cause=(
                "Missing or incorrect database configuration."
            ),
            impact=(
                "Backend could not establish a database connection."
            ),
            resolution=(
                "Corrected environment configuration and "
                "validated the database connection."
            ),
            lessons_learned=(
                "Environment configuration must be validated "
                "before backend deployment."
            ),
            preventive_recommendation=(
                "Environment variables should be validated "
                "before starting the backend."
            ),
            evidence_reference=(
                "NEXUS development setup notes"
            ),
        )

        get_or_create_failure(
            db=db,
            project_id=project_2.id,
            failure_type="data_quality",
            failure_description=(
                "Inventory analytics initially produced "
                "incorrect totals because duplicate records "
                "were present."
            ),
            root_cause=(
                "Duplicate records were not removed "
                "during preprocessing."
            ),
            impact=(
                "Revenue and inventory metrics were "
                "temporarily inaccurate."
            ),
            resolution=(
                "Added duplicate detection and "
                "preprocessing validation."
            ),
            lessons_learned=(
                "Data validation should be performed "
                "before analytical calculations."
            ),
            preventive_recommendation=(
                "Data quality checks should run before "
                "analytical calculations."
            ),
            evidence_reference=(
                "Inventory analytics project notes"
            ),
        )

        get_or_create_failure(
            db=db,
            project_id=project_4.id,
            failure_type="design_iteration",
            failure_description=(
                "Initial interface prototype had low "
                "readability because typography and "
                "spacing were too small."
            ),
            root_cause=(
                "Typography scale was not established "
                "during the first design iteration."
            ),
            impact=(
                "Users had difficulty scanning important "
                "interface information."
            ),
            resolution=(
                "Increased typography scale and improved "
                "spacing hierarchy."
            ),
            lessons_learned=(
                "Typography and spacing tokens should be "
                "established during the initial design system phase."
            ),
            preventive_recommendation=(
                "Design systems should define typography "
                "and spacing tokens early."
            ),
            evidence_reference=(
                "Campus experience redesign notes"
            ),
        )

        print("Failure memory ready")

        # ========================================================
        # 12. COMMIT
        # ========================================================

        db.commit()

        print()
        print("==============================================")
        print("             SEED COMPLETE")
        print("==============================================")
        print()

        print("Departments:", db.query(Department).count())
        print("Faculty:", db.query(Faculty).count())
        print("Students:", db.query(Student).count())
        print("Skills:", db.query(Skill).count())
        print("Student Skills:", db.query(StudentSkill).count())
        print("Projects:", db.query(Project).count())
        print("Project Members:", db.query(ProjectMember).count())
        print("Project Skills:", db.query(ProjectSkill).count())
        print("Opportunities:", db.query(Opportunity).count())
        print("Opportunity Skills:", db.query(OpportunitySkill).count())
        print("Failure Memories:", db.query(FailureMemory).count())

        print()
        print("NEXUS development data is ready.")
        print()

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_nexus_data()