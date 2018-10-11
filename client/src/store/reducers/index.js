import { combineReducers } from "redux";
import application from "./application";
import freight from "./freight";
import navigation from "./navigation";
import authentication from './authentication';
import company from "./company";

const appReducers = combineReducers({
  application,
  freight,
  navigation,
  authentication,
  company
});

export default appReducers;
