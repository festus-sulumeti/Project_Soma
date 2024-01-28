#app.py
from flask import Flask, make_response, jsonify, request
from models import StudentModel, ParentModel, db
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta
from flask_migrate import Migrate
from flask_restful import Api
from resources.teachers import Teacher
from config import DATABASE_CONFIG  # Import the config
from itsdangerous import Serializer, TimedJSONWebSignatureSerializer
from flask_mail import Mail, Message

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:Maganga@localhost/somadb"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)
CORS(app)
SECRET_KEY = '4567'  # Replace with a secure secret key

app.config['MAIL_SERVER'] = 'maganga.mwambonu@student.moringaschool.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'Admin'
app.config['MAIL_PASSWORD'] = 'Password'
app.config['MAIL_DEFAULT_SENDER'] = 'maganga.mwambonu@student.moringaschool.com'

mail = Mail(app)


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


        return jsonify({"success": True, "message": "Login successful", "token": token, 'user_email':data['email']}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401


def generate_reset_token(email):
    serializer = TimedJSONWebSignatureSerializer(SECRET_KEY, expires_in=3600)
    reset_token = serializer.dumps({"email": email}).decode('utf-8')
    return reset_token

def send_reset_token(email, reset_token):
    subject = 'Password Confirmation Request'
    body = f"Click the following link to reset your password: {request.url_root}reset_password/{reset_token}"
    recipients = [email]

    try:
        msg = Message(subject=subject, recipients=recipients, body=body)
        mail.send(msg)

        return jsonify({"success": True, "message": "Reset token sent to email"}), 200
    except Exception as e:
        error_message = f"Error sending email: {str(e)}"
        print(error_message) 

        return jsonify({"success": False, "message": error_message}), 500




    

@app.route('/forgot_password', methods=['POST'])
def forgot_password():
    try:
        data = request.json
        user_email = data.get('email')

        user = ParentModel.query.filter_by(email=user_email).first()

        
        try:
                reset_token = generate_reset_token(user_email)
                send_reset_token(user_email, reset_token)

                return jsonify({"success": True, "message": "Reset token sent to email"}), 200
        except Exception as e:
                return jsonify({"success": False, "message": f"Error sending email: {str(e)}"}), 500
    
    except Exception as e:
        return jsonify({"success": False, "message": f"Exception: {str(e)}, failed to reset password"}), 500



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
        json = request.get_json()
        for attr in json:
            setattr(student, attr, json[attr])

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

@app.route('/parents', methods=['GET'])
def getparent():
    new_parent = [parent.to_dict() for parent in ParentModel.query.all()]

    response = make_response(jsonify(new_parent), 200)

    return response
    

if __name__ == "__main__":
    app.run(port=5555, debug=True)
