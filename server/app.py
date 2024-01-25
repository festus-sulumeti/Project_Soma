from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///grades.db'
db = SQLAlchemy(app)

 # simple route for the root URL
@app.route("/")
def home():
    return jsonify({"message": "Welcome to the home page"})


@app.route("/grades", methods=["POST", "GET"])
def manage_grades():
    if request.method == "POST":
        data = request.json

        # Extract data from the request
        student_id = data.get("student_id")
        math = data.get("math")
        english = data.get("english")
        kiswahili = data.get("kiswahili")
        social_studies = data.get("social_studies")
        religious_education = data.get("religious_education")

        # Compute grades based on percentages
        math_grade = compute_grade(math)
        english_grade = compute_grade(english)
        kiswahili_grade = compute_grade(kiswahili)
        social_studies_grade = compute_grade(social_studies)
        religious_education_grade = compute_grade(religious_education)

        # Compute total
        total = math + english + kiswahili + social_studies + religious_education

        # Get current timestamp
        current_time = datetime.utcnow()

        # Create a new Grades object
        new_grades = Grades(
            student_id=student_id,
            math=math,
            english=english,
            kiswahili=kiswahili,
            social_studies=social_studies,
            religious_education=religious_education,
            total=total,
            created_at=current_time,
            updated_at=current_time
        )

        # Add the new grades to the database
        db.session.add(new_grades)
        db.session.commit()

        return jsonify({"message": "Grades recorded successfully"})

    elif request.method == "GET":
        # Retrieve all grades from the database
        all_grades = Grades.query.all()
        grades_list = []

        # Format the grades data for response
        for grades in all_grades:
            grades_data = {
                "id": grades.id,
                "student_id": grades.student_id,
                "math": grades.math,
                "english": grades.english,
                "kiswahili": grades.kiswahili,
                "social_studies": grades.social_studies,
                "religious_education": grades.religious_education,
                "total": grades.total,
                "created_at": grades.created_at,
                "updated_at": grades.updated_at
            }
            grades_list.append(grades_data)

        return jsonify({"grades": grades_list})

def compute_grade(percentage):
    # My grading logic 
    if percentage >= 90:
        return "A"
    elif 80 <= percentage < 90:
        return "B"
    elif 70 <= percentage < 80:
        return "C"
    elif 60 <= percentage < 70:
        return "D"
    else:
        return "F"

# My grading Models
class Grades(db.Model):
    __tablename__ = 'grades'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer)
    math = db.Column(db.Integer)
    english = db.Column(db.Integer)
    kiswahili = db.Column(db.Integer)
    social_studies = db.Column(db.Integer)
    religious_education = db.Column(db.Integer)
    total = db.Column(db.Integer)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)