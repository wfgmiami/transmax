import * as Actions from "../../actions/index";
import { loadsConfig } from "../../../configs/loadsConfig.js";

const initialState = loadsConfig;

const trips = (state = initialState, action) => {
  console.log("trip reducer actionObj", action, " ", [
    ...state,
    { ...action.trip }
  ]);
  switch (action.type) {
    case Actions.GET_TRIP: {
      return [...action.payload];
    }

    case Actions.SET_TRIP: {
      return [...state, { ...action.trip }];
    }

    case Actions.UPDATE_TRIP: {
      return [...action.trips.data];
    }

    case Actions.SAVE_TRIPS: {
      return [...state];
    }

    default: {
      return state;
    }
  }
};

export default trips;
