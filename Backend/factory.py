from flask import Flask
from models import db, init_db, User
from flask_login import LoginManager
from flask_cors import CORS
from routes import init_app

login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    app.config.from_pyfile('config.py')



    db.init_app(app)
    init_db(app)

    login_manager.init_app(app)



    @login_manager.user_loader
    def load_user(id):
        return User.objects.get(id=id)

    init_app(app)

    return app