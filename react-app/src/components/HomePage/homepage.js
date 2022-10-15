import { useSelector } from "react-redux"
// import { NavLink, Redirect } from "react-router-dom"
// import { useEffect } from "react"
import { Redirect } from 'react-router-dom'
import  BusinessCard from '../Businesses/BusinessesCard'
import NavBar from "../NavBar"
import Footer from "../Footer/footer"
import landingPage1 from '../../Images/landingimage1.jpg'
import landingPage2 from '../../Images/landingimage2.jpg'
import landingPage3 from '../../Images/landingimage3.webp'
import './homepage.css'
import { useEffect, useState } from "react"


export default function Home({ businesses }) {
    // const allBusinesses = useSelector(state => Object.values(state.businesses.normalizedBusinesses).reverse())
    const sessionUser = useSelector(state => state.session.user)
    const images = [landingPage1, landingPage2, landingPage3]

    const [image, setImage] = useState(images[0])
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        setImage(images[counter])
    }, [counter])

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((counter) => counter === 2 ? 0 : counter + 1)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    if (sessionUser) {
        <Redirect to='/home'/>
    } else {
        <Redirect to='/login'/>
    }

    return (
        <>
        <div>
        <NavBar />
            <div>
            <img className='landing-image-1' alt='slideshow' src={image}/>
            </div>
        </div>
        <div className='homepage-main'>
            <div>
            <h1 className='review-statement'>Your Next Review Awaits</h1>
            </div>
            <div className='businesses-homepage'>
            <BusinessCard/>
            </div>
        </div>
        <Footer />
        </>
    )
}
