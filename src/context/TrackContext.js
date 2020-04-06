import createDataContext from "./createDataContext";
import tracker from "../api/tracker";

const FETCH_TRACKS = "FETCH_TRACKS";
const trackReducer = (state, {type, payload}) => {
    switch (type) {
        case FETCH_TRACKS:
            return payload
        default:
            return state;
    }
}

const fetchTracks = dispatch => async () => {
    console.log('In fetch Tracks ',  Date.now());
    const response = await tracker.get('/tracks');
    dispatch({ type: FETCH_TRACKS, payload: response.data});
}
const createTrack = dispatch => async (name, locations) => {
    await tracker.post('/tracks', {name, locations});
}

export const { Provider, Context } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
)