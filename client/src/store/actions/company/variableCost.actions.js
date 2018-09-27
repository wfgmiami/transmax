import axios from "axios";
import { VariableCost } from "../../../components/members/Datatable";

export const GET_VARIABLE_COST = "GET VARIABLE_COST";
export const SET_VARIABLE_COST = "SET VARIABLE_COST";
export const UPDATE_VARIABLE_COST = "UPDATE VARIABLE_COST";
export const SAVE_VARIABLE_COST = "SAVE VARIABLE_COST";

export function getVariableCost() {
  // return dispatch =>
  //   dispatch({
  //     type: GET_VARIABLE_COST,
  //     payload: VariableCost
  //   });

  const getVariableCost = axios.get("/api/variablecost");

  return dispatch =>
    getVariableCost.then(response =>
      dispatch({
        type: GET_VARIABLE_COST,
        payload: response.data
      })
    );
}

export function setVariableCost(variableCost) {
  // console.log("set variable called", variableCost);
  return {
    type: SET_VARIABLE_COST,
    variableCost
  };
}

export function saveVariableCost(variableCost) {
  // console.log("variableCost.actions.js variableCost ", variableCost);
  const postVariableCost = axios.post("/api/variablecost", { ...variableCost });
  return dispatch =>
    postVariableCost.then(response =>
      dispatch({
        type: SAVE_VARIABLE_COST,
        payload: response.data
      })
    );
}

export function updateVariableCost(variableCost) {
  // console.log("variableCost.actions.js ", variableCost);
  return {
    type: UPDATE_VARIABLE_COST,
    variableCost
  };
}
