from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import business, db, User, Business
from app.forms import BusinessForm


business_routes = Blueprint('businesses', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET route for all businesses
@business_routes.get('/')
def get_all_business():

    all_business = Business.query.all()
    response = {'allBusinesses': [business.to_dict_with_user() for business in all_business]}
    return response
