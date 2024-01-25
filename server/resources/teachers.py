from flask_restful import Resource, reqparse, fields, marshal_with
from models import db, TeacherModel

resource_fields = {
    'id': fields.Integer,
    'first_name': fields.String,
    'last_name': fields.String,
    'gender': fields.String,
    'phone_number': fields.String,
    'email': fields.String,
    'role': fields.String,
    'created_at': fields.DateTime,
    'updated_at': fields.DateTime,
}

class Teacher(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('first_name', required=True, help="First name is required")
    parser.add_argument('last_name', required=True, help="Last name is required")
    parser.add_argument('gender', required=True, help="Gender is required")
    parser.add_argument('phone_number', required=True, help="Phone number is required")
    parser.add_argument('email', required=True, help="Email address is required")
    parser.add_argument('role', required=True, help="Role is required")
    

    @marshal_with(resource_fields)
    def get(self, id=None):
        if id:
            teacher = TeacherModel.query.filter_by(id=id).first()

            return teacher
        else:
            teachers = TeacherModel.query.all()

            return teachers
        

    def post(self):
        data = Teacher.parser.parse_args()
        teacher = TeacherModel(**data)

        try:
            db.session.add(teacher)
            db.session.commit()

            return {"message": "Teacher added successfully", "status": "success"}
        except:
            return {"message": "Unable to add teacher", "status": "fail"}
        
    def delete(self, id):
        try:
            teacher = TeacherModel.query.filter_by(id=id).first()

            if teacher:
               db.session.delete(teacher)
               db.session.commit()
               return {"message": "Teacher deleted successfully", "status": "success"}
            else:
                return {"message": "Teacher not found", "status": "fail"}
        except:
            return {"message": "Unable to delete teacher", "status": "fail"}

