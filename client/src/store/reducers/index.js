import { combineReducers } from "redux";
import application from "./application";
import load from "./load";
import navigation from "./navigation";
// import message from './message.reducer';

const appReducers = combineReducers({
  application,
  load,
  navigation
  // message
});

export default appReducers;
