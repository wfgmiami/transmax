import * as Actions from "../../actions/index";
import { fixedCostConfig } from "../../../configs/fixedCostConfig.js";

const initialState = fixedCostConfig;

const fixedCost = (state = initialState, action) => {
  // console.log("fixedCost reducer actionObj", action, " ", [
  //   ...state,
  //   { ...action.fixedCost }
  // ]);

  switch (action.type) {
    case Actions.GET_FIXED_COST: {
      return [...action.payload];
    }

    case Actions.SET_FIXED_COST: {
      return [...state, { ...action.fixedCost }];
    }

    case Actions.UPDATE_FIXED_COST: {
      return [...action.fixedCost.data];
    }

    case Actions.SAVE_FIXED_COST: {
      return [...state];
    }

    default: {
      return state;
    }
  }
};

export default fixedCost;
