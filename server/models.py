#models.py

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import func
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class StudentModel(db.Model, SerializerMixin):
    __tablename__ = 'students'
    
    serialize_rules = ('-student_grades',)

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25), nullable=False)
    gender = db.Column(db.String, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'))
    class_name = db.Column(db.String(25), db.ForeignKey('classes.name'))
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())
    updated_at = db.Column(db.TIMESTAMP, onupdate=db.func.now())

    student_grades = db.relationship('GradeModel', backref='student')
    
    @validates('first_name', "last_name")
    def name_validation(self, key, value  ):
        if len(value) < 2:
            raise ValueError(f'{key} is too short ')
        
        #if not value.isalpha():
            #raise ValueError(f'{key} must be alphabets')
        
        return value
        
    def __repr__(self):
        return f'<Student:{self.first_name} {self.last_name}> '

class ParentModel(db.Model, SerializerMixin):
    __tablename__ = 'parents'
    
    serialize_rules=('-student_parent',)

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25), nullable=False)
    gender = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())
    updated_at = db.Column(db.TIMESTAMP, onupdate=db.func.now())

    student_parent = db.relationship('StudentModel', backref='parent')


class TeacherModel(db.Model):
    __tablename__ = 'teachers'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25), nullable=False)
    gender = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(25), nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())
    updated_at = db.Column(db.TIMESTAMP, onupdate=db.func.now())

    
class ClassModel(db.Model, SerializerMixin):
    __tablename__ = 'classes'
    
    serialize_rules = ('-class_students','-class_teacher')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False, unique=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())
    updated_at = db.Column(db.TIMESTAMP, onupdate=db.func.now())

    class_students = db.relationship('StudentModel', backref='class')
    class_teacher = db.relationship('TeacherModel', backref='class')


class GradeModel(db.Model):
    __tablename__ = 'grades'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    mathematics = db.Column(db.Integer, nullable=False)
    english = db.Column(db.Integer, nullable=False)
    science = db.Column(db.Integer, nullable=False)
    kiswahili = db.Column(db.Integer, nullable=False)
    social_studies = db.Column(db.Integer, nullable=False)
    religious_education = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())
    updated_at = db.Column(db.TIMESTAMP, onupdate=db.func.now())

    
