from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from models import Student, db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Maganga@localhost/soma'

migrate = Migrate(app, db)

db.init_app(app)

#@app.route("/login", methods=["POST", "GET"])

@app.route('/')
def index():
    return "Code check one two"

@app.route("/students", methods=['GET', 'POST'])
def all_students():
    if request.method == 'GET':
        get_students=[student.to_dict() for student in Student.query.all()]

        response= make_response(jsonify(get_students), 200)

        return response

    elif request.method == 'POST':
        data = request.get_json()
        

        new_student=Student(**data)

        db.session.add(new_student)
        db.session.commit()

        new_dict = new_student.to_dict()

        response = make_response(jsonify(new_dict), 200)

        return response
    
    else:
        return f"Error erfoming action"
    
@app.route('/students/<int:id>', methods=['DELETE', 'PATCH'])
def get_student(id):
    student = Student.query.filter_by(id = id).first()

    if request.method == 'PATCH':
        for attr, value in request.form.items():
            setattr(student, attr, value)

        db.session.commit()
        
        new_dict = student.to_dict()

        response = make_response(jsonify(new_dict), 200)

        return response
    
    elif request.method == 'DELETE':
        db.session.delete(student)
        db.session.commit()

        return jsonify({"message": "Student deleted succesfully"})



if __name__ == "__main__":
    app.run(port=5555, debug=True)