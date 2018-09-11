import * as Actions from "../../actions/index";

const initialState = { activeMenu: "" };

const nav = (state = initialState, action) => {

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
