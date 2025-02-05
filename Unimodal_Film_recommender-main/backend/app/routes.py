from flask import Blueprint, request, jsonify
from app.model import recommend_movies

api = Blueprint('api', __name__)

@api.route('/recommendations', methods=['GET'])
def get_recommendations():
    user_id = request.args.get('user_id', type=int)
    num_recommendations = request.args.get('num', default=10, type=int)

    if user_id is None:
        return jsonify({"error": "user_id parameter is required"}), 400

    recs = recommend_movies(user_id, num_recommendations)
    return jsonify(recs)
