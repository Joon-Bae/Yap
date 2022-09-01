from re import S
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, URL


def title_check(form, field):
    title = field.data
    if len(title) < 5 or len(title) > 100:
        raise ValidationError('Must be between 5 and 100 characters')

def description_check(form, field):
    description = field.data
    if len(description) < 5 or len(description) > 100:
        raise ValidationError('Must be between 5 and 100 characters')

def address_check(form, field):
    address = field.data
    if len(address) < 5 or len(address) > 255:
        raise ValidationError('Must be between 5 and 255 characters')

class BusinessForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), title_check])
    description = StringField('description', validators=[DataRequired(), description_check])
    address = StringField('address', validators=[DataRequired(), address_check])
