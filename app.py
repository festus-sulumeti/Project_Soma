from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///parents.db'
db = SQLAlchemy(app)

class Parent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    phone_number = db.Column(db.Integer)
    email = db.Column(db.String(255))
    gender = db.Column(db.Boolean)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

# Create the database tables inside an application context
with app.app_context():
    db.create_all()

@app.route('/add_parent', methods=['POST'])
def add_parent():
    data = request.get_json()

    new_parent = Parent(
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
    parent = Parent.query.get(parent_id)

    if parent:
        db.session.delete(parent)
        db.session.commit()
        return jsonify({'message': 'Parent removed successfully'}), 200
    else:
        return jsonify({'message': 'Parent not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
