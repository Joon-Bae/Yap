import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getAllBusinesses } from "../../store/businesses"

export default function IndividualBusiness () {
    const dispatch = useDispatch()
    const { businessId } = useParams()
    const business = useSelector((state) => state.businesses.normalizedBusinesses[businessId])

    useEffect(() => {
    dispatch(getAllBusinesses())
    }, [dispatch, businessId])


    return (
        <div>
            {business && (
                <div>
                    <p>{business.title}</p>
                    <p>{business.description}</p>
                    <p>{business.address}</p>
                </div>
                )
            }
        </div>
    )
}
