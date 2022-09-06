from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):
    rating = StringField('rating', validators=[DataRequired()])
    review = TextAreaField('review', validators=[DataRequired()])
