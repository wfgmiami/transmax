import { combineReducers } from "redux";
import trip from "./trip.reducer";
import inputVariable from "./inputVariable.reducer";
import dateRange from "./dateRange.reducer";
// import message from './message.reducer';

const tripReducers = combineReducers({
  trip,
  inputVariable,
  dateRange
  // message
});

export default tripReducers;
