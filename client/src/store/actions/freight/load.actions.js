import axios from "axios";
// import { Datatable } from "../../../components/members/Datatable";

export const GET_LOAD = "GET LOAD";
export const SET_LOAD = "SET LOAD";
export const UPDATE_LOAD = "UPDATE LOAD"
export const SAVE_LOADS = "SAVE LOADS";
export const GET_LOAD_DATE_RANGE = "GET LOAD DATE RANGE";

export function getLoad() {
  // return dispatch =>
  //   dispatch({
  //     type: GET_LOAD,
  //     payload: Datatable
  //   });
  const getLoad = axios.get("/api/load");

  return dispatch =>
    getLoad.then(response =>
      dispatch({
        type: GET_LOAD,
        payload: response.data
      })
    );
}

export function setLoad(load) {
  // console.log("set load called", load);
  return {
    type: SET_LOAD,
    load
  };
}

export function saveLoads(loads) {
  // console.log("load.actions.js saveLoad loads ", loads);
  const postLoad = axios.post("/api/load", { ...loads });
  return dispatch =>
    postLoad.then(response =>
      dispatch({
        type: SAVE_LOADS,
        payload: response.data
      })
    );
}

export function updateLoad(loads) {
  // console.log("load.actions.js updateLoad loads ", loads);
  return {
    type: UPDATE_LOAD,
    loads
  };
}

export function getLoadDateRange(dateRange) {
  // return dispatch =>
  //   dispatch({
  //     type: GET_LOAD_DATE_RANGE,
  //     payload: dateRange
  //   });

  const getLoadDateRange = axios.get('/api/load/daterange',
   { params:
    { startDate: dateRange.startDate,
     endDate: dateRange.endDate } });

  return dispatch =>
    getLoadDateRange.then(response =>
      dispatch({
        type: GET_LOAD_DATE_RANGE,
        payload: response.data
      })
    );
}

