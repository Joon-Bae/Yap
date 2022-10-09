import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { createNewReview } from '../../store/reviews'
import whiteYelpLogo from '../../Images/yelp-logo-4.png'
import { FaStar } from 'react-icons/fa'
import './NewReviewForm.css'

function NewReviewForm() {
    const dispatch = useDispatch();
    const { businessId } = useParams();
    const userId = useSelector((state) => state?.session?.user?.id)
    const business = useSelector((state) => state?.businesses?.normalizedBusinesses[businessId])
    const [ rating, setRating ] = useState(0)
    const [ review, setReview ] = useState('')
    const [ errors, setErrors ] = useState([])
    const [ratingHover, setRatingHover] = useState(null);
    const history = useHistory();

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

    useEffect(() => {
        // getBusiness()
        const validationErrors = [];
        if (rating.length > 1 || rating < 1 || rating > 5) validationErrors.push("Rating is required");
        if (!review.length) validationErrors.push("Review is required");
        if (review.trim().length < 5 || review.trim().length > 400) validationErrors.push("Review must be between 5 and 400 characters");

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
            <img className='yelp-logo-new-review' alt='yap-white' src={whiteYelpLogo}/>
            </NavLink>
        </div>
        <div>
        {/* <img className='profile-icon' src={ 'https://nitreo.com/img/igDefaultProfilePic.png'} /> */}
        </div>
    </div>
        <div className='review-form-container'>
        <div className='new-review-page'>
        <h2 className='business-title-1'>{business?.title}</h2>
           <form
            className="new-review-form"
            onSubmit={handleSubmit}
        >
            <div className='new-star-rating-container'>
                            <div className='new-star-rating-inner'>
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
