from typing import Any

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import PyJWKClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.roles import UserRole
from app.database.connection import get_db
from app.models.user import User


# ============================================================
# HTTP AUTHENTICATION
# ============================================================

security = HTTPBearer(auto_error=False)


# ============================================================
# SUPABASE JWKS
# ============================================================

def get_jwks_url() -> str:
    """
    Return the Supabase JWKS endpoint used for JWT
    signature verification.
    """

    return (
        f"{settings.SUPABASE_URL}"
        "/auth/v1/.well-known/jwks.json"
    )


# ============================================================
# JWT VERIFICATION
# ============================================================

def verify_token(token: str) -> dict[str, Any]:
    """
    Verify a Supabase JWT and return its decoded payload.

    Validation includes:

        - JWT signature
        - Supported signing algorithm
        - Audience
        - Issuer
        - Token expiration
    """

    try:
        jwks_client = PyJWKClient(
            get_jwks_url()
        )

        signing_key = (
            jwks_client
            .get_signing_key_from_jwt(token)
        )

        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=[
                "RS256",
                "ES256",
            ],
            audience="authenticated",
            issuer=(
                f"{settings.SUPABASE_URL}"
                "/auth/v1"
            ),
        )

        return payload

    except jwt.ExpiredSignatureError:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token has expired",
        )

    except jwt.InvalidTokenError:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
        )

    except Exception:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unable to authenticate user",
        )


# ============================================================
# CURRENT SUPABASE USER
# ============================================================

def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(
        security
    ),
) -> dict[str, Any]:
    """
    Extract and verify the Bearer token supplied
    by the client.

    Returns:
        Decoded Supabase JWT payload.
    """

    if credentials is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
        )

    if not credentials.credentials:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token missing",
        )

    return verify_token(
        credentials.credentials
    )


# ============================================================
# CURRENT SUPABASE USER ID
# ============================================================

def get_current_user_id(
    current_user: dict[str, Any] = Depends(
        get_current_user
    ),
) -> str:
    """
    Return the authenticated Supabase user's UUID.
    """

    user_id = current_user.get("sub")

    if not user_id:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=(
                "User ID missing from "
                "authentication token"
            ),
        )

    return user_id


# ============================================================
# CURRENT NEXUS USER
# ============================================================

def get_current_nexus_user(
    current_user: dict[str, Any] = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
) -> User:
    """
    Convert an authenticated Supabase user into
    the corresponding NEXUS user.

    Authentication flow:

        Supabase JWT
              ↓
        Supabase user UUID
              ↓
        NEXUS users table
              ↓
        Active NEXUS User
    """

    supabase_user_id = current_user.get("sub")

    if not supabase_user_id:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=(
                "User ID missing from "
                "authentication token"
            ),
        )

    user = (
        db.query(User)
        .filter(
            User.supabase_user_id == supabase_user_id
        )
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="NEXUS user profile not found",
        )

    if not user.is_active:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="NEXUS user account is inactive",
        )

    return user


# ============================================================
# CURRENT NEXUS USER ROLE
# ============================================================

def get_user_role(
    current_user: User = Depends(
        get_current_nexus_user
    ),
) -> str:
    """
    Return the role assigned to the
    authenticated NEXUS user.
    """

    return current_user.role


# ============================================================
# ROLE-BASED ACCESS CONTROL
# ============================================================

def require_roles(*allowed_roles: UserRole):
    """
    Create a reusable dependency that allows
    only the specified NEXUS roles.

    Example:

        Depends(
            require_roles(
                UserRole.ADMIN
            )
        )

    Multiple roles:

        Depends(
            require_roles(
                UserRole.FACULTY,
                UserRole.HOD,
                UserRole.ADMIN,
            )
        )
    """

    allowed_role_values = {
        role.value
        if isinstance(role, UserRole)
        else role
        for role in allowed_roles
    }

    def role_checker(
        current_user: User = Depends(
            get_current_nexus_user
        ),
    ) -> User:
        """
        Verify that the authenticated NEXUS user
        has one of the required roles.
        """

        if current_user.role not in allowed_role_values:

            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=(
                    "You do not have permission "
                    "to access this resource"
                ),
            )

        return current_user

    return role_checker