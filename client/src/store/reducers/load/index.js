import { combineReducers } from "redux";
import trip from "./trip.reducer";
import costInputs from "./costInputs.reducer";
import dateRange from "./dateRange.reducer";
// import message from './message.reducer';

const tripReducers = combineReducers({
  trip,
  costInputs,
  dateRange
  // message
});

export default tripReducers;
