"""add faculty

Revision ID: 75cd7d6ef8e6
Revises: b31a5f0a4cf8
Create Date: 2026-09-10 11:17:57.346704

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "75cd7d6ef8e6"
down_revision: Union[str, Sequence[str], None] = "b31a5f0a4cf8"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.create_table(
        "faculty",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("employee_id", sa.String(length=50), nullable=False),
        sa.Column("name", sa.String(length=150), nullable=False),
        sa.Column("email", sa.String(length=150), nullable=False),
        sa.Column("designation", sa.String(length=100), nullable=False),
        sa.Column("department_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["department_id"],
            ["departments.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email"),
        sa.UniqueConstraint("employee_id"),
    )

    op.create_index(
        op.f("ix_faculty_id"),
        "faculty",
        ["id"],
        unique=False,
    )

    op.execute(
        "ALTER TABLE students DROP COLUMN IF EXISTS department"
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_index(
        op.f("ix_faculty_id"),
        table_name="faculty",
    )

    op.drop_table("faculty")