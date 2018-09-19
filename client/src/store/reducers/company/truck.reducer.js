import * as Actions from "../../actions/index";
import { truckConfig } from "../../../configs/truckConfig.js";

const initialState = truckConfig;

const truck = (state = initialState, action) => {
  // console.log("truck reducer actionObj", action)

  switch (action.type) {
    case Actions.GET_TRUCK: {
      return [...action.payload];
    }

    case Actions.SET_TRUCK: {
      return [...state, { ...action.truck }];
    }

    case Actions.UPDATE_TRUCK: {
      return [...action.truck.data];
    }

    case Actions.SAVE_TRUCK: {
      return [...state];
    }

    default: {
      return state;
    }
  }
};

export default truck;
