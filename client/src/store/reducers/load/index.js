import { combineReducers } from "redux";
import trip from "./trip.reducer";
import inputVariable from "./inputVariable.reducer";
// import navbar from './navbar.reducer';
// import message from './message.reducer';

const tripReducers = combineReducers({
  trip,
  inputVariable
  // navbar,
  // message
});

export default tripReducers;
