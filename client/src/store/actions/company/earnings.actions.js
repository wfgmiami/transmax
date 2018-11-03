import axios from "axios";

export const GET_EARNINGS = "GET EARNINGS";
export const SET_EARNINGS = "SET EARNINGS";
export const UPDATE_EARNINGS = "UPDATE EARNINGS";
export const SAVE_EARNINGS = "SAVE EARNINGS";

export function getEarnings() {
  // return dispatch =>
  //   dispatch({
  //     type: GET_EARNINGS,
  //     payload: EarningsData
  //   });
  const getEarnings = axios.get("/api/earnings");

  return dispatch =>
    getEarnings.then(response =>
      dispatch({
        type: GET_EARNINGS,
        payload: response.data
      })
    );
}

export function setEarnings(earnings) {
  // console.log("set earnings called", earnings);
  return {
    type: SET_EARNINGS,
    earnings
  };
}

export function saveEarnings(earnings) {
  // console.log("earnings.actions.js saveEarnings ", earnings);
  const postEarnings = axios.post("/api/earnings", { ...earnings });
  return dispatch =>
    postEarnings.then(response =>
      dispatch({
        type: SAVE_EARNINGS,
        payload: response.data
      })
    );
}

export function updateEarnings(earnings) {
  // console.log("earnings.actions.js earningsTrip trips ", earnings);
  return {
    type: UPDATE_EARNINGS,
    earnings
  };
}
