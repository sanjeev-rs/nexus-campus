from fastapi import APIRouter, Depends

from app.core.security import get_current_nexus_user

from app.schemas.user import UserResponse


router = APIRouter()


# ============================================================
# CURRENT NEXUS USER
# ============================================================

@router.get(
    "/me",
    response_model=UserResponse,
)
def get_my_nexus_user(
    current_user=Depends(
        get_current_nexus_user
    ),
):
    """
    Return the currently authenticated NEXUS user.

    Authentication flow:

        Supabase JWT
              ↓
        Supabase User ID
              ↓
        NEXUS users table
              ↓
        Active NEXUS User
              ↓
             /me
    """

    return current_user