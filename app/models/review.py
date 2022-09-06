from .db import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from app.models import User

class Review(db.Model, UserMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    # Relationships
    user = db.relationship('User', back_populates='reviews')  # reviews can only belong to one user
    business = db.relationship('Business', back_populates='business_reviews')  # Comment can only belong to one post

    def review_to_dict_user(self):
        return {
            'id': self.id,
            'businessId': self.business_id,
            'userId': self.user_id,
            'rating': self.rating,
            'review': self.review,
            'user': {
                'username': User.query.get(self.owner_id).username
            },
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
