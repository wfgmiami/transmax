import axios from "axios";
// import { Truck } from "../../../components/members/Datatable";

export const GET_TRUCK = "GET TRUCK";
export const SET_TRUCK = "SET TRUCK";
export const UPDATE_TRUCK = "UPDATE TRUCK";
export const SAVE_TRUCK = "SAVE TRUCK";

export function getTruck() {
  // return dispatch =>
  //   dispatch({
  //     type: GET_TRUCK,
  //     payload: Truck
  //   });
  const getTruck = axios.get("/api/truck");

  return dispatch =>
    getTruck.then(response =>
      dispatch({
        type: GET_TRUCK,
        payload: response.data
      })
    );
}

export function setTruck(truck) {
  // console.log("set truck called", truck);
  return {
    type: SET_TRUCK,
    truck
  };
}

export function saveTruck(truck) {
  // console.log("truck.actions.js saveTruck ", truck);
  const postTruck = axios.post("/api/truck", { ...truck });
  return dispatch =>
    postTruck.then(response =>
      dispatch({
        type: SAVE_TRUCK,
        payload: response.data
      })
    );
}

export function updateTruck(truck) {
  // console.log("trip.actions.js updateTrip trips ", trips);
  return {
    type: UPDATE_TRUCK,
    truck
  };
}
