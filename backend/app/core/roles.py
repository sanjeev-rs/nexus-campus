from enum import Enum


class UserRole(str, Enum):
    STUDENT = "student"
    FACULTY = "faculty"
    HOD = "hod"
    ADMIN = "admin"
    MANAGEMENT = "management"
    SUPER_ADMIN = "super_admin"