import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { createNewBusiness } from "../../store/businesses"

function NewBusinessForm() {
    const dispatch = useDispatch();
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
            ownerId,
            title,
            description,
            address
        }
        dispatch(createNewBusiness(formValues))
        console.log(formValues)
        history.push('/home')
    }

    return (
        <div className="new-business-page">
        <form
            className="business-form"
            onSubmit={handleSubmit}
        >
            <h2 className='new-business-prompt'>Add Your Business</h2>
            <ul className="errors">
                {
                    errors.map(error => (
                        <li key={error}>{error}</li>
                    ))
                }
            </ul>
            <div>
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
                <input
                    className='new-business-input'
                    type="text"
                    placeholder='Description'
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <input
                    className='new-business-input'
                    type="text"
                    placeholder='Address'
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
                Add this business
            </button>
        </form>
        </div>
    );
}

export default NewBusinessForm;
