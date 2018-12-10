import axios from "axios";

export const GET_EARNINGS = "GET EARNINGS";
export const SET_EARNINGS = "SET EARNINGS";
export const UPDATE_EARNINGS = "UPDATE EARNINGS";
export const SAVE_EARNINGS = "SAVE EARNINGS";
export const DELETE_EARNINGS = "DELETE EARNINGS";

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

export function deleteEarnings(row) {
  console.log("earnings.actions.js delete earnings ", row);
  const earningsId = row.original.id;

  // if(!earningsId) return {
  //   type: DELETE_EMPTY_LOAD,
  //   payload: row.index
  // }


  const deleteEarnings = axios.delete(`/api/earnings/deleteearnings/${earningsId}`);

  return dispatch =>
    deleteEarnings.then(response =>
      dispatch({
        type: DELETE_EARNINGS,
        payload: earningsId
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
