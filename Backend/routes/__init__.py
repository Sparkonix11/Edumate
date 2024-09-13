from .auth import auth_api_bp
from .questions import question_api_bp
from .score import score_api_bp

def init_app(app):
    app.register_blueprint(auth_api_bp)
    app.register_blueprint(question_api_bp, url_prefix='/questions')
    app.register_blueprint(score_api_bp, url_prefix='/scores')


