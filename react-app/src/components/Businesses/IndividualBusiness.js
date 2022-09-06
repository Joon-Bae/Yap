import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getAllBusinesses } from "../../store/businesses"
import { removeBusiness } from "../../store/businesses"
import { getAllReviews } from "../../store/reviews"

export default function IndividualBusiness () {
    const history = useHistory()
    const dispatch = useDispatch()
    const { businessId } = useParams()
    const sessionUser = useSelector((state) => state.session.user)
    const business = useSelector((state) => state.businesses.normalizedBusinesses[businessId])
    const reviews = useSelector((state) => Object.values(state.reviews.normalizedReviews))
    const businessReview = reviews.filter(review  => +businessId === +review.businessId)

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

    return (
        <div className='individual-business-page'>
            <div className='business-information'>
            {sessionUser.id === business?.ownerId ? (
		    <div>
		    <h1 className='business-title'>{business.title}</h1>
		    <p className='business-description'>{business.description}</p>
            <div className="business-address-full">
		    <p className='business-address1'>{business?.address1}</p>
			<p className='business-address2'>{business?.address2}</p>
			<p className='business-city'>{business?.city}</p>
			<p className='business-state'>{business?.state}</p>
			<p className='business-zip'>{business?.zipCode}</p>
            </div>
		    <div className='editdelete-business-container'>
		    <button className='editbusiness-btn' onClick={editUserBusiness}>
			Edit Business</button>
		    <button className='deletebusiness-btn' onClick={handleBusinessDelete}>
			Delete Business
		    </button>
		    </div>
		    </div>
		) : (
			<span>
				<h1 className='business-title'>{business?.title}</h1>
				<p className='business-description'>{business?.description}</p>
                <div className="business-address-full">
				    <p className='business-address1'>{business?.address1}</p>
				    <p className='business-address2'>{business?.address2}</p>
				    <p className='business-city'>{business?.city}</p>
				    <p className='business-state'>{business?.state}</p>
				    <p className='business-zip'>{business?.zipCode}</p>
                </div>

			</span>
		)}
            <div className='business-reviews'>
            {businessReview && businessReview.map(review => {
                return (
                    <div>
                    <p>{review.review}</p>
                </div>
                )
            })}
            </div>
            </div>
        </div>
    )
}
