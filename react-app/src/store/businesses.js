// Actions
const LOAD_BUSINESSES = 'businesses/LOAD_BUSINESSES'

//Action Creator
const loadBusinesses = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
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
        default:
            return state
        }
    }
