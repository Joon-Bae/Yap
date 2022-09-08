from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Review
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET route for all reviews
@review_routes.get('/')
def get_all_reviews():
    all_reviews = Review.query.all()
    response = {'allReviews': [review.review_to_dict_user() for review in all_reviews]}
    return response

#POST route for reviews
@review_routes.route('/new', methods=["POST"])
def create_review():
    form = ReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_review = Review(
            rating = data['rating'],
            review = data['review'],
            business_id = data['business_id'],
            user_id = current_user.id
        )
        db.session.add(new_review)
        db.session.commit()
        return {'new_review': new_review.review_to_dict_user()}

    # Return the validation errors, and put 403 at end
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403

#Put route for review
@review_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def edit_review(id):
    form = ReviewForm()
    review = Review.query.get_or_404(id)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
            data = form.data
            print(data, "this is data ----------------")
            review.rating = data['rating']
            review.review = data['review']
            review.business_id = data['business_id']
            # if data['imageUrl']:
            #     business.image_url= data['imageUrl']
            db.session.commit()
            return {'review': review.review_to_dict_user()}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403

#Delete route for review
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get_or_404(id)
    print(review, "=================================== api")
    db.session.delete(review)
    db.session.commit()
    return {'message': 'Successfully deleted'}
