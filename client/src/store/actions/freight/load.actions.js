import axios from "axios";
// import { Datatable } from "../../../components/members/Datatable";

export const GET_LOAD = "GET LOAD";
export const DELETE_LOAD = "DELETE LOAD";
export const ADD_LOAD = "ADD LOAD"
export const UPDATE_LOAD = "UPDATE LOAD";
export const EDIT_LOAD = "EDIT LOAD";
export const SAVE_NEW_LOAD = "SAVE LOAD";
export const EDIT_EXISTING_LOAD = "SAVE EXISTING LOAD";
export const GET_LOAD_DATE_RANGE = "GET LOAD DATE RANGE";
export const DELETE_EMPTY_LOAD = "DELETE EMPTY LOAD";

export function getLoad() {

  const getLoad = axios.get("/api/existingload");

  return dispatch =>
    getLoad.then(response =>
      dispatch({
        type: GET_LOAD,
        payload: response.data
      })
    );
}


export function saveNewLoad(load) {
  // console.log("load.actions.js saveLoad loads ", loads);
  const postLoad = axios.post("/api/newload", { ...load });
  return dispatch =>
    postLoad.then(response =>
      dispatch({
        type: SAVE_NEW_LOAD,
        payload: response.data
      })
    );
}

export function editExistingLoad(load) {
  // console.log("load.actions.js saveLoad loads ", loads);
  const postLoad = axios.post("/api/existingload", { ...load });
  return dispatch =>
    postLoad.then(response =>
      dispatch({
        type: EDIT_EXISTING_LOAD,
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
  // console.log("load.actions.js addloads ", loads)
  return {
    type: UPDATE_LOAD,
    payload: load
  };
}

export function editLoad(load) {
  console.log("load.actions.js editLoad ", load)
  return {
    type: EDIT_LOAD,
    load
  };
}

export function deleteLoad(row) {
  console.log("load.actions.js delete loads ", row);
  const loadId = row.original.id;

  if(!loadId) return {
    type: DELETE_EMPTY_LOAD,
    payload: row.index
  }


  const deleteLoad = axios.delete(`/api/existingload/deleteload/${loadId}`);

  return dispatch =>
    deleteLoad.then(response =>
      dispatch({
        type: DELETE_LOAD,
        payload: loadId
      })
    );

}

export function getLoadDateRange(dateRange) {

  const getLoadDateRange = axios.get('/api/existingload/daterange',
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

