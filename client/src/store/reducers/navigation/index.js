import { combineReducers } from "redux";
import nav from "./nav.reducer";
// import settings from './settings.reducer';
// import navbar from './navbar.reducer';
// import message from './message.reducer';

const navigationReducers = combineReducers({
  nav
  // settings,
  // navbar,
  // message
});

export default navigationReducers;
