from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin


db = SQLAlchemy()

class Student(db.Model, SerializerMixin):
    __tablename__="students"

    id=db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String)
    last_name = db.Column(db.String)
    gender=db.Column(db.String) 
    created_at=db.Column(db.DateTime, server_default=db.func.now())
    update_at=db.Column(db.DateTime, onupdate=db.func.now())
    #class_name=db.Column(db.Integer, db.ForeignKey('class.id')) 
    #parent_id=db.Column(db.Integer, db.ForeignKey('parent.id'))

    #classes = db.relationship('Class', backref='students')
    #parents = db.relationship('Parent', backref='students')

    @validates('first_name', "last_name")
    def name_validation(self, key, value  ):
        if len(value) < 2:
            raise ValueError(f'{key} is too short ')
        
        if not value.isalpha():
            raise ValueError(f'{key} must be alphabets')
        
        return value
        
    def __repr__(self):
        return f'<Student:{self.first_name} {self.last_name}> '
        
