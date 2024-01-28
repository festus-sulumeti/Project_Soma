from models import db, StudentModel, ParentModel, TeacherModel, GradeModel, ClassModel
from app import app 
from random import choice as rc
from faker import Faker

fake = Faker()

with app.app_context():

    StudentModel.query.delete()
    ParentModel.query.delete()
    TeacherModel.query.delete()
    GradeModel.query.delete()
    ClassModel.query.delete()

    students = []
    parents = []
    teachers = []
    grades = []
    classes = []

    GENDER = ['male', 'female']
    ROLE = ['ClassTeacher', 'MathsTeacher', 'ScienceTeacher', "SocialsTeacher", "LanguagesTeacher"]
    streams = ['Grade 1 East', 'Grade 1 West', 'Grade 2 East', 'Grade 2 West']

    # Create teachers first
    for _ in range(5):
        fake_teacher = TeacherModel(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            gender=rc(GENDER),
            phone_number=fake.phone_number(),
            email=fake.email(),
            role=rc(ROLE)
        )
        teachers.append(fake_teacher)

    db.session.add_all(teachers)
    db.session.commit()

    # Create classes and associate each class with a teacher
    for stream in streams:
        teacher = rc(teachers)
        fake_class = ClassModel(
            name=stream,
            teacher_id=teacher.id
        )
        classes.append(fake_class)

    db.session.add_all(classes)
    db.session.commit()

    for _ in range(50):
        fake_parent = ParentModel(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            gender=rc(GENDER),
            phone_number=fake.phone_number(),
            email=fake.email()
        )
        parents.append(fake_parent)

        fake_student = StudentModel(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            gender=rc(GENDER),
            parent_id=rc(parents).id,
            class_name=rc(classes).name
        )
        students.append(fake_student)

        fake_grades = GradeModel(
            student_id=rc(students).id,
            mathematics=rc(range(1, 101)),
            english=rc(range(1, 101)),
            science=rc(range(1, 101)),
            kiswahili=rc(range(1, 101)),
            social_studies=rc(range(1, 101)),
            religious_education=rc(range(1, 101)),
            total=0  # Initialize total to 0
        )

        grades.append(fake_grades)

    # Calculate mean for each student
    for student in students:
        student_grades = [grade.total for grade in grades if grade.student_id == student.id]
        mean_grade = sum(student_grades) / len(student_grades) if len(student_grades) > 0 else 0

        # Update the total field in GradeModel for the corresponding student
        for grade in grades:
            if grade.student_id == student.id:
                grade.total = mean_grade

    # Add all data outside of the loops
    db.session.add_all(parents)
    db.session.add_all(students)
    db.session.add_all(grades)

    # Commit changes to the database
    db.session.commit()
