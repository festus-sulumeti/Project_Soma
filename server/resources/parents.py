#parents.py

from flask_restful import Resource, reqparse, fields, marshal_with
from models import db, ParentModel

resource_fields = {
    'id': fields.Integer,
    'first_name': fields.String,
    'last_name': fields.String,
    'gender': fields.String,
    'phone_number': fields.String,
    'email': fields.String,
    'created_at': fields.DateTime,
    'updated_at': fields.DateTime,
}

class Parent(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('first_name', required=True, help="First name is required")
    parser.add_argument('last_name', required=True, help="Last name is required")
    parser.add_argument('gender', required=True, help="Gender is required")
    parser.add_argument('phone_number', required=True, help="Phone number is required")
    parser.add_argument('email', required=True, help="Email address is required")

    @marshal_with(resource_fields)
    def get(self, id=None):
        if id:
            parent = ParentModel.query.filter_by(id=id).first()
            return parent
        else:
            parents = ParentModel.query.all()
            return parents

    def post(self):
        data = Parent.parser.parse_args()
        parent = ParentModel(**data)

        try:
            db.session.add(parent)
            db.session.commit()
            return {"message": "Parent added successfully", "status": "success"}
        except Exception as e:
            return {"message": "Unable to add parent", "status": "fail"}

    def delete(self, id):
        try:
            parent = ParentModel.query.filter_by(id=id).first()
            if parent:
                db.session.delete(parent)
                db.session.commit()
                return {"message": "Parent deleted successfully", "status": "success"}
            else:
                return {"message": "Parent not found", "status": "fail"}
        except:
            return {"message": "Unable to delete parent", "status": "fail"}
