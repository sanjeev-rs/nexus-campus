from app.core.roles import UserRole


# ============================================================
# BASIC ROLE GROUPS
# ============================================================

STUDENT_ROLES = (
    UserRole.STUDENT,
)

FACULTY_ROLES = (
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

HOD_ROLES = (
    UserRole.HOD,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

MANAGEMENT_ROLES = (
    UserRole.MANAGEMENT,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

ADMIN_ROLES = (
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

ALL_ROLES = (
    UserRole.STUDENT,
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.MANAGEMENT,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)


# ============================================================
# READ ACCESS
# ============================================================

READ_STUDENT_DATA = (
    UserRole.STUDENT,
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.MANAGEMENT,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

READ_PROJECT_DATA = (
    UserRole.STUDENT,
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.MANAGEMENT,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

READ_OPPORTUNITY_DATA = (
    UserRole.STUDENT,
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.MANAGEMENT,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

READ_INTELLIGENCE = (
    UserRole.STUDENT,
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.MANAGEMENT,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

READ_CAMPUS_INTELLIGENCE = (
    UserRole.HOD,
    UserRole.MANAGEMENT,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

READ_DECISION_INTELLIGENCE = (
    UserRole.HOD,
    UserRole.MANAGEMENT,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

READ_KNOWLEDGE_GRAPH = (
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.MANAGEMENT,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

READ_GRAPH_INTELLIGENCE = (
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.MANAGEMENT,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)


# ============================================================
# WRITE ACCESS
# ============================================================

WRITE_STUDENT_DATA = (
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

WRITE_PROJECT_DATA = (
    UserRole.STUDENT,
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

WRITE_OPPORTUNITY_DATA = (
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

WRITE_ACADEMIC_DATA = (
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)

WRITE_FAILURE_MEMORY = (
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)


# ============================================================
# SYSTEM ADMINISTRATION
# ============================================================

SYSTEM_ADMIN = (
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
)