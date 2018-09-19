import axios from "axios";
// import { Driver } from "../../../components/members/Datatable";

export const GET_DRIVER = "GET DRIVER";
export const SET_DRIVER = "SET DRIVER";
export const UPDATE_DRIVER = "UPDATE DRIVER";
export const SAVE_DRIVER = "SAVE DRIVER";

export function getDriver() {
  // return dispatch =>
  //   dispatch({
  //     type: GET_DRIVER,
  //     payload: Driver
  //   });
  const getDriver = axios.get("/api/driver");

  return dispatch =>
    getDriver.then(response =>
      dispatch({
        type: GET_DRIVER,
        payload: response.data
      })
    );
}

export function setDriver(driver) {
  // console.log("set driver called", driver);
  return {
    type: SET_DRIVER,
    driver
  };
}

export function saveDriver(driver) {
  // console.log("driver.actions.js saveDriver ", driver);
  const postDriver = axios.post("/api/driver", { ...driver });
  return dispatch =>
    postDriver.then(response =>
      dispatch({
        type: SAVE_DRIVER,
        payload: response.data
      })
    );
}

export function updateDriver(driver) {
  // console.log("trip.actions.js updateTrip trips ", trips);
  return {
    type: UPDATE_DRIVER,
    driver
  };
}
