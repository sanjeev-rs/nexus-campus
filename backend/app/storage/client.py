from supabase import Client, create_client

from app.core.config import settings


def get_supabase_client() -> Client:
    """
    Create and return the Supabase client
    for server-side NEXUS operations.
    """

    if not settings.SUPABASE_URL:
        raise RuntimeError("SUPABASE_URL is not configured")

    if not settings.SUPABASE_SERVICE_ROLE_KEY:
        raise RuntimeError(
            "SUPABASE_SERVICE_ROLE_KEY is not configured"
        )

    return create_client(
        settings.SUPABASE_URL,
        settings.SUPABASE_SERVICE_ROLE_KEY,
    )


supabase: Client = get_supabase_client()