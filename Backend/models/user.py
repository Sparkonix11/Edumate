from flask_login import UserMixin
from mongoengine import Document, fields

class User(Document, UserMixin):
    name = fields.StringField(max_length=50, required=True)
    username = fields.StringField(max_length=50, unique=True, required=True)
    email = fields.EmailField(unique=True, required=True)
    password = fields.StringField(required=True)
    role = fields.StringField(max_length=20, default='user')