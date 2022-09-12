import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { createNewBusiness } from "../../store/businesses"
import yelpLogo from '../../Images/yelp-logo-3.png'
import businessImage from '../../Images/yelp-business.png'
import './NewBusinessForm.css'

const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
    'Kentucky', 'Lousiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
]

function NewBusinessForm() {
    const dispatch = useDispatch();
    const ownerId = useSelector((state) => state.session.user.id)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("Alabama")
    const [zipCode, setZipCode] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [isValid, setIsValid] = useState(false)
    const [errors, setErrors] = useState([]);
    const history = useHistory();



    useEffect(() => {
        const validationErrors = [];
        if (!title.length) validationErrors.push("Title is required");
        //do less than for title and description
        if (title.trim().length > 100 || title.trim().length < 5) validationErrors.push("Title must be 5 and 100 characters");
        if (!description.length) validationErrors.push("Description is required");
        if (description.trim().length > 255 || description.trim().length < 5) validationErrors.push("Description must be between 5 and 255 characters");
        if (!address1.length) validationErrors.push("Address 1 is required");
        if (address1.trim().length > 255 || address1.trim().length < 5) validationErrors.push("Address must be between 5 and 255 characters");
        if (!city.length) validationErrors.push("City is required");
        if (city.trim().length > 50 || city.trim().length < 3) validationErrors.push("City must be between 3 and 50 characters");
        if (!state.length) validationErrors.push("State is required");
        if (!zipCode.length) validationErrors.push("Zip Code is required");
        if (zipCode.trim().length > 5 || zipCode.trim().length < 5) validationErrors.push("Zip Code must be 5 numbers");
        if (imageUrl.trim().length === 0 || (/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl) === false)) validationErrors.push("Invalid image URL was provided. Format must be '.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif' or '.svg' and also must include: 'https://'")

        setErrors(validationErrors);
    }, [title, description, address1, address2, city, state, zipCode, imageUrl]);

    function imageUrlCheck (imageUrl) {
        if (!imageUrl || imageUrl.trimEnd().length === 0) return false
        if (imageUrl && imageUrl.includes(' ')) return false
        if (imageUrl && imageUrl.includes("File:")) return false

        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl);
      }

    const handleSubmit = (e) => {
        // console.log("***************** inside handlesumbit")
        e.preventDefault();
        // const checkurl = async () => {
        //     const response = await fetch(imageUrl)
        //     if(response.ok){
        //         console.log('things went well')
        //     } else {
        //         console.log('things didnt go well :(')
        //     }
        //     return response
        // }

        // let idk = checkurl(imageUrl)
        // console.log(idk, "this is idk")

        const formValues = {
            ownerId,
            title,
            description,
            address1,
            address2,
            city,
            state,
            zipCode,
            imageUrl
        }
        dispatch(createNewBusiness(formValues))
        console.log(formValues)
        history.push('/home')
    }

    const sendHome = () => {
        history.push('/home')
    }



    return (
        <>
        <div className='header-top-login'>
        <div>
        <img onClick={sendHome} className='yelp-logo' src={yelpLogo}/>
        </div>
    </div>
        <div className="new-business-page">
        <form
            className="business-form"
            onSubmit={handleSubmit}
        >
            <h2 className='new-business-prompt'>Add Your Business</h2>
            <h3 className='new-business-guide'> Add information about your business below. Any fields marked with an asterisk(*) are required fields </h3>
            {errors.length > 0 && (
            <ul className="errors">
                {
                    errors.map(error => (
                        <li key={error}>{error}</li>
                    ))
                }
            </ul>
            )
            }
            <div>
                <label className='edit-business-label'>Business Title*</label>
                <input
                    className='new-business-input'
                    placeholder='Title'
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
            <label className='new-business-label'>Business Description*</label>
                <textarea
                    className='new-business-input'
                    type="text"
                    placeholder='Description'
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label className='new-business-label'>Address 1*</label>
                <input
                    className='new-business-input'
                    type="text"
                    placeholder='Ex: 123 W Main st.'
                    name="address1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                />
            </div>
            <div>
                <label className='new-business-label'>Address 2</label>
                <input
                    className='new-business-input'
                    type="text"
                    placeholder='Suite/Apt'
                    name="address2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                />
            </div>
            <div>
                <label className='new-business-label'>City*</label>
                <input
                    className='new-business-input'
                    type="text"
                    placeholder='City'
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div>
                <label className='new-business-label'>State*</label>
                <select
                    className='new-business-input'
                    type="text"
                    placeholder='State'
                    name="state"
                    onChange={(e) => setState(e.target.value)}
                >
                    {states.map(state => {
                       return <option key={state}value={state}>{state}</option>
                    })}
                </select>
            </div>
            <div>
                <label className='new-business-label'>Zip Code*</label>
                <input
                    className='new-business-input'
                    type="number"
                    placeholder='Zip Code'
                    name="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                />
            </div>
            <div>
                <label className='new-business-label'>Image</label>
                <input
                    className='new-business-input'
                    type="url"
                    placeholder='Image Url'
                    name="imageUrl"
                    value={imageUrl}
                    onChange={(e) => {
                        setImageUrl(e.target.value)
                        setIsValid(imageUrlCheck(e.target.value))
                        setErrors([])
                      }}
                />
            </div>
            <button
                className='submit-business-btn'
                type="submit"
                disabled={errors.length > 0}
                onClick={(e) => handleSubmit(e)}
            >
                Add this business
            </button>
        </form>
        <div className='add-business-image-right'>
            <img className='business-image1' src={businessImage}/>
      </div>
        </div>
        </>
    );
}

export default NewBusinessForm;
