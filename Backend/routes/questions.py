from flask import Blueprint, request, jsonify
from flask_login import current_user
from models import Question

question_api_bp = Blueprint('question_api', __name__)

# Create a route to retrieve all questions (accessible to all users)
@question_api_bp.route('/all', methods=['GET'])
def get_questions():
    questions = Question.objects()
    return jsonify({'questions': questions}), 200

# Create a route to retrieve a specific question by ID (accessible to all users)
@question_api_bp.route('/get/<question_id>', methods=['GET'])
def get_question(question_id):
    question = Question.objects(id=question_id).first()
    if not question:
        return jsonify({'message': 'Question not found'}), 404
    return jsonify({'question': question}), 200

# Create a route to add a new question (accessible only to users with role "teacher")
@question_api_bp.route('/add', methods=['POST'])
def add_question():
    # Check user role
    if current_user.role != 'teacher':
        return jsonify({'message': 'Unauthorized access'}), 403

    data = request.json
    question = Question(**data)
    question.save()
    questions = Question.objects()
    return jsonify({'message': 'Question added successfully', 'questions': questions}), 201

# Create a route to update an existing question (accessible only to users with role "teacher")
@question_api_bp.route('/edit/<question_id>', methods=['PUT'])
def update_question(question_id):
    # Check user role
    if current_user.role != 'teacher':
        return jsonify({'message': 'Unauthorized access'}), 403

    data = request.json
    question = Question.objects(id=question_id).first()
    if not question:
        return jsonify({'message': 'Question not found'}), 404
    question.modify(**data)
    questions = Question.objects()
    return jsonify({'message': 'Question updated successfully', 'questions': questions}), 200

# Create a route to delete an existing question (accessible only to users with role "teacher")
@question_api_bp.route('/delete/<question_id>', methods=['DELETE'])
def delete_question(question_id):
    # Check user role
    if current_user.role != 'teacher':
        return jsonify({'message': 'Unauthorized access'}), 403

    question = Question.objects(id=question_id).first()
    if not question:
        return jsonify({'message': 'Question not found'}), 404
    question.delete()
    questions = Question.objects()
    return jsonify({'message': 'Question deleted successfully', 'questions': questions}), 200
