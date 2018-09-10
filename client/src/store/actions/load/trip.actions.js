import axios from 'axios';

export const GET_TRIP = 'GET TRIP';
export const SET_TRIP = 'SET TRIP';
// export const SUCCESS_POST_TRIP = 'SUCCESS POST TRIP';

export function getTrip(){

    const getTrip = axios.get('/api/trip');

    return (dispatch) =>
        getTrip.then((response) =>
            dispatch({
                type: GET_TRIP,
                payload: response.data
            })
        );
}

export function setTrip(trip){

    const postTrip = axios.post('/api/trip',{ ...trip });
    return (dispatch) =>
        postTrip.then((response) =>
            dispatch({
                type: SET_TRIP,
                payload: response.data
            })
        );
}

