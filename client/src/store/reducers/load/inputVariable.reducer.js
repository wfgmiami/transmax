import * as Actions from "../../actions/index";

const initialState = { mpg: "6", dispatchPercent: "0.1" };

const inputVariable = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_INPUT_VARIABLE: {
      // console.log("...action payload", action);
      return { ...action.payload };
    }
    case Actions.SET_INPUT_VARIABLE: {
      return {
        ...action.attribute
      };
    }
    case Actions.SET_INPUT_VARIABLE_VALUE: {
      // console.log("input var reducer action ", action);
      return {
        ...state,
        ...action.value
      };
    }
    default: {
      return state;
    }
  }
};

export default inputVariable;
