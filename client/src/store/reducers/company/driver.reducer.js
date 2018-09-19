import * as Actions from "../../actions/index";
import { driverConfig } from "../../../configs/driverConfig.js";

const initialState = driverConfig;

const driver = (state = initialState, action) => {
  // console.log("driver reducer actionObj", action)

  switch (action.type) {
    case Actions.GET_DRIVER: {
      return [...action.payload];
    }

    case Actions.SET_DRIVER: {
      return [...state, { ...action.driver }];
    }

    case Actions.UPDATE_DRIVER: {
      return [...action.driver.data];
    }

    case Actions.SAVE_DRIVER: {
      return [...state];
    }

    default: {
      return state;
    }
  }
};

export default driver;
