import { combineReducers } from "redux";
import trip from "./trip.reducer";
import inputVariable from "./inputVariable.reducer";
import shipment from "./shipment.reducer";
// import message from './message.reducer';

const tripReducers = combineReducers({
  trip,
  inputVariable,
  shipment
  // navbar,
  // message
});

export default tripReducers;
