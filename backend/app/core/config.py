from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "NEXUS API"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    FRONTEND_URL: str = "http://localhost:3000"

    # =====================================================
    # DATABASE
    # =====================================================

    DB_HOST: str
    DB_PORT: int = 5432
    DB_NAME: str = "postgres"
    DB_USER: str
    DB_PASSWORD: str

    # =====================================================
    # SUPABASE
    # =====================================================

    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str

    # =====================================================
    # AI
    # =====================================================

    OPENAI_API_KEY: str = ""

    AI_PROVIDER: str = "openai"
    AI_MODEL: str = "gpt-4o-mini"

    # =====================================================
    # NEO4J
    # =====================================================

    NEO4J_URI: str = ""
    NEO4J_USERNAME: str = "neo4j"
    NEO4J_PASSWORD: str = ""
    NEO4J_DATABASE: str = "neo4j"

    # =====================================================
    # SETTINGS
    # =====================================================

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()