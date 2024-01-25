from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)
SECRET_KEY = '4567'  # Replace with a secure secret key

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    # Check login credentials
    if data['email'] == 'admin@gmail.com' and data['password'] == 'password':
        # Create JWT token
        expiration_time = datetime.utcnow() + timedelta(hours=1)
        token = jwt.encode({'email': data['email'], 'exp': expiration_time}, SECRET_KEY, algorithm='HS256')

        return jsonify({"success": True, "message": "Login successful", "token": token}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)
