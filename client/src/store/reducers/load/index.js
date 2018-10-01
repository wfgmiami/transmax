import { combineReducers } from "redux";
import trip from "./trip.reducer";
import inputsVariableCost from "./inputsVariableCost.reducer";
import dateRange from "./dateRange.reducer";
// import message from './message.reducer';

const tripReducers = combineReducers({
  trip,
  inputsVariableCost,
  dateRange
  // message
});

export default tripReducers;
