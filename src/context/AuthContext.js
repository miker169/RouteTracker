import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage} from "react-native";

const ADD_ERROR = 'ADD_ERROR';
const SIGNIN = "SIGNIN";
const CLEAR_ERROR_MESSAGE = "CLEAR_ERROR_MESSAGE";
const RESTORE_TOKEN = "RESTORE_TOKEN";
const SIGNOUT = "SIGNOUT";
const authReducer = (state, {type, payload} )  => {
    switch (type) {
        case SIGNOUT:
            return {...state, token: null,errorMessage: ''}
        case RESTORE_TOKEN:
            return {...state, token: payload, isLoading: false};
        case CLEAR_ERROR_MESSAGE:
            return {...state, errorMessage: ''}
        case ADD_ERROR:
            return {...state, errorMessage: payload}
        case SIGNIN:
            return {token: payload, errorMessage: ''}
        default:
            return state;
    }
}

const tryLocalSignIn = (dispatch) => async ()  => {
    const token = await AsyncStorage.getItem('token');
     dispatch({type: RESTORE_TOKEN, payload: token});

}

const signup = (dispatch) => async ({email, password}) => {
    try {
        const response = await trackerApi.post('/signup',{email,password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: SIGNIN, payload: response.data.token });
    } catch (e) {
        console.log(e);
        dispatch({type: ADD_ERROR, payload: 'Something went wrong with sign up'});
    }
}

const signin = (dispatch) => async ({email, password}) => {
   try {
       const response = await trackerApi.post('/signin', {email, password});
       await AsyncStorage.setItem('token', response.data.token);
       dispatch({type: SIGNIN, payload: response.data.token});
   }catch (e) {
       dispatch({
           type: ADD_ERROR,
           payload: "Something went wrong with sign in"
       })
   }
}

const clearErrorMessage = dispatch => () => dispatch({type: CLEAR_ERROR_MESSAGE})

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: SIGNOUT, errorMessage: null});
}


export const { Provider, Context } =
    createDataContext(authReducer,
        {signup,  signout, signin, clearErrorMessage, tryLocalSignIn},
        {token: null, errorMessage: '', isLoading: true})