import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { editReview } from "../../store/reviews.js";
import whiteYelpLogo from '../../Images/yelp-logo-4.png'
import { getAllBusinesses } from "../../store/businesses.js";
import { getAllReviews } from "../../store/reviews.js";
import './EditReviewForm.css'


function EditReviewForm() {
    const dispatch = useDispatch();
    const { id, businessId } = useParams();
    const userId = useSelector((state) => state.session.user.id)
    const individualReview = useSelector((state) => state.reviews.normalizedReviews[id])
    const business = useSelector((state) => state?.businesses?.normalizedBusinesses[individualReview?.businessId])
    const [ rating, setRating ] = useState('')
    const [ review, setReview ] = useState('')
    const [ errors, setErrors ] = useState([])
    const history = useHistory();


    useEffect(() => {
        const validationErrors = [];
        if (!rating.length) validationErrors.push("Rating is required");
        if (rating.length > 1) validationErrors.push("Please enter a number between 1 and 5");
        if (!review.length) validationErrors.push("Review is required");
        if (review.length < 5 || review.length > 400) validationErrors.push("Review must be between 5 and 400 characters");

    setErrors(validationErrors);
    }, [rating, review]);

    if (business === undefined) {
        history.push(`/businesses/${businessId}`)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            id: +id,
            business_id: +individualReview?.businessId,
            userId,
            rating: +rating,
            review
        }
        dispatch(editReview(formValues))
        console.log(formValues)
        history.push(`/businesses/${individualReview.businessId}`)
    }

    const cancelReview = () => {
        history.push(`/businesses/${individualReview.businessId}`)
    }

    return (
        <>
        <div className='header-top-new-review'>
        <div >
            <NavLink to='/home'>
            <img className='yelp-logo-new-review'src={whiteYelpLogo}/>
            </NavLink>
        </div>
        <div>
        <img className='profile-icon' src={ 'https://nitreo.com/img/igDefaultProfilePic.png'} />
        </div>
    </div>
        <div className='review-form-container'>
        <div className='edit-review-page'>
        <h2 className='business-title-1'>{business?.title}</h2>
           <form
            className="edit-review-form"
            onSubmit={handleSubmit}
        >
            <div>
                <input
                    className='edit-review-input'
                    placeholder='Rating'
                    type="number"
                    name="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
            </div>
            <div>
                <textarea
                    className='edit-review-textarea'
                    type="text"
                    placeholder={individualReview?.review}
                    name="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </div>
            <div className='errors'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
        </form>
        <div className='buttons-div-editreview'>
        <button
                className='edit-review-btn'
                type="submit"
                disabled={errors.length > 0}
                onClick={(e) => handleSubmit(e)}
            >
                Edit Review
            </button>
            <button
            className='cancel-btn'
            type="submit"
            onClick={(e) => cancelReview()}
            >
            Cancel
            </button>
            </div>
        </div>
        </div>
        </>
    )
}

export default EditReviewForm;
