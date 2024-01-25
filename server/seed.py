from models import db, StudentModel, ParentModel, TeacherModel, GradeModel, ClassModel
from app import app 
from random import choice as rc
from faker import Faker
import random

fake = Faker()

with app.app_context():

    StudentModel.query.delete()
    ParentModel.query.delete()
    TeacherModel.query.delete()
    GradeModel.query.delete()

    students = []
    parents = []
    teachers = []
    grades = []
    classes = []

    GENDER = ['male', 'female']
    ROLE= ['ClassTeacher', 'MathsTeacher', 'ScienceTeacher', "SocialsTeacher", "LanguagesTeacher"]
    streams= ['Grade 1 East','Grade 1 West', 'Grade 2 East', 'Grade 2 West']

    for _ in range(50):

        fake_parent = ParentModel(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            gender=rc(GENDER),
            phone_number=fake.phone_number(),
            email=fake.email()
        )
        parents.append(fake_parent)

        db.session.add_all(parents)
        db.session.commit()

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

        fake_class = ClassModel(
            name=rc(streams),
            teacher_id=rc(teachers).id
        )
        classes.append(fake_class)

        db.session.add_all(classes)
        db.session.commit()

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
