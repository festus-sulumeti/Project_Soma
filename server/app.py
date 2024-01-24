from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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