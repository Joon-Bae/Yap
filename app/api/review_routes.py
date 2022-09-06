from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Review
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

# GET route for all reviews
@review_routes.get('/')
def get_all_reviews():

    all_reviews = Review.query.all()
    response = {'allReviews': [review.review_to_dict_user() for review in all_reviews]}
    return response
