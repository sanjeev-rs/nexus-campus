"""add enrollments

Revision ID: 64cfef6772aa
Revises: 679a4e619365
Create Date: 2026-09-10 19:03:20.029990

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '64cfef6772aa'
down_revision: Union[str, Sequence[str], None] = '679a4e619365'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create enrollments table."""
    op.create_table(
        "enrollments",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("course_id", sa.Integer(), nullable=False),
        sa.Column("academic_year_id", sa.Integer(), nullable=False),
        sa.Column("semester", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(length=30), nullable=False),
        sa.ForeignKeyConstraint(
            ["student_id"],
            ["students.id"],
        ),
        sa.ForeignKeyConstraint(
            ["course_id"],
            ["courses.id"],
        ),
        sa.ForeignKeyConstraint(
            ["academic_year_id"],
            ["academic_years.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        op.f("ix_enrollments_id"),
        "enrollments",
        ["id"],
        unique=False,
    )


def downgrade() -> None:
    """Drop enrollments table."""
    op.drop_index(
        op.f("ix_enrollments_id"),
        table_name="enrollments",
    )
    op.drop_table("enrollments")
