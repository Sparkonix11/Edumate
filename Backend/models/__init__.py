from flask_mongoengine import MongoEngine

db = MongoEngine()


from .user import User
from .question import Question
from .score import Score

def init_db(app):
    with app.app_context():
        print("DB created")

