import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getAllBusinesses } from "../../store/businesses"
import { removeBusiness } from "../../store/businesses"
import { getAllReviews } from "../../store/reviews"
import { removeReview } from "../../store/reviews"
import trashCan from '../../Images/trashcan.svg'
import editReview from '../../Images/edit-review.svg'
import whiteYelpLogo from '../../Images/yelp-logo-4.png'
import LogoutButton from '../auth/LogoutButton'

import NavBar from "../NavBar"
import { FaStar } from 'react-icons/fa'
import './individualbusiness.css'

export default function IndividualBusiness () {
    const history = useHistory()
    const dispatch = useDispatch()
    const { businessId } = useParams()
    const sessionUser = useSelector((state) => state.session.user)
    const business = useSelector((state) => state.businesses.normalizedBusinesses[businessId])
    const reviews = useSelector((state) => Object.values(state.reviews.normalizedReviews))
    const review = useSelector((state) => state.reviews.normalizedReviews)
    const businessReview = reviews.filter(review  => +businessId === +review.businessId)

    const colors = {
        'gold': "rgb(255, 201, 18)",
        'gray': "rgb(153, 153, 153)"
    }

    const rate = Array(5).fill(0)

    useEffect(() => {
    dispatch(getAllBusinesses())
    dispatch(getAllReviews())
    }, [dispatch, businessId])

    const editUserBusiness = (e) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/businesses/${businessId}/edit`)
    }

    const handleBusinessDelete = () => {
        dispatch(removeBusiness(businessId))
        history.push('/home')
    }

    const handleReviewDelete = (key) => {
        dispatch(removeReview(review[key].id))
        history.push(`/businesses/${businessId}`)
    }

    const sendEditReview = (key) => {
        history.push(`/businesses/${business.id}/reviews/${review[key].id}/edit`)
    }

    const sendNewReview = () => {
        history.push(`/businesses/${business.id}/reviews/new`)
    }

    return (
        <>
        <div className='header-top-individual-business'>
        <div >
            <NavLink to='/home'>
            <img className='yelp-logo-new-review'src={whiteYelpLogo}/>
            </NavLink>
        </div>
        <div className='nav-bar-right-buttons'>
          <NavLink className='create-a-business-individual' to='/businesses/new' exact={true} activeClassName='active'>
          <p className='create-a-business-individual' >Create a Business</p>
        </NavLink>
        <LogoutButton />
      </div>
        </div>
            <div className='individual-business-page'>
            <div className='business-information'>
            {sessionUser.id === business?.ownerId ? (
		    <div className='business-information-inner-container'>
            <img className='individual-business-image' onError={({ target }) => {
                        target.onError = null
                        target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvIKnUwCra_oSB-sJvyWgzYtnRnhagEg_byQ&usqp=CAU"
                  }}    src={business?.imageUrl}/>
            <div className='business-details'>
		        <h1  className='business-title'>{business.title}</h1>
                <div className='editdelete-business-container'>
		        <button className='editbusiness-btn' onClick={editUserBusiness}>
			    Edit Business</button>
		        <button className='deletebusiness-btn' onClick={handleBusinessDelete}>
			    Delete Business
		        </button>
		        </div>
                <div>
                <div>
                <p className='about-the-business'>About the Business:</p>
		        <p className='business-description'>{business.description}</p>
                </div>
                <div className="business-address-full">
                <p className='location'>Location:</p>
		        <p className='business-address1-address2'>{business?.address1}, {business?.address2}</p>
			    <p className='business-city-state'>{business?.city}, {business?.state}</p>
			    <p className='business-zip'>{business?.zipCode}</p>
                </div>
                </div>
            </div>
		    </div>
		) : (
			<span>
                <img className='individual-business-image' onError={({ target }) => {
                        target.onError = null
                        target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvIKnUwCra_oSB-sJvyWgzYtnRnhagEg_byQ&usqp=CAU"
                  }}    src={business?.imageUrl}/>
                <div className='business-details'>

				<h1 className='business-title'>{business?.title}</h1>
                <div className='new-review-button'>
                <button className='editbusiness-btn' onClick={sendNewReview}>
			        Write Review</button>
                </div>
                <div>
                <p className='about-the-business'>About the Business:</p>
				<p className='business-description'>{business?.description}</p>
                </div>
                <div className="business-address-full">
                    <p className='location'>Location:</p>
				    <p className='business-address1'>{business?.address1}, {business?.address2}.</p>
                    <p className='business-city-state'>{business?.city}, {business?.state}</p>
				    <p className='business-zip'>{business?.zipCode}</p>
                </div>
                </div>


			</span>
		)}
            <div className='business-reviews'>
            <p className='review-text'> See What Others are Saying!</p>
            {businessReview && businessReview.map((review, idx) => {
                return (
                    <div key={idx} className='review-container'>
                        <div className='review-information'>
                        <div className='individual-business-review-stars'>
                            <div className='business-review-stars-inner' style={{ display: 'flex' }}>
                                {rate.map((_, i) => {
                                    // const input = i + 1;
                                    return (
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <FaStar
                                                key={i}
                                                size={25}
                                                isFilled={review.rating}
                                                style={{
                                                    marginRight: 10
                                                }}
                                                color={i <= (review.rating - 1) ? colors.gold : colors.gray}
                                            ></FaStar>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                            { sessionUser.id === review.userId ? (
                            <>
                            <div className='edit-delete-review-container'>
                                <div className="delete-review-button">
                                <img onClick={() =>handleReviewDelete(review.id)} className='delete-review-image' src={trashCan}/>
                                </div>
                                <div className='edit-review-button'>
                                <img onClick={() =>sendEditReview(review.id)} className='edit-review-image' src={editReview}/>
                                </div>
                            </div>
                            </>
                            ) : null

                            }


                        </div>
                        <div>

                        <p className='user-review'>{review.review}</p>
                        </div>
                    </div>

                )
            })}

            </div>

            </div>
        </div>
        </>
    )
}
