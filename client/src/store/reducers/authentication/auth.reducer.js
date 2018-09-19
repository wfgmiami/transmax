import * as Actions from "../../actions/index";

const initialState = { authenticated: "" };

const auth = (state = initialState, action) => {
// console.log('auth reducer ', action)
  switch (action.type) {
    case Actions.GET_AUTH: {
      return {
        ...state
      };
    }
    case Actions.SET_AUTH: {
      return {
        ...state,
        ...action.auth
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
