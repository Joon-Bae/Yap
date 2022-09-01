from .db import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from app.models import User


class Business(db.Model, UserMixin):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text)
    address = db.Column(db.String(255), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    # Relationships
    user = db.relationship('User', back_populates='businesses')  # Business can only belong to one user

    def to_dict_with_user(self):
        return {
            'id': self.id,
            'title':self.title,
            'address':self.address,
            'ownerId': self.owner_id,
            'description': self.description,
            'user': {
                'username': User.query.get(self.owner_id).username
            },
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
