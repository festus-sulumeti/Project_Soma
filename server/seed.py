from models import db, StudentModel, ParentModel, TeacherModel, GradeModel, ClassModel
from app import app, bcrypt
from random import choice as rc
from faker import Faker
import random
from flask_bcrypt import generate_password_hash

fake = Faker()

with app.app_context():

    StudentModel.query.delete()
    ClassModel.query.delete()
    ParentModel.query.delete()
    GradeModel.query.delete()
    TeacherModel.query.delete()
    
    students = []
    parents = []
    teachers = []
    grades = []
    classes = []

    GENDER = ['male', 'female']
    ROLE= ['ClassTeacher', 'MathsTeacher', 'ScienceTeacher', "SocialsTeacher", "LanguagesTeacher"]
    streams= ['Grade 1 East','Grade 1 West', 'Grade 2 East', 'Grade 2 West']
    
    print("Generating teachers...")
    for _ in range(15):
        fake_teacher = TeacherModel(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            gender=rc(GENDER),
            phone_number=fake.phone_number(),
            email=fake.email(),
            role = rc(ROLE)
        )
        teachers.append(fake_teacher)

        db.session.add_all(teachers)
        db.session.commit()
    
    print("Generating classes...")
    for stream in streams:
        
        fake_class = ClassModel(
            name=stream,
            teacher_id=rc(teachers).id
        )
        classes.append(fake_class)

        db.session.add_all(classes)
        db.session.commit()

    print("Generating parents...")
    for _ in range(10):
        first_name=fake.first_name()
        last_name=fake.last_name()
        password = bcrypt.generate_password_hash(f"{first_name}{last_name}").decode('utf-8')

        fake_parent = ParentModel(
            first_name=first_name,
            last_name=last_name,
            password=password,
            gender=rc(GENDER),
            phone_number=fake.phone_number(),
            email=fake.email()
        )
        
        parents.append(fake_parent)

        db.session.add_all(parents)
        db.session.commit()

        

    print("Generating students...")
    for _ in range(20):
        fake_student = StudentModel(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            gender=rc(GENDER),
            parent_id=rc(parents).id,
            class_name=rc(classes).name
        )
        students.append(fake_student)

        db.session.add_all(students)
        db.session.commit()

    db.session.commit()
    print("Done seeding")