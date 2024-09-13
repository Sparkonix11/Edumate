from flask import Blueprint, request, jsonify
from datetime import datetime
from models import Score

score_api_bp = Blueprint('score_api', __name__)

# Route to retrieve all scores (accessible to all users)
@score_api_bp.route('/all', methods=['GET'])
def get_scores():
    scores = Score.objects()
    return jsonify({'scores': scores}), 200

@score_api_bp.route('/user/<username>', methods=['GET'])
def get_scores_by_username(username):
    scores = Score.objects(username=username)
    if not scores:
        return jsonify({'message': 'Scores not found for the specified username'}), 404
    return jsonify({'scores': scores}), 200

# Route to add a new score (accessible to all users)
@score_api_bp.route('/add', methods=['POST'])
def add_score():
    data = request.json
    # Defaulting date to current date and time
    data['date'] = datetime.now()
    score = Score(**data)
    score.save()
    scores = Score.objects()
    return jsonify({'message': 'Score added successfully', 'scores': scores}), 201
