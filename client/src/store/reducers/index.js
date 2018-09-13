import { combineReducers } from "redux";
import application from "./application";
import load from "./load";
import navigation from "./navigation";
import authentication from './authentication';
import company from "./company";

const appReducers = combineReducers({
  application,
  load,
  navigation,
  authentication,
  company
});

export default appReducers;
