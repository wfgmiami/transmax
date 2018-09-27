import * as Actions from "../../actions/index";
import { variableCostConfig } from "../../../configs/variableCostConfig.js";

const initialState = variableCostConfig;

const variableCost = (state = initialState, action) => {
  console.log("variableCost reducer actionObj", action, " ", [
    ...state,
    { ...action.variableCost }
  ]);
  switch (action.type) {
    case Actions.GET_VARIABLE_COST: {
      return [...action.payload];
    }

    case Actions.SET_VARIABLE_COST: {
      return [...state, { ...action.variableCost }];
    }

    case Actions.UPDATE_VARIABLE_COST: {
      return [...action.variableCost.data];
    }

    case Actions.SAVE_VARIABLE_COST: {
      return [...state];
    }

    default: {
      return state;
    }
  }
};

export default variableCost;
