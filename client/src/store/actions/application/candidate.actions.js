import axios from 'axios';

export const GET_CANDIDATE = 'GET CANDIDATE';
export const SUCCESS_CANDIDATE_APPLICATION = 'SUCCESS_CANDIDATE_APPLICATION';
export const SET_CANDIDATE_ATTRIBUTES = 'SET CANDIDATE ATTRIBUTES';

export function getCandidate(){
    return {
        type: GET_CANDIDATE
    }
}

export function setCandidate(candidate){

    const postCandidate = axios.post('/api/candidate',{ ...candidate });
    return (dispatch) =>
        postCandidate.then((response) =>
            dispatch({
                type: SUCCESS_CANDIDATE_APPLICATION,
                payload: response.data
            })
        )
        .catch( (err) => {
            alert("An error occurred submitting the application. Please try again")
            window.location.reload();
        })
}

export function setCandidateAttributes(attribute){

    return {
        type: SET_CANDIDATE_ATTRIBUTES,
        attribute
    }
}
