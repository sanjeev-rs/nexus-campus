from pathlib import Path


# =========================================================
# STORAGE BUCKETS
# =========================================================

STUDENT_DOCUMENTS_BUCKET = "student-documents"

PROJECT_EVIDENCE_BUCKET = "project-evidence"

PROFILE_ASSETS_BUCKET = "profile-assets"

RESEARCH_FILES_BUCKET = "research-files"


# =========================================================
# FILE SIZE LIMIT
# =========================================================

MAX_FILE_SIZE = 50 * 1024 * 1024  # 50 MB


# =========================================================
# ALLOWED FILE TYPES
# =========================================================

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
    ".xls",
    ".xlsx",
    ".csv",
    ".txt",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".zip",
}


# =========================================================
# ALLOWED MIME TYPES
# =========================================================

ALLOWED_CONTENT_TYPES = {
    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/vnd.ms-powerpoint",

    "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    "application/vnd.ms-excel",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    "text/csv",

    "text/plain",

    "image/png",

    "image/jpeg",

    "image/webp",

    "application/zip",

    "application/x-zip-compressed",
}