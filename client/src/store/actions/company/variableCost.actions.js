import axios from "axios";

export const GET_VARIABLE_COST = "GET VARIABLE_COST";
export const SET_VARIABLE_COST = "SET VARIABLE_COST";
export const UPDATE_VARIABLE_COST = "UPDATE VARIABLE_COST";
export const DIRECT_UPDATE_VARIABLE_COST = "DIRECT UPDATE VARIABLE COST";
export const SAVE_VARIABLE_COST = "SAVE VARIABLE_COST";

export function getVariableCost() {

  const getVariableCost = axios.get("/api/variablecost");

  return dispatch =>
    getVariableCost.then(response =>
      dispatch({
        type: GET_VARIABLE_COST,
        payload: response.data
      })
    );

}

export function setVariableCost(variableCost) {
  // console.log("set variable called", variableCost);
  return {
    type: SET_VARIABLE_COST,
    variableCost
  };
}

export function saveVariableCost(variableCost) {
  // console.log("variableCostaction.js variableCost ", variableCost);
  let updatedState = [];
  updatedState.push({ id: 1, costName: "Driver Pay",
                    dollarPerMile: Number(variableCost.driverpayDollarPerMile).toFixed(2) })
  updatedState.push({ id: 2, costName: "Diesel Cost",
                    dollarPerMile: (Number(variableCost.dieselppg) / Number(variableCost.mpg)).toFixed(2) })
  updatedState.push({ id: 3, costName: "DEF Cost",
                    dollarPerMile:(Number(variableCost.defppg) /
                    (Number(variableCost.mpg) / Number(variableCost.defConsumptionRate))).toFixed(2) })
  updatedState.push({ id: 4, costName: "Oil Change",
                    dollarPerMile: (Number(variableCost.oilChangeCost) / Number(variableCost.oilChangeMiles)).toFixed(2) })

  let truckTiresChangeCost =  Number(variableCost.truckTiresChangeCost) /
                              Number(variableCost.truckTiresChangeMiles);
  let trailerTiresChangeCost = Number(variableCost.trailerTiresChangeCost) /
                              Number(variableCost.trailerTiresChangeMiles);

  updatedState.push({ id: 5, costName: "Tires Change",
                    dollarPerMile: (truckTiresChangeCost + trailerTiresChangeCost).toFixed(2) })

                    // console.log(' ', updatedState)


  const postVariableCost = axios.post("/api/variablecost", [...updatedState ]);
  return dispatch =>
    postVariableCost.then(response =>{
      // console.log('response from variableCost axios post ', response)
      dispatch({
        type: UPDATE_VARIABLE_COST,
        payload: response.data
      })}
    );
}

export function updateVariableCost(variableCost) {

  return {
    type: UPDATE_VARIABLE_COST,
    variableCost
  };
}

export function updateDirectVariableCost(variableCost) {

    return {
      type: DIRECT_UPDATE_VARIABLE_COST,
      variableCost
    };
  }
