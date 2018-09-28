import * as Actions from "../../actions/index";
import { costInputsConfig } from "../../../configs/costInputsConfig";

const initialState = costInputsConfig;

const costInputs = (state = initialState, action) => {
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
      console.log("inputVariable reducer SET_INPUT_VARIABLE_VALUE ", state, action);
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

export default costInputs;
