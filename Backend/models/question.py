from mongoengine import Document, fields

class Question(Document):
    question = fields.StringField(required=True)
    optionA = fields.StringField(required=True)
    optionB = fields.StringField(required=True)
    optionC = fields.StringField(required=True)
    optionD = fields.StringField(required=True)
    answer = fields.StringField(required=True)
