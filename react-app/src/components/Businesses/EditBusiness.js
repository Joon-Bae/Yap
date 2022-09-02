import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"
import { editBusiness } from "../../store/businesses"

function EditBusinessForm() {
    const dispatch = useDispatch();
    const { businessId } = useParams()
    const business = useSelector((state) => state.businesses.normalizedBusinesses[businessId])
    const ownerId = useSelector((state) => state.session.user.id)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const validationErrors = [];
        if (!title.length) validationErrors.push("Title is required");
        if (title.length > 100) validationErrors.push("Title must be 100 characters or less");
        if (!description.length) validationErrors.push("Description is required");
        if (description.length > 255) validationErrors.push("Description must be 255 characters or less");
        if (!address.length) validationErrors.push("Address is required");
        if (address.length > 255) validationErrors.push("Address must be 255 characters or less");

        setErrors(validationErrors);
    }, [title, description, address]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            businessId,
            ownerId,
            title,
            description,
            address
        }
        dispatch(editBusiness(formValues))
        console.log(formValues)
        history.push('/home')
    }

    return (
        <div className="edit-business-page">
        <form
            className="edit-business-form"
            onSubmit={handleSubmit}
        >
            <h2 className='edit-business-prompt'>Edit Your Business</h2>
            <ul className="errors">
                {
                    errors.map(error => (
                        <li key={error}>{error}</li>
                    ))
                }
            </ul>
            <div>
                <input
                    className='edit-business-input'
                    placeholder={business?.title}
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <input
                    className='edit-business-input'
                    type="text"
                    placeholder={business?.description}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <input
                    className='edit-business-input'
                    type="text"
                    placeholder={business?.address}
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button
                className='submit-business-btn'
                type="submit"
                disabled={errors.length > 0}
                onClick={(e) => handleSubmit(e)}
            >
                Edit this business
            </button>
        </form>
        </div>
    );
}

export default EditBusinessForm;
