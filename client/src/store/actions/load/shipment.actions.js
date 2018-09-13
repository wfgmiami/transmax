import axios from "axios";
import { ShipmentsData } from "../../../components/members/Datatable";

export const GET_SHIPMENT = "GET SHIPMENT";
export const SET_SHIPMENT = "SET SHIPMENT";
export const UPDATE_SHIPMENT = "UPDATE SHIPMENT";
export const SAVE_SHIPMENT = "SAVE SHIPMENT";

export function getShipment() {
  // return dispatch =>
  //   dispatch({
  //     type: GET_SHIPMENT,
  //     payload: ShipmentsData
  //   });
  const getShipment = axios.get("/api/shipment");

  return dispatch =>
    getShipment.then(response =>
      dispatch({
        type: GET_SHIPMENT,
        payload: response.data
      })
    );
}

export function setShipment(shipment) {
  // console.log("shipment.actions called ", shipment);
  return {
    type: SET_SHIPMENT,
    shipment
  };
}

export function saveShipment(shipment) {
  // console.log("shipment.actions.js saveShipments ", shipment);
  const postShipments = axios.post("/api/shipment", { ...shipment });
  return dispatch =>
    postShipments.then(response =>
      dispatch({
        type: SAVE_SHIPMENT,
        payload: response.data
      })
    );
}

export function updateShipment(shipment) {
  // console.log("shipment.actions.js updateShipment ", shipment);
  return {
    type: UPDATE_SHIPMENT,
    shipment
  };
}
