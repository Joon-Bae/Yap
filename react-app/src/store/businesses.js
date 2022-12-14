// Actions
const LOAD_BUSINESSES = 'businesses/LOAD_BUSINESSES'
const ADD_BUSINESS = 'businesses/ADD_BUSINESS'
const DELETE_BUSINESS = 'businesses/DELETE_BUSINESS'
const EDIT_BUSINESS = '/businesses/EDIT_BUSINESS'


//Action Creator
const loadBusinesses = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
})

const addBusiness = (business) => ({
    type: ADD_BUSINESS,
    business
})

const deleteBusiness = (id) => ({
    type: DELETE_BUSINESS,
    id
})

const updateBusiness = (business) => ({
    type: EDIT_BUSINESS,
    business
})

//Thunks
export const getAllBusinesses = () => async (dispatch) => {
    const response = await fetch('/api/businesses/', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response)
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return
        } else dispatch(loadBusinesses(data))
    }
}

export const createNewBusiness = (business) => async (dispatch) => {

    const response = await fetch('/api/businesses/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(business)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addBusiness(data))
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}

export const removeBusiness = (id) => async dispatch => {
    const response = await fetch(`/api/businesses/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteBusiness(id))
    }
}

export const editBusiness = (formValues) => async dispatch => {
    const { businessId } = formValues
    const response = await fetch(`/api/businesses/${businessId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
    });
    if (response.ok) {

        const data = await response.json();
        dispatch(updateBusiness(data));
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
};

const initialState = { normalizedBusinesses: {} }

export default function businessesReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_BUSINESSES:
            newState = JSON.parse(JSON.stringify(state))
            action.businesses.allBusinesses.forEach(el => {
                newState.normalizedBusinesses[el.id] = el
            })
            return newState
        case ADD_BUSINESS:
            newState = JSON.parse(JSON.stringify(state))
            newState.normalizedBusinesses[action.business.new_business.id] = action.business.new_business
            return newState
        case DELETE_BUSINESS:
            newState = JSON.parse(JSON.stringify(state))
            delete newState.normalizedBusinesses[action.id]
            return newState
        case EDIT_BUSINESS:
            newState = JSON.parse(JSON.stringify(state))
            newState.normalizedBusinesses[action.business.business.id] = action.business.business
            return newState
        default:
            return state
        }
    }
