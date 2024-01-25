from flask import Flask, make_response, jsonify, request
from models import StudentModel, db
from flask_cors import CORS
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

@app.route("/")
def index():
    return "<h1>Welcome to Soma!</h1>"


api.add_resource(Teacher, '/teacher', '/teacher/<int:id>') 

@app.route('/login', methods=['POST', 'GET'])
def login():
    data = request.json

    # Check if 'email' and 'password' are present in the request data
    if 'email' not in data or 'password' not in data:
        return jsonify({"error": "Invalid request"}), 400

    # Check if 'email' is a valid email address
    if '@' not in data['email']:
        return jsonify({"error": "Invalid email address"}), 400

    # Check if 'password' has at least 6 characters
    if len(data['password']) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400

    # Check login credentials
    if data['email'] == 'admin@gmail.com' and data['password'] == 'password':
        return jsonify({"success": True, "message": "Login successful"}), 200
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



if __name__ == "__main__":
    app.run(port=5555, debug=True)


