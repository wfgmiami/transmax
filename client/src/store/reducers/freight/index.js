import { combineReducers } from "redux";
import load from "./load.reducer";
import dateRange from "./dateRange.reducer";
// import message from './message.reducer';

const loadReducers = combineReducers({
  load,
  dateRange
  // message
});

export default loadReducers;
