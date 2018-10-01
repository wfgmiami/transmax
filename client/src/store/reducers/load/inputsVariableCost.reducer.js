import * as Actions from "../../actions/index";
import { inputsVariableCostConfig } from "../../../configs/inputsVariableCostConfig";

const initialState = inputsVariableCostConfig;

const inputsVariableCost = (state = initialState, action) => {
  // console.log("input variable cost reducer action ", state, action);

  switch (action.type) {
    case Actions.GET_INPUT_VARIABLE: {
      return {...action.payload[0]};
    }
    case Actions.SAVE_INPUT_VARIABLE: {
      //  console.log("input variable cost reducer SAVE_INPUT_VARIABLE ", state, action);
      return {
        ...action.payload
      };
    }
    case Actions.SET_INPUT_VARIABLE_VALUE: {
      // console.log("input variable cost reducer SET_INPUT_VARIABLE_VALUE ", state, action);
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

export default inputsVariableCost;
