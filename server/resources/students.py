from flask_restful import Resource, reqparse, fields, marshal_with, request
from models import db, StudentModel

resource_fields = {
    'id': fields.Integer,
    'first_name': fields.String,
    'last_name': fields.String,
    'gender': fields.String,
    'parent_id': fields.Integer,
    'class_name': fields.String,
    'created_at': fields.DateTime,
    'updated_at': fields.DateTime,
}

class Student(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('first_name', required=True, help="First name is required")
    parser.add_argument('last_name', required=True, help="Last name is required")
    parser.add_argument('gender', required=True, help="Gender is required")
    parser.add_argument('parent_id', required=True, help="Parent ID is required")
    parser.add_argument('class_name', required=True, help="Class name is required")

    @marshal_with(resource_fields)
    def get(self, id=None):
        if id:
            student = StudentModel.query.filter_by(id=id).first()
            return student
        else:
            students = StudentModel.query.all()
            return students

    def post(self):
        data = Student.parser.parse_args()
        student = StudentModel(**data)

        try:
            db.session.add(student)
            db.session.commit()
            return {"message": "Student added successfully", "status": "success"}
        except Exception as e:
            return {"message": "Unable to add student", "status": "fail"}
        
    def patch(self,id):
        student = StudentModel.query.filter(StudentModel.id == id).first()
        
        if not student:
            return {'message':'Student not found'},404
        
        data = request.get_json()
        
        for attr in data:
            setattr(student, attr, data[attr])
            
        db.session.add(student)
        db.session.commit()
        
        return {"message":"Student updated successfully"},200

    def delete(self, id):
        try:
            student = StudentModel.query.filter_by(id=id).first()
            if student:
                db.session.delete(student)
                db.session.commit()
                return {"message": "Student deleted successfully", "status": "success"}
            else:
                return {"message": "Student not found", "status": "fail"}
        except:
            return {"message": "Unable to delete student", "status": "fail"}
