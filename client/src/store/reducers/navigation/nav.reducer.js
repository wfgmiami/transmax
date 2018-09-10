import * as Actions from "../../actions/index";
import { menuNavigationConfig } from "../../../configs/menuNavigationConfig";

const initialState = { activeMenu: "" };

const nav = (state = initialState, action) => {
  console.log("reducer", action, state);
  switch (action.type) {
    case Actions.GET_NAVIGATION: {
      return {
        ...state
      };
    }
    case Actions.SET_NAVIGATION: {
      return {
        ...state,
        activeMenu: action.nav
      };
    }
    default: {
      return state;
    }
  }
};

export default nav;
