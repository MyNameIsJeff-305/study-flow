import { csrfFetch } from "./csrf";

//Constants
const GET_ALL_STUDYPLANS = 'studyplans/getAllStudyplans';
const GET_MY_STUDYPLANS = 'studyplans/getOneStudyplan';
const GET_ONE_STUDYPLAN = 'studyplans/getMyStudyplans';
const ADD_STUDYPLAN = 'studyplans/addStudyplan';
const EDIT_STUDYPLAN = 'studyplans/editStudyplan';
const DELETE_STUDYPLAN = 'studyplans/deleteStudyplan';

//Action Creators
const getAllStudyplans = (studyplans) => ({
    type: GET_ALL_STUDYPLANS,
    payload: studyplans
});

const getOneStudyplan = (studyplan) => ({
    type: GET_ONE_STUDYPLAN,
    payload: studyplan
});

const getMyStudyplans = (studyplans) => ({
    type: GET_MY_STUDYPLANS,
    payload: studyplans
});

const addStudyplan = (studyplan) => ({
    type: ADD_STUDYPLAN,
    payload: studyplan
});

const editStudyplan = (studyplan) => ({
    type: EDIT_STUDYPLAN,
    payload: studyplan
});

const deleteStudyplan = (studyplan) => ({
    type: DELETE_STUDYPLAN,
    payload: studyplan
});

//Thunks
export const fetchAllStudyplans = () => async (dispatch) => {
    const res = await csrfFetch('/api/studyplans/');
    const data = await res.json();
    dispatch(getAllStudyplans(data));
};

export const fetchOneStudyplan = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/studyplans/${id}`);
    const data = await res.json();
    dispatch(getOneStudyplan(data));
};

export const fetchMyStudyplans = () => async (dispatch) => {
    const res = await csrfFetch('/api/studyplans/current');
    const data = await res.json();
    dispatch(getMyStudyplans(data));
}

export const createStudyplan = (studyplan) => async (dispatch) => {
    const res = await csrfFetch('/api/studyplans/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studyplan)
    });
    const data = await res.json();
    dispatch(addStudyplan(data));
};

export const updateStudyplan = (studyplan) => async (dispatch) => {
    const res = await csrfFetch(`/api/studyplans/${studyplan.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studyplan)
    });
    const data = await res.json();
    dispatch(editStudyplan(data));
};

export const removeStudyplan = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/studyplans/${id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    dispatch(deleteStudyplan(data));
};

//Reducer
const initialState = {
    allStudyplans: [],
    myStudyplans: [],
    currentStudyplan: {}
};

const studyplansReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_STUDYPLANS: {
            return {
                ...state,
                allStudyplans: action.payload
            };
        }
        case GET_ONE_STUDYPLAN: {
            return {
                ...state,
                currentStudyplan: action.payload
            };
        }

        case GET_MY_STUDYPLANS: {
            return {
                ...state,
                myStudyplans: action.payload
            };
        }

        case ADD_STUDYPLAN: {
            return {
                ...state,
                myStudyplans: [...state.myStudyplans, action.payload]
            };
        }

        case EDIT_STUDYPLAN: {
            return {
                ...state,
                myStudyplans: state.myStudyplans.map((studyplan) => {
                    if (studyplan.id === action.payload.id) {
                        return action.payload;
                    }
                    return studyplan;
                })
            };
        }

        case DELETE_STUDYPLAN: {
            return {
                ...state,
                myStudyplans: state.myStudyplans.filter((studyplan) => studyplan.id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}

export default studyplansReducer;