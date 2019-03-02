import axios from "axios";
// import { Driver } from "../../../components/members/Datatable";

export const GET_DRIVER = "GET DRIVER";
export const UPDATE_DRIVER = "UPDATE DRIVER";
export const EDIT_DRIVER = "EDIT DRIVER";
export const SAVE_DRIVER = "SAVE DRIVER";
export const DELETE_DRIVER = "DELETE DRIVER";

export function getDriver() {
  const getDriver = axios.get("/api/driver");
  return dispatch =>
    getDriver.then(response =>
      dispatch({
        type: GET_DRIVER,
        payload: response.data
      })
    );
}

export function updateDriver(driver) {
  console.log("*** driver.actions.js updateDriver driver: ", driver)
  return {
    type: UPDATE_DRIVER,
    payload: driver
  };
}

export function saveDriver(driver) {
  console.log("driver.actions.js saveDriver driver:", driver);
  const postDriver = axios.post("/api/driver", { ...driver });
  return dispatch =>
    postDriver.then(response =>
      dispatch({
        type: SAVE_DRIVER,
        payload: response.data
      })
    );
}

export function editDriver(driver) {
  console.log("driver.actions.js editDriver driver:", driver);
  const postLoad = axios.post("/api/driver/existingdriver", { ...driver });
  return dispatch =>
    postLoad.then(response =>
      dispatch({
        type: EDIT_DRIVER,
        payload: response.data
      })
    );
}

export function deleteDriver(row) {
  console.log("driver.actions.js deleteDriver ", row);
  const driverId = row.original.id;
  const deleteDriver = axios.delete(`/api/driver/deletedriver/${driverId}`);

  return dispatch =>
    deleteDriver.then(response =>
      dispatch({
        type: DELETE_DRIVER,
        payload: driverId
      })
    );

}
