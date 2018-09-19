import axios from "axios";
// import { Broker } from "../../../components/members/Datatable";

export const GET_BROKER = "GET BROKER";
export const SET_BROKER = "SET BROKER";
export const UPDATE_BROKER = "UPDATE BROKER";
export const SAVE_BROKER = "SAVE BROKER";

export function getBroker() {
  // return dispatch =>
  //   dispatch({
  //     type: GET_BROKER,
  //     payload: Broker
  //   });
  const getBroker = axios.get("/api/broker");

  return dispatch =>
    getBroker.then(response =>
      dispatch({
        type: GET_BROKER,
        payload: response.data
      })
    );
}

export function setBroker(broker) {
  // console.log("set broker called", broker);
  return {
    type: SET_BROKER,
    broker
  };
}

export function saveBroker(broker) {
  // console.log("broker.actions.js saveBroker ", broker);
  const postBroker = axios.post("/api/broker", { ...broker });
  return dispatch =>
    postBroker.then(response =>
      dispatch({
        type: SAVE_BROKER,
        payload: response.data
      })
    );
}

export function updateBroker(broker) {
  // console.log("trip.actions.js updateTrip trips ", trips);
  return {
    type: UPDATE_BROKER,
    broker
  };
}
