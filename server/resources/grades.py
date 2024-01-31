from flask_restful import Resource, reqparse, fields, marshal_with
from models import db, GradeModel

resource_fields = {
    'id': fields.Integer,
    'student_id': fields.Integer,
    'mathematics': fields.Integer,
    'english': fields.Integer,
    'science': fields.Integer,
    'kiswahili': fields.Integer,
    'social_studies': fields.Integer,
    'religious_education': fields.Integer,
    'total': fields.Integer,
    'created_at': fields.DateTime,
    'updated_at': fields.DateTime,
}

class Grade(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('student_id', required=True, help="Student ID is required")
    parser.add_argument('mathematics', required=True, help="Mathematics score is required")
    parser.add_argument('english', required=True, help="English score is required")
    parser.add_argument('science', required=True, help="Science score is required")
    parser.add_argument('kiswahili', required=True, help="Kiswahili score is required")
    parser.add_argument('social_studies', required=True, help="Social Studies score is required")
    parser.add_argument('religious_education', required=True, help="Religious Education score is required")

    @marshal_with(resource_fields)
    def get(self, id=None):
        if id:
            grade = GradeModel.query.filter_by(id=id).first()
            return grade
        else:
            grades = GradeModel.query.all()
            return grades

    def post(self):
        data = Grade.parser.parse_args()
        grade = GradeModel(**data)

        try:
            db.session.add(grade)
            db.session.commit()
            return {"message": "Grade added successfully", "status": "success"}
        except Exception as e:
            return {"message": "Unable to add grade", "status": "fail"}

    def delete(self, id):
        try:
            grade = GradeModel.query.filter_by(id=id).first()
            if grade:
                db.session.delete(grade)
                db.session.commit()
                return {"message": "Grade deleted successfully", "status": "success"}
            else:
                return {"message": "Grade not found", "status": "fail"}
        except:
            return {"message": "Unable to delete grade", "status": "fail"}
