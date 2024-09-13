# Import necessary modules
from flask import Blueprint, request, jsonify
from flask import current_app as app
from flask_login import login_user, current_user, login_required, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Question

# Create a Blueprint for user-related APIs
auth_api_bp = Blueprint('auth_api', __name__)
# API for user registration (signup)
@auth_api_bp.route('/signup', methods=['POST'])
def signup():
    data = request.form
    # Check if the required fields are present in the request
    required_fields = ['name', 'username', 'email', 'password', 'confirm_password']
    if not all(field in data for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    # Check if the password and confirm_password match
    if data['password'] != data['confirm_password']:
        return jsonify({'message': 'Passwords do not match'}), 400

    existing_user = User.objects(username=data['username']).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 409

    existing_email = User.objects(email=data['email']).first()
    if existing_email:
        return jsonify({'message': 'Email already exists'}), 409


    new_user = User(
        name=data['name'],
        username=data['username'],
        email=data['email'],
        role=data['role'],
        password=generate_password_hash(data['password'], method='pbkdf2:sha256')  # Hash the password
    )

    # Add the user to the database
    new_user.save()


    # Log the user in after signup
    login_user(new_user, remember=True)
    questions = Question.objects()

    user_data = {
            'id': new_user.id,
            'name': new_user.name,
            'username': new_user.username,
            'email': new_user.email,
            'role': new_user.role,
        }

    return jsonify({'message': 'User created successfully', 'user': user_data, 'questions': questions}), 201


# API for user login
@auth_api_bp.route('/login', methods=['POST'])
def login():
    data = request.form

    # Check if the required fields are present in the request
    if not all(field in data for field in ['username', 'password']):
        app.logger.error('Missing required fields in login request')
        return jsonify({'message': 'Missing required fields'}), 400

    # Perform user authentication
    user = User.objects(username=data['username']).first()


    if user and check_password_hash(user.password, data['password']):
        app.logger.info(f'User {user.username} authenticated successfully')
        # Log the user in using Flask-Login
        login_user(user, remember=True)
        app.logger.info('User logged in successfully')

        user_data = {
            'id': user.id,
            'name': user.name,
            'username': user.username,
            'email': user.email,
            'role': user.role
        }
        questions = Question.objects()

        return jsonify({'message': 'Login successful', 'user': user_data, 'questions': questions}), 200
    else:
        app.logger.error('Invalid credentials provided for login')
        return jsonify({'message': 'Invalid credentials'}), 401


@auth_api_bp.route('/logout', methods=['POST'])
def logout():
    # Check if the user is authenticated
    if current_user.is_authenticated:
        # Log the user out using Flask-Login
        logout_user()
        app.logger.info('User logged out successfully')
        return jsonify({'message': 'Logout successful'}), 200
    else:
        app.logger.error('User not authenticated during logout')
        return jsonify({'message': 'User not authenticated'}), 401
    


