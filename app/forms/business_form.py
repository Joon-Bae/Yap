from re import S
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, URL


def title_check(form, field):
    title = field.data
    if len(title) < 5 or len(title) > 100:
        raise ValidationError('Must be between 5 and 100 characters')

def description_check(form, field):
    description = field.data
    if len(description) < 5 or len(description) > 255:
        raise ValidationError('Must be between 5 and 255 characters')

def address1_check(form, field):
    address1 = field.data
    if len(address1) < 5 or len(address1) > 100:
        raise ValidationError('Must be between 5 and 100 characters')

def city_check(form, field):
    city = field.data
    if len(city) < 5 or len(city) > 50:
        raise ValidationError('Must be between 5 and 50 characters')



class BusinessForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), title_check])
    description = TextAreaField('description', validators=[DataRequired(), description_check])
    address1 = StringField('address1', validators=[DataRequired(), address1_check])
    address2 = StringField('address2')
    city = StringField('city', validators=[DataRequired(), city_check])
    state = StringField('state', validators=[DataRequired()])
    zipCode = StringField('zipCode', validators=[DataRequired()])
    imageUrl = StringField("imageUrl")
