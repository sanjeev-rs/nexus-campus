"""add departments and link students

Revision ID: b31a5f0a4cf8
Revises: b71af0b244fb
Create Date: 2026-09-09 22:18:53.153772

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "b31a5f0a4cf8"
down_revision: Union[str, Sequence[str], None] = "b71af0b244fb"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""


    # ---------------------------------------------------------
    # 2. Add department_id temporarily as nullable
    # ---------------------------------------------------------

    op.add_column(
        "students",
        sa.Column(
            "department_id",
            sa.Integer(),
            nullable=True,
        ),
    )

    # ---------------------------------------------------------
    # 3. Create departments from existing student data
    # ---------------------------------------------------------

    connection = op.get_bind()

    connection.execute(
        sa.text(
            """
            INSERT INTO departments (code, name, description)
            SELECT
                'D' || substr(md5(department), 1, 19),
                department,
                NULL
            FROM students
            WHERE department IS NOT NULL
            GROUP BY department
            ON CONFLICT (name) DO NOTHING
            """
        )
    )

    # ---------------------------------------------------------
    # 4. Connect existing students to departments
    # ---------------------------------------------------------

    connection.execute(
        sa.text(
            """
            UPDATE students
            SET department_id = departments.id
            FROM departments
            WHERE students.department = departments.name
            """
        )
    )

    # ---------------------------------------------------------
    # 5. Make department_id required
    # ---------------------------------------------------------

    op.alter_column(
        "students",
        "department_id",
        existing_type=sa.Integer(),
        nullable=False,
    )

    # ---------------------------------------------------------
    # 6. Add foreign key
    # ---------------------------------------------------------

    op.create_foreign_key(
        "fk_students_department_id",
        "students",
        "departments",
        ["department_id"],
        ["id"],
    )

    # ---------------------------------------------------------
    # 7. Remove old department text column
    # ---------------------------------------------------------
def downgrade() -> None:
    """Downgrade schema."""

    # Add the old department column back
    op.add_column(
        "students",
        sa.Column(
            "department",
            sa.String(length=100),
            nullable=True,
        ),
    )

    connection = op.get_bind()

    # Restore department names
    connection.execute(
        sa.text(
            """
            UPDATE students
            SET department = departments.name
            FROM departments
            WHERE students.department_id = departments.id
            """
        )
    )

    # Make department required again
    op.alter_column(
        "students",
        "department",
        existing_type=sa.String(length=100),
        nullable=False,
    )

    # Remove foreign key
    op.drop_constraint(
        "fk_students_department_id",
        "students",
        type_="foreignkey",
    )

    # Remove department_id
    op.drop_column(
        "students",
        "department_id",
    )