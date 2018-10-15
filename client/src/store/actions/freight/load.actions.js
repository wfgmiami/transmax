import axios from "axios";
// import { Datatable } from "../../../components/members/Datatable";

export const GET_LOAD = "GET LOAD";
export const DELETE_LOAD = "DELETE LOAD";
export const ADD_LOAD = "ADD LOAD"
export const UPDATE_LOAD = "UPDATE LOAD";
export const SAVE_LOAD = "SAVE LOAD";
export const GET_LOAD_DATE_RANGE = "GET LOAD DATE RANGE";

export function getLoad() {

  const getLoad = axios.get("/api/load");

  return dispatch =>
    getLoad.then(response =>
      dispatch({
        type: GET_LOAD,
        payload: response.data
      })
    );
}


export function saveLoads(loads) {
  // console.log("load.actions.js saveLoad loads ", loads);
  const postLoad = axios.post("/api/load", { ...loads });
  return dispatch =>
    postLoad.then(response =>
      dispatch({
        type: SAVE_LOAD,
        payload: response.data
      })
    );
}

export function addLoad(load) {
  // console.log("load.actions.js addloads ", loads);
  return {
    type: ADD_LOAD,
    load
  };
}

export function updateLoad(load) {
  // console.log("load.actions.js addloads ", loads);
  return {
    type: UPDATE_LOAD,
    load
  };
}

export function deleteLoad(index) {
  // console.log("load.actions.js delete loads ", index);
  return {
    type: DELETE_LOAD,
    index: index
  };
}

export function getLoadDateRange(dateRange) {

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

