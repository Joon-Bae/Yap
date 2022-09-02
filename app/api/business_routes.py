from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Business
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

# use current_user for interacting with current logged in user
# and making new post with user_id (current set to get to view curr_user object)
@business_routes.post('/new')
def create_post():
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_business = Business(
            title = data['title'],
            description = data['description'],
            address = data['address'],
            owner_id = current_user.id
        )
        db.session.add(new_business)
        db.session.commit()
        return {'new_business': new_business.to_dict_with_user()}

    # Return the validation errors, and put 403 at end
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403


# Edit route for businesses
@business_routes.put('/<int:id>')
@login_required
def edit_business(id):
    form = BusinessForm()
    business = Business.query.get_or_404(id)
    print("++++++++++++++++++++++++++++++++++++++ backend route")

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        business.title = data['title']
        business.description = data['description']
        business.address = data['address']
        db.session.commit()
        return {'business': business.to_dict_with_user()}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403


# Delete route for businesses
@business_routes.delete('/<int:id>')
@login_required
def delete_business(id):
    business = Business.query.get_or_404(id)
    db.session.delete(business)
    db.session.commit()
    return {'message': 'Successfully deleted'}
