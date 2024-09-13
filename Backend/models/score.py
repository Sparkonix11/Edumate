from mongoengine import Document, fields

class Score(Document):
    score = fields.IntField(required=True)
    username = fields.StringField(required=True)
    date = fields.DateTimeField(required=True)