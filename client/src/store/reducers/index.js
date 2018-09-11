import { combineReducers } from "redux";
import application from "./application";
import load from "./load";
import navigation from "./navigation";
import authentication from './authentication';

const appReducers = combineReducers({
  application,
  load,
  navigation,
  authentication
});

export default appReducers;
