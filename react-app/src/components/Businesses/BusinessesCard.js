import { useDispatch, useSelector } from "react-redux"
import { NavLink  } from "react-router-dom"
import { useEffect } from "react"
import { getAllBusinesses } from "../../store/businesses"
import locationIcon from '../../Images/location.svg'
import './businesscard.css'

export default function BusinessesCard () {
    const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state.session.user)
    const businesses = useSelector((state) => Object.values(state.businesses.normalizedBusinesses))

    useEffect(() => {
        dispatch(getAllBusinesses())
    }, [dispatch])

    return (
        <>
        <div className='business-feed'>
        <div className='businesses-list'>
            <>
            {businesses && businesses.map(business => {
                return (
                    <div key={`${business.id}`} className='business-card'>
                        <div>
                        <img className='business-image' onError={({ target }) => {
                    target.onError = null
                    target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvIKnUwCra_oSB-sJvyWgzYtnRnhagEg_byQ&usqp=CAU"
                  }} src={business.imageUrl}></img>
                        </div>
                        <div className='title-container'>
                        <NavLink className='business-title-link' key={`${business.id}`} to={`/businesses/${business.id}`}>
                            <div >
                             <p className='businesses-title'>{business.title}</p>
                           </div>
                        </NavLink>
                        <div className='business-address'>
                            <div className='business-city-state'>
                            <img className="location-icon" src={locationIcon}/>
                            <p>{business.city}, {business.state}</p>
                            </div>
                        </div>
                        </div>
                        </div>
                )

            })}
            </>
        </div>
        </div>
        </>
    )
}
