import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"
import { editBusiness } from "../../store/businesses"
import yelpLogo from '../../Images/yelp-logo-3.png'
import businessImage from '../../Images/yelp-business.png'
import './EditBusiness.css'


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

function EditBusinessForm() {
    const dispatch = useDispatch();
    const ownerId = useSelector((state) => state.session.user.id)
    const { businessId } = useParams()
    const business = useSelector((state) => state.businesses.normalizedBusinesses[businessId])
    const [title, setTitle] = useState(business?.title);
    const [description, setDescription] = useState(business?.description)
    const [address1, setAddress1] = useState(business?.address1)
    const [address2, setAddress2] = useState(business?.address2)
    const [city, setCity] = useState(business?.city)
    const [state, setState] = useState("Alabama")
    const [zipCode, setZipCode] = useState(business?.zipCode)
    const [imageUrl, setImageUrl] = useState("")
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    if (business === undefined) {
        history.push(`/businesses/${businessId}`)
    }

    useEffect(() => {
        const validationErrors = [];
        if (!title?.length) validationErrors.push("Title is required");
        if (title?.length > 100) validationErrors.push("Title must be 100 characters or less");
        if (!description?.length) validationErrors.push("Description is required");
        if (description?.length > 255) validationErrors.push("Description must be 255 characters or less");
        if (!address1?.length) validationErrors.push("Address 1 is required");
        if (address1?.length > 255) validationErrors.push("Address must be 100 characters or less");
        if (!city?.length) validationErrors.push("City is required");
        if (city?.length > 50) validationErrors.push("City must be 50 characters or less");
        if (!state?.length) validationErrors.push("State is required");
        if (!zipCode?.length) validationErrors.push("Zip Code is required");
        if (zipCode?.length > 5 || zipCode?.length < 5) validationErrors.push("Zip Code must be 5 numbers");

        setErrors(validationErrors);
    }, [title, description, address1, address2, city, state, zipCode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            businessId,
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
        dispatch(editBusiness(formValues))
        console.log(formValues)
        if (errors.length === 0) {
            history.push('/home')
        }
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
        <div className="edit-business-page">
        <form
            className="edit-business-form"
            onSubmit={handleSubmit}
        >
            <h2 className='edit-business-prompt'>Edit Your Business</h2>
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
                    className='edit-business-input'
                    placeholder='Title'
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
            <label className='edit-business-label'>Business Description*</label>
                <textarea
                    className='edit-business-text'
                    type="text"
                    placeholder='Description'
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
            <label className='edit-business-label'>Address 1*</label>
                <input
                    className='edit-business-input'
                    type="text"
                    placeholder='Ex: 123 W Main st.'
                    name="address1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                />
            </div>
            <div>
            <label className='edit-business-label'>Address 2</label>
                <input
                    className='edit-business-input'
                    type="text"
                    placeholder='Suite/Apt'
                    name="address2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                />
            </div>
            <div>
            <label className='edit-business-label'>City*</label>
                <input
                    className='edit-business-input'
                    type="text"
                    placeholder='City'
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div>
            <label className='edit-business-label'>State*</label>
                <select
                    className='edit-business-select'
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
            <label className='edit-business-label'>Zip Code*</label>
                <input
                    className='edit-business-input'
                    type="text"
                    placeholder='Zip Code'
                    name="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                />
            </div>
            <div>
            <label className='edit-business-label'>Image</label>
                <input
                    className='edit-business-input'
                    type="text"
                    placeholder='Image Url'
                    name="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>
            <button
                className='edit-business-btn'
                type="submit"
                disabled={errors.length > 0}
                onClick={(e) => handleSubmit(e)}
            >
                Edit this business
            </button>
        </form>
        <div className='add-business-image-right'>
            <img className='business-image1' src={businessImage}/>
      </div>
        </div>
        </>
    );
}

export default EditBusinessForm;
