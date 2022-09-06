from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Review
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)
