
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from resources.teachers import Teacher

from models import db


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

if __name__ == '__main__':
    app.run(debug=True)

