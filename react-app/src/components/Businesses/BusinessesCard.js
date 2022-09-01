import { useDispatch, useSelector } from "react-redux"
import { NavLink  } from "react-router-dom"
import { useEffect } from "react"
import { getAllBusinesses } from "../../store/businesses"

export default function BusinessesCard () {
    const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state.session.user)
    const businesses = useSelector((state) => Object.values(state.businesses.normalizedBusinesses))

    useEffect(() => {
        dispatch(getAllBusinesses())
    }, [dispatch])

    return (
        <div className='businesses-list'>
            <>
            {businesses && businesses.map(business => {
                return (
                    <NavLink key={`${business.id}`} to={`/businesses/${business.id}`}>
                        <div className='businesses-link'>
                            {business.title}
                        </div>
                    </NavLink>
                    )

            })}
            </>
        </div>
    )
}
