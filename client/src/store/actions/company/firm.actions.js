import axios from "axios";
// import { Firm } from "../../../components/members/Datatable";

export const GET_FIRM = "GET FIRM";
export const SET_FIRM = "SET FIRM";
export const UPDATE_FIRM = "UPDATE FIRM";
export const SAVE_FIRM = "SAVE FIRM";

export function getFirm() {
  // return dispatch =>
  //   dispatch({
  //     type: GET_FIRM,
  //     payload: Firm
  //   });
  const getFirm = axios.get("/api/company");

  return dispatch =>
    getFirm.then(response =>
      dispatch({
        type: GET_FIRM,
        payload: response.data
      })
    );
}

export function setFirm(firm) {
  // console.log("set firm called", firm);
  return {
    type: SET_FIRM,
    firm
  };
}

export function saveFirm(firm) {
  // console.log("firm.actions.js saveFirm ", firm);
  const postFirm = axios.post("/api/company", { ...firm });
  return dispatch =>
    postFirm.then(response =>
      dispatch({
        type: SAVE_FIRM,
        payload: response.data
      })
    );
}

export function updateFirm(firm) {
  // console.log("trip.actions.js updateTrip trips ", trips);
  return {
    type: UPDATE_FIRM,
    firm
  };
}
