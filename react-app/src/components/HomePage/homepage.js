// import { useSelector } from "react-redux"
// import { NavLink, Redirect } from "react-router-dom"
// import { useEffect } from "react"
import  BusinessCard from '../Businesses/BusinessesCard'


export default function Home({ businesses }) {
    // const allBusinesses = useSelector(state => Object.values(state.businesses.normalizedBusinesses).reverse())
    // const sessionUser = useSelector(state => state.session.user)


    return (
        <div className='homepage-main'>
            <h1>Welcome to the home page</h1>
            <div className='businesses-homepage'>
            <BusinessCard/>
            </div>
        </div>
    )
}
