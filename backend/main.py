from fastapi import FastAPI

app = FastAPI(
    title="NEXUS API",
    description="AI-Powered Campus Intelligence System",
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "system": "NEXUS",
        "status": "online",
        "message": "NEXUS backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }