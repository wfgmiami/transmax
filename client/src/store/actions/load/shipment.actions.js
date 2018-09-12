import axios from "axios";
import { ShipmentsData } from "../../../components/members/Datatable";

export const GET_SHIPMENT = "GET SHIPMENT";
export const SET_SHIPMENT = "SET SHIPMENT";
export const UPDATE_SHIPMENT = "UPDATE SHIPMENT";
export const SAVE_SHIPMENTS = "SAVE SHIPMENTS";

export function getShipment() {
  return dispatch =>
    dispatch({
      type: GET_SHIPMENT,
      payload: ShipmentsData
    });
  // const getShipment = axios.get("/api/shipment");

  // return dispatch =>
  //   getTrip.then(response =>
  //     dispatch({
  //       type: GET_SHIPMENT,
  //       payload: response.data
  //     })
  //   );
}

export function setShipment(shipment) {
  console.log("shipment.actions called ", shipment);
  return {
    type: SET_SHIPMENT,
    shipment
  };
}

export function saveShipments(shipments) {
  console.log("shipment.actions.js saveShipments ", shipments);
  const postShipments = axios.post("/api/shipments", { ...shipments });
  return dispatch =>
    postShipments.then(response =>
      dispatch({
        type: SAVE_SHIPMENTS,
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
