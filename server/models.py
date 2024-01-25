from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class StudentModel(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25), nullable=False)
    gender = db.Column(db.String, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'), nullable=False)
    class_name = db.Column(db.String(25), db.ForeignKey('classes.name'), nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())
    updated_at = db.Column(db.TIMESTAMP, onupdate=db.func.now())

    student_grades = db.relationship('GradeModel', backref='student')

   

class ParentModel(db.Model):
    __tablename__ = 'parents'

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

    
class ClassModel(db.Model):
    __tablename__ = 'classes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
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

   


    

    









