import * as Actions from "../../actions/index";
import { brokerConfig } from "../../../configs/brokerConfig.js";

const initialState = brokerConfig;

const broker = (state = initialState, action) => {
  // console.log("broker reducer actionObj", action);

  switch (action.type) {
    case Actions.GET_BROKER: {
      return [...action.payload];
    }

    case Actions.SET_BROKER: {
      return [...state, { ...action.broker }];
    }

    case Actions.UPDATE_BROKER: {
      return [...action.broker.data];
    }

    case Actions.SAVE_BROKER: {
      return [...state];
    }

    default: {
      return state;
    }
  }
};

export default broker;
