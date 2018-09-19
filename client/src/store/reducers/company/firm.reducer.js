import * as Actions from "../../actions/index";
import { firmConfig } from "../../../configs/firmConfig.js";

const initialState = firmConfig;

const firm = (state = initialState, action) => {
  // console.log("firm reducer actionObj", action)

  switch (action.type) {
    case Actions.GET_FIRM: {
      return [...action.payload];
    }

    case Actions.SET_FIRM: {
      return [...state, { ...action.firm }];
    }

    case Actions.UPDATE_FIRM: {
      return [...action.firm.data];
    }

    case Actions.SAVE_FIRM: {
      return [...state];
    }

    default: {
      return state;
    }
  }
};

export default firm;
