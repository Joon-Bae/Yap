import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createNewReview } from '../../store/reviews'

function NewReviewForm() {
    const dispatch = useDispatch();
    const { businessId } = useParams();
    const userId = useSelector((state) => state.session.user.id)
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
            business_id: +businessId,
            userId,
            rating: +rating,
            review
        }
        dispatch(createNewReview(formValues))
        console.log(formValues)
        history.push(`/businesses/${businessId}`)
    }



    return (
        <div className='new-review-page'>
           <form
            className="new-review-form"
            onSubmit={handleSubmit}
        >
            <div>
                <input
                    className='new-review-input'
                    placeholder='Rating'
                    type="number"
                    name="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
            </div>
            <div>
                <textarea
                    className='new-review-input'
                    type="text"
                    placeholder='This place was amazing to start with! The employees were so friendly and welcoming. They had alot of options on the menu as well and it took me a while to decide. My experience was good and I would recommend!'
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
                Post Review
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


export default NewReviewForm;
