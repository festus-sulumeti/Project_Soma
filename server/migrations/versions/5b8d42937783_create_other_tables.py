"""Create other tables

Revision ID: 5b8d42937783
Revises: 208536da0b73
Create Date: 2024-01-27 23:06:38.438308

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '5b8d42937783'
down_revision = '208536da0b73'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('parents',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=25), nullable=False),
    sa.Column('last_name', sa.String(length=25), nullable=False),
    sa.Column('gender', sa.String(), nullable=False),
    sa.Column('phone_number', sa.String(length=25), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.TIMESTAMP(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('teachers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=25), nullable=False),
    sa.Column('last_name', sa.String(length=25), nullable=False),
    sa.Column('gender', sa.String(), nullable=False),
    sa.Column('phone_number', sa.String(length=25), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('role', sa.String(length=25), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.TIMESTAMP(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('classes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=25), nullable=False),
    sa.Column('teacher_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.TIMESTAMP(), nullable=True),
    sa.ForeignKeyConstraint(['teacher_id'], ['teachers.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('grades',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.Column('mathematics', sa.Integer(), nullable=False),
    sa.Column('english', sa.Integer(), nullable=False),
    sa.Column('science', sa.Integer(), nullable=False),
    sa.Column('kiswahili', sa.Integer(), nullable=False),
    sa.Column('social_studies', sa.Integer(), nullable=False),
    sa.Column('religious_education', sa.Integer(), nullable=False),
    sa.Column('total', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.TIMESTAMP(), nullable=True),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('students', schema=None) as batch_op:
        batch_op.add_column(sa.Column('parent_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('class_name', sa.String(length=25), nullable=True))
        batch_op.add_column(sa.Column('updated_at', sa.TIMESTAMP(), nullable=True))
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('gender',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.create_foreign_key(None, 'classes', ['class_name'], ['name'])
        batch_op.create_foreign_key(None, 'parents', ['parent_id'], ['id'])
        batch_op.drop_column('update_at')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('students', schema=None) as batch_op:
        batch_op.add_column(sa.Column('update_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('gender',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.drop_column('updated_at')
        batch_op.drop_column('class_name')
        batch_op.drop_column('parent_id')

    op.drop_table('grades')
    op.drop_table('classes')
    op.drop_table('teachers')
    op.drop_table('parents')
    # ### end Alembic commands ###
