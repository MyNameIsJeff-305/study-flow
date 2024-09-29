import { csrfFetch } from './csrf';

//Constants
const GET_ALL_USER_EXERCISES = 'userexercise/getAllUserExercises';
const GET_CURRENT_USER_USER_EXERCISES = 'userexercise/getCurrentUSERUserExercises';
const ADD_USER_EXERCISE = 'userexercise/addUserExercise';
const DELETE_USER_EXERCISE = 'userexercise/deleteUserExercise';


//Action Creators
const getAllUserExercises = (userExercises) => ({
    type: GET_ALL_USER_EXERCISES,
    payload: userExercises
});

const getCurrentUserUserExercises = (userExercises) => ({
    type: GET_CURRENT_USER_USER_EXERCISES,
    payload: userExercises
});

const addUserExercise = (userExercise) => ({
    type: ADD_USER_EXERCISE,
    payload: userExercise
});

const deleteUserExercise = (userExercise) => ({
    type: DELETE_USER_EXERCISE,
    payload: userExercise
});

//Thunks
export const fetchAllUserExercises = () => async (dispatch) => {
    const res = await csrfFetch('/api/userExercises');
    const userExercises = await res.json();
    dispatch(getAllUserExercises(userExercises));
};

export const fetchCurrentUserUserExercises = () => async (dispatch) => {
    const res = await csrfFetch('/api/userExercises/current');
    const userExercises = await res.json();
    dispatch(getCurrentUserUserExercises(userExercises));
}

export const addUserExerciseThunk = (exerciseId, userId) => async (dispatch) => {
    const res = await csrfFetch('/api/userExercises', {
        method: 'POST',
        body: JSON.stringify({ exerciseId, userId })
    });
    const userExercise = await res.json();
    dispatch(addUserExercise(userExercise));
}

export const deleteUserExerciseThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/userExercises/${id}`, {
        method: 'DELETE'
    });
    const userExercise = await res.json();
    dispatch(deleteUserExercise(userExercise));
}


//Reducer
const initialState = {
    allUserExercises: [],
    currentUserUserExercises: []
};

const userExerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USER_EXERCISES:
            return {
                ...state,
                allUserExercises: action.payload
            }
        case GET_CURRENT_USER_USER_EXERCISES:
            return {
                ...state,
                currentUserUserExercises: action.payload
            }
        case ADD_USER_EXERCISE:
            return {
                ...state,
                currentUserUserExercises: [...state.currentUserUserExercises, action.payload]
            }
        case DELETE_USER_EXERCISE:
            return {
                ...state,
                currentUserUserExercises: state.currentUserUserExercises.filter(userExercise => userExercise.id !== action.payload.id)
            }
        default:
            return state;
    }
}

export default userExerciseReducer;