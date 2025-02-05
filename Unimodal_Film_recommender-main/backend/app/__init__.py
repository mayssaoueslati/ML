from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for frontend requests
    app.config.from_object('app.config.Config')

    # Register routes
    from app.routes import api
    app.register_blueprint(api, url_prefix='/api')

    return app
