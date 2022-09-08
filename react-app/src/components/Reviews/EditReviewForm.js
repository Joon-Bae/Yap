import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { editReview } from "../../store/reviews.js";


function EditReviewForm() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const userId = useSelector((state) => state.session.user.id)
    const individualReview = useSelector((state) => state.reviews.normalizedReviews[id])
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



    return (
        <div className='edit-review-page'>
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
                    className='edit-review-input'
                    type="text"
                    placeholder={individualReview?.review}
                    name="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </div>
            <button
                className='submit-review-btn'
                type="submit"
                disabled={errors.length > 0}
                onClick={(e) => handleSubmit(e)}
            >
                Edit Review
            </button>
            <div className='errors'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
        </form>
        </div>
    )
}

export default EditReviewForm;
