// Actions
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
const EDIT_REVIEW = '/reviews/EDIT_REVIEW'

//Action Creator
const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

const addReview = (review) => ({
    type: ADD_REVIEW,
    review
})

const deleteReview = (id) => ({
    type: DELETE_REVIEW,
    id
})

// const updateReview = (review) => ({
//     type: EDIT_REVIEW,
//     review
// })


//Thunks
//get review thunk
export const getAllReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews/', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response)
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return
        } else dispatch(loadReviews(data))
    }
}

//create review thunk
export const createNewReview = (review) => async (dispatch) => {

    const response = await fetch('/api/reviews/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addReview(data))
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}


export const removeReview= (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteReview(id))
    }
}

// export const editReview = (formValues) => async dispatch => {
//     const response = await fetch(`/api/reviews/${id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formValues)
//     });
//     if (response.ok) {

//         const data = await response.json();
//         dispatch(updateReview(data));
//     } else {
//         const badData = await response.json()
//         if (badData.errors) return badData.errors
//     }
// };

const initialState = { normalizedReviews: {}}

export default function reviewsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = JSON.parse(JSON.stringify(state))
            action.reviews.allReviews.forEach(review => {
                newState.normalizedReviews[review.id] = review
            })
            return newState
        case ADD_REVIEW:
            newState = JSON.parse(JSON.stringify(state))
            newState.normalizedReviews[action.review.new_review.id] = action.review.new_review
            return newState
        case DELETE_REVIEW:
            newState = JSON.parse(JSON.stringify(state))
            delete newState.normalizedReviews[action.id]
            return newState
        // case EDIT_BUSINESS:
        //     newState = JSON.parse(JSON.stringify(state))
        //     newState.normalizedReviews[action.review.review.id] = action.review.review
        //     return newState
        default:
            return state
        }
    }
