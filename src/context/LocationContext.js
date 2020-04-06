import createDataContext from "./createDataContext";

const ADD_CURRENT_LOCATION = "ADD_CURRENT_LOCATION";
const START_RECORDING = "START_RECORDING";
const STOP_RECRDING = "STOP_RECRDING";
const ADD_LOCATION = "ADD_LOCATION";
const CHANGE_NAME = "CHANGE_NAME";
const RESET = "RESET";

const locationReducer = (state, {type, payload}) =>{
    switch (type) {
        case RESET:
            return {...state, name: '', locations: []}
        case CHANGE_NAME:
            return {...state, name: payload}
        case ADD_LOCATION:
            return {...state, locations: [...state.locations, payload]}
        case START_RECORDING:
            return {...state, recording: true}
        case STOP_RECRDING:
            return {...state, recording: false}
        case ADD_CURRENT_LOCATION:
            return {...state, currentLocation: payload}
        default:
            return state;
    }
}

const changeName = dispatch => (name) => dispatch({type: CHANGE_NAME, payload: name});
const startRecording = dispatch => () => dispatch({type: START_RECORDING});
const stopRecording = dispatch => () => dispatch({type: STOP_RECRDING});

const addLocation = dispatch => (location, recording) => {
    dispatch({ type: ADD_CURRENT_LOCATION, payload: location})
    if(recording){
        dispatch({type: ADD_LOCATION, payload: location});
    }
}

const reset = dispatch => () => {
    dispatch({type: RESET})
}

export const { Context, Provider} =
    createDataContext(
        locationReducer,
        { startRecording, stopRecording, addLocation, changeName, reset },
        {
            recording: false,
            locations: [],
            currentLocation: null,
            name: ''
        })