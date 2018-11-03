import axios from "axios";

export const GET_FIXED_COST = "GET FIXED_COST";
export const SET_FIXED_COST = "SET FIXED_COST";
export const UPDATE_FIXED_COST = "UPDATE FIXED_COST";
export const SAVE_FIXED_COST = "SAVE FIXED_COST";

export function getFixedCost() {
  // return dispatch =>
  //   dispatch({
  //     type: GET_FIXED_COST,
  //     payload: FixedCost
  //   });
  const getFixedCost = axios.get("/api/fixedcost");

  return dispatch =>
    getFixedCost.then(response =>
      dispatch({
        type: GET_FIXED_COST,
        payload: response.data
      })
    );
}

export function setFixedCost(fixedCost) {
  // console.log("set fixed called", fixedCost);
  return {
    type: SET_FIXED_COST,
    fixedCost
  };
}

export function saveFixedCost(fixedCost) {
  // console.log("fixedCost.actions.js fixedCost ", fixedCost);
  const postFixedCost = axios.post("/api/fixedcost", { ...fixedCost });
  return dispatch =>
    postFixedCost.then(response =>
      dispatch({
        type: SAVE_FIXED_COST,
        payload: response.data
      })
    );
}

export function updateFixedCost(fixedCost) {
  // console.log("fixedCost.actions.js ", fixedCost);
  return {
    type: UPDATE_FIXED_COST,
    fixedCost
  };
}
