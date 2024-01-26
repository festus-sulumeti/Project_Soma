#app.py

from flask import Flask, make_response, jsonify, request
from models import StudentModel, db
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta
from flask_migrate import Migrate
from flask_restful import Api
from resources.teachers import Teacher

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///soma.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)
CORS(app)
SECRET_KEY = '4567'  # Replace with a secure secret key

@app.route("/")
def index():
    return "<h1>Welcome to Soma!</h1>"

api.add_resource(Teacher, '/teacher', '/teacher/<int:id>') 

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    # Check login credentials
    if data['email'] == 'admin@gmail.com' and data['password'] == 'password':
        expiration_time = datetime.utcnow() + timedelta(hours=1)
        token = jwt.encode({'email': data['email'], 'exp': expiration_time}, SECRET_KEY, algorithm='HS256')

        return jsonify({"success": True, "message": "Login successful", "token": token}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route("/students", methods=['GET', 'POST'])
def all_students():
    if request.method == 'GET':
        get_students=[student.to_dict() for student in StudentModel.query.all()]

        response= make_response(jsonify(get_students), 200)

        return response

    elif request.method == 'POST':
        data = request.get_json()
        

        new_student=StudentModel(**data)

        db.session.add(new_student)
        db.session.commit()

        new_dict = new_student.to_dict()

        response = make_response(jsonify(new_dict), 200)

        return response
    
    else:
        return f"Error perfoming action"
    
@app.route('/students/<int:id>', methods=['DELETE', 'PATCH'])
def get_student(id):
    student = StudentModel.query.filter_by(id = id).first()

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


# New routes for parents
@app.route('/add_parent', methods=['POST'])
def add_parent():
    data = request.get_json()

    new_parent = ParentModel(
        first_name=data['first_name'],
        last_name=data['last_name'],
        phone_number=data['phone_number'],
        email=data['email'],
        gender=data['gender']
    )

    db.session.add(new_parent)
    db.session.commit()

    return jsonify({'message': 'Parent added successfully'}), 201

@app.route('/remove_parent/<int:parent_id>', methods=['DELETE'])
def remove_parent(parent_id):
    parent = ParentModel.query.get(parent_id)

    if parent:
        db.session.delete(parent)
        db.session.commit()
        return jsonify({'message': 'Parent removed successfully'}), 200
    else:
        return jsonify({'message': 'Parent not found'}), 404

if __name__ == "__main__":
    app.run(port=5555, debug=True)
