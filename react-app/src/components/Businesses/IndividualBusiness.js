import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getAllBusinesses } from "../../store/businesses"
import { removeBusiness } from "../../store/businesses"

export default function IndividualBusiness () {
    const history = useHistory()
    const dispatch = useDispatch()
    const { businessId } = useParams()
    const sessionUser = useSelector((state) => state.session.user)
    const business = useSelector((state) => state.businesses.normalizedBusinesses[businessId])

    useEffect(() => {
    dispatch(getAllBusinesses())
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
		    <p className='business-address'>{business.address}</p>
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
				<p className='business-address'>{business?.address}</p>

			</span>
		)}
            </div>
        </div>
    )
}
