from flask import Flask
from flask_migrate import Migrate

from models import db


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///soma.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)


@app.route("/")
def index():
    return "<h1>Welcome to Soma!</h1>"

