from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database.connection import test_database_connection


# ============================================================
# V1 API ROUTER
# ============================================================

from app.api.v1.router import router as api_v1_router


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title=settings.APP_NAME,
    description="AI-Powered Campus Intelligence System",
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
)


# ============================================================
# CORS CONFIGURATION
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# NEXUS API V1
# ============================================================

app.include_router(
    api_v1_router,
    prefix="/api/v1",
)


# ============================================================
# ROOT ENDPOINT
# ============================================================

@app.get(
    "/",
    tags=["System"],
)
def root():
    """
    NEXUS API root endpoint.
    """

    return {
        "system": "NEXUS",
        "status": "online",
        "message": "NEXUS backend is running",
        "version": settings.APP_VERSION,
    }


# ============================================================
# APPLICATION HEALTH
# ============================================================

@app.get(
    "/health",
    tags=["System"],
)
def health():
    """
    Basic application health check.
    """

    return {
        "status": "healthy",
        "system": "NEXUS",
    }


# ============================================================
# DATABASE HEALTH
# ============================================================

@app.get(
    "/health/database",
    tags=["System"],
)
def database_health():
    """
    Check connectivity with the NEXUS PostgreSQL database.
    """

    result = test_database_connection()

    return {
        "database": "connected",
        "test_result": result,
    }