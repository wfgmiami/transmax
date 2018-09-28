import axios from "axios";

export const GET_INPUT_VARIABLE = "GET INPUT VARIABLE";
export const SET_INPUT_VARIABLE = "SET INPUT VARIABLE";
export const SET_INPUT_VARIABLE_VALUE = "SET INPUT VARIABLE VALUE";

export function getInputVariable() {
  const getInputVariable = axios.get("/api/inputvariable");

  return dispatch =>
    getInputVariable.then(response =>
      dispatch({
        type: GET_INPUT_VARIABLE,
        payload: response.data
      })
    );
}

export function setInputVariable(inputVariable) {
  const postInputVariable = axios.post("/api/inputvariable", {
    ...inputVariable
  });
  return dispatch =>
    postInputVariable.then(response =>
      dispatch({
        type: SET_INPUT_VARIABLE,
        payload: response.data
      })
    );
}

export function setInputVariableValue(value) {
  return {
    type: SET_INPUT_VARIABLE_VALUE,
    value
  };
}
