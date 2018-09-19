import axios from "axios";
// import { Datatable } from "../../../components/members/Datatable";

export const GET_TRIP = "GET TRIP";
export const SET_TRIP = "SET TRIP";
export const UPDATE_TRIP = "UPDATE TRIP";
export const SAVE_TRIPS = "SAVE TRIPS";
export const GET_TRIP_DATE_RANGE = "GET TRIP DATE RANGE";

export function getTrip() {
  // return dispatch =>
  //   dispatch({
  //     type: GET_TRIP,
  //     payload: Datatable
  //   });
  const getTrip = axios.get("/api/trip");

  return dispatch =>
    getTrip.then(response =>
      dispatch({
        type: GET_TRIP,
        payload: response.data
      })
    );
}

export function setTrip(trip) {
  // console.log("set trip called", trip);
  return {
    type: SET_TRIP,
    trip
  };
}

export function saveTrips(trips) {
  // console.log("trip.actions.js saveTrip trips ", trips);
  const postTrip = axios.post("/api/trip", { ...trips });
  return dispatch =>
    postTrip.then(response =>
      dispatch({
        type: SAVE_TRIPS,
        payload: response.data
      })
    );
}

export function updateTrip(trips) {
  // console.log("trip.actions.js updateTrip trips ", trips);
  return {
    type: UPDATE_TRIP,
    trips
  };
}

export function getTripDateRange(dateRange) {
  // return dispatch =>
  //   dispatch({
  //     type: GET_TRIP_DATE_RANGE,
  //     payload: dateRange
  //   });

  const getTripDateRange = axios.get('/api/trip/daterange',
   { params:
    { startDate: dateRange.startDate,
     endDate: dateRange.endDate } });

  return dispatch =>
    getTripDateRange.then(response =>
      dispatch({
        type: GET_TRIP_DATE_RANGE,
        payload: response.data
      })
    );
}

