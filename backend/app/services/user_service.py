from sqlalchemy.orm import Session

from app.core.roles import UserRole
from app.models.user import User


# ============================================================
# USER LOOKUP
# ============================================================

def get_user_by_supabase_id(
    db: Session,
    supabase_user_id: str,
):
    """
    Find a NEXUS user using the Supabase Auth user UUID.
    """

    return (
        db.query(User)
        .filter(
            User.supabase_user_id == supabase_user_id
        )
        .first()
    )


def get_user_by_id(
    db: Session,
    user_id: int,
):
    """
    Find a NEXUS user using the internal NEXUS user ID.
    """

    return (
        db.query(User)
        .filter(
            User.id == user_id
        )
        .first()
    )


# ============================================================
# ROLE VALIDATION
# ============================================================

def validate_role(role: str) -> str:
    """
    Validate that the supplied role is a valid NEXUS role.
    """

    valid_roles = {
        user_role.value
        for user_role in UserRole
    }

    if role not in valid_roles:
        raise ValueError(
            f"Invalid NEXUS role: {role}"
        )

    return role


# ============================================================
# CREATE USER
# ============================================================

def create_user(
    db: Session,
    supabase_user_id: str,
    role: str = UserRole.STUDENT.value,
    student_id: int | None = None,
    faculty_id: int | None = None,
):
    """
    Create a NEXUS user mapped to a Supabase Auth user.

    If the Supabase user already exists in NEXUS,
    the existing user is returned.
    """

    role = validate_role(role)

    # A NEXUS account should represent either
    # a student or a faculty member, not both.
    if student_id is not None and faculty_id is not None:
        raise ValueError(
            "A NEXUS user cannot be mapped to both "
            "a student and a faculty member"
        )

    existing_user = get_user_by_supabase_id(
        db,
        supabase_user_id,
    )

    if existing_user:
        return existing_user

    user = User(
        supabase_user_id=supabase_user_id,
        role=role,
        student_id=student_id,
        faculty_id=faculty_id,
        is_active=True,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


# ============================================================
# UPDATE USER ROLE
# ============================================================

def update_user_role(
    db: Session,
    supabase_user_id: str,
    role: str,
):
    """
    Update the NEXUS role assigned to a Supabase user.
    """

    role = validate_role(role)

    user = get_user_by_supabase_id(
        db,
        supabase_user_id,
    )

    if not user:
        return None

    user.role = role

    db.commit()
    db.refresh(user)

    return user


# ============================================================
# UPDATE USER MAPPING
# ============================================================

def update_user_mapping(
    db: Session,
    supabase_user_id: str,
    student_id: int | None = None,
    faculty_id: int | None = None,
):
    """
    Update the relationship between a NEXUS user
    and a Student or Faculty record.

    A user may be mapped to either:

        Student
        OR
        Faculty

    but not both.
    """

    if student_id is not None and faculty_id is not None:
        raise ValueError(
            "A NEXUS user cannot be mapped to both "
            "a student and a faculty member"
        )

    user = get_user_by_supabase_id(
        db,
        supabase_user_id,
    )

    if not user:
        return None

    user.student_id = student_id
    user.faculty_id = faculty_id

    db.commit()
    db.refresh(user)

    return user


# ============================================================
# DEACTIVATE USER
# ============================================================

def deactivate_user(
    db: Session,
    supabase_user_id: str,
):
    """
    Deactivate a NEXUS user without deleting
    the underlying user record.
    """

    user = get_user_by_supabase_id(
        db,
        supabase_user_id,
    )

    if not user:
        return None

    user.is_active = False

    db.commit()
    db.refresh(user)

    return user