from this import d
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired()])
    review = TextAreaField('review', validators=[DataRequired()])
    business_id = IntegerField('businessId', validators=[DataRequired()])
