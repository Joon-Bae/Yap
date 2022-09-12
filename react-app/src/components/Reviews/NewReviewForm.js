import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { createNewReview } from '../../store/reviews'
import whiteYelpLogo from '../../Images/yelp-logo-4.png'
import './NewReviewForm.css'

function NewReviewForm() {
    const dispatch = useDispatch();
    const { businessId } = useParams();
    const userId = useSelector((state) => state?.session?.user?.id)
    const business = useSelector((state) => state?.businesses?.normalizedBusinesses[businessId])
    const [ rating, setRating ] = useState('')
    const [ review, setReview ] = useState('')
    const [ errors, setErrors ] = useState([])
    const history = useHistory();

    if (business === undefined) {
        history.push(`/businesses/${businessId}`)
    }

    useEffect(() => {
        // getBusiness()
        const validationErrors = [];
        if (!rating.length) validationErrors.push("Rating is required");
        if (rating.length > 1 || rating < 1 || rating > 5) validationErrors.push("Please enter a single number between 1 and 5");
        if (!review.length) validationErrors.push("Review is required");
        if (review.length < 5 || review.length > 400) validationErrors.push("Review must be between 5 and 400 characters");

    setErrors(validationErrors);
    }, [rating, review]);


    // useEffect(() => {
    //    const response = fetch('/api/businesses/')
    //    .then((response) => {
    //     let data = response.json()
    //    })
    //    console.log(data)
    // })
    // const getBusiness = async () => {
    //     console.log(businessId, "this is business Id front end")
    //     const response = await fetch(`/api/businesses/${businessId}`)
    //     const data = await response.json()
    //     console.log(data, "************************* this is data")
    //     setBusinesses(data)
    // }
    // console.log(businesses, "------------------------busineses")

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

   const cancelReview = () => {
    history.push(`/businesses/${businessId}`)
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
        <div className='new-review-page'>
        <h2 className='business-title-1'>{business?.title}</h2>
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
                    className='new-review-textarea'
                    type="text"
                    placeholder='This place was amazing to start with! The employees were so friendly and welcoming. They had alot of options on the menu as well and it took me a while to decide. My experience was good and I would recommend!'
                    name="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </div>
            {/* <button
                className='submit-review-btn'
                type="submit"
                disabled={errors.length > 0}
                onClick={(e) => handleSubmit(e)}
            >
                Post Review
            </button> */}
            <div className='errors'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>

            </div>
        </form>
        <div className='buttons-div-newreview'>
        <button
                className='submit-review-btn'
                type="submit"
                disabled={errors.length > 0}
                onClick={(e) => handleSubmit(e)}
            >
                Post Review
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


export default NewReviewForm;
