import axios from "axios";

export const GET_DATE = "GET DATE";
export const SET_DATE = "SET DATE";
export const SET_DATE_VALUE = "SET DATE VALUE";

export function getDateRange() {
  const getDateRange = axios.get("/api/daterange");

  return dispatch =>
    getDateRange.then(response =>
      dispatch({
        type: GET_DATE,
        payload: response.data
      })
    );
}

export function setDateRange(dateRange) {
  const postDateRange = axios.post("/api/daterange", {
    ...dateRange
  });
  return dispatch =>
    postDateRange.then(response =>
      dispatch({
        type: SET_DATE,
        payload: response.data
      })
    );
}

export function setDateRangeValue(value) {
  return {
    type: SET_DATE_VALUE,
    value
  };
}
