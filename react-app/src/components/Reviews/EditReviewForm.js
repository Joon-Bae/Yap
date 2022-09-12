import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { editReview } from "../../store/reviews.js";
import whiteYelpLogo from '../../Images/yelp-logo-4.png'
import { getAllBusinesses } from "../../store/businesses.js";
import { getAllReviews } from "../../store/reviews.js";
import { FaStar } from 'react-icons/fa'
import './EditReviewForm.css'


function EditReviewForm() {
    const dispatch = useDispatch();
    const { id, businessId } = useParams();
    const userId = useSelector((state) => state.session.user.id)
    const individualReview = useSelector((state) => state.reviews.normalizedReviews[id])
    const business = useSelector((state) => state?.businesses?.normalizedBusinesses[individualReview?.businessId])
    const [ rating, setRating ] = useState(individualReview?.rating)
    const [ review, setReview ] = useState('')
    const [ errors, setErrors ] = useState([])
    const [ratingHover, setRatingHover] = useState(null);
    const history = useHistory();

    if (business === undefined) {
        history.push(`/businesses/${businessId}`)
    }

    useEffect(() => {
        const validationErrors = [];
        if (rating?.length > 1) validationErrors.push("Please enter a number between 1 and 5");
        if (!review.length) validationErrors.push("Review is required");
        if (review.length < 5 || review.length > 400) validationErrors.push("Review must be between 5 and 400 characters");

    setErrors(validationErrors);
    }, [rating, review]);

    if (business === undefined) {
        history.push(`/businesses/${businessId}`)
    }

    const colors = {
        'gold': "rgb(255, 201, 18)",
        'gray': "rgb(153, 153, 153)"
    }
    const rate = Array(5).fill(0)

    const handleOnHover = value => {
        setRatingHover(value)
    };
    const handleOnClose = () => {
        setRatingHover(null)
    };


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
               <div className='new-star-rating-container'>
                            <div className='new-star-rating-inner' style={{ display: 'flex' }}>
                                {rate.map((_, i) => {
                                    const input = i + 1;
                                    return (
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <FaStar
                                                key={i}
                                                size={30}
                                                style={{
                                                    marginRight: 10,
                                                    cursor: 'pointer'
                                                }}
                                                color={input <= (rating || ratingHover) ? colors.gold : colors.gray}

                                                onClick={() => setRating(input)}
                                                onMouseEnter={() => handleOnHover(input)}
                                                onMouseLeave={handleOnClose}
                                            ></FaStar>
                                        </div>
                                    )
                                })}
                            </div>
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
