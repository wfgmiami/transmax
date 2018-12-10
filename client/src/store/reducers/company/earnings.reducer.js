import * as Actions from "../../actions/index";
import { earningsConfig } from "../../../configs/earningsConfig.js";

const initialState = earningsConfig;

const earnings = (state = initialState, action) => {
//   console.log("earnings reducer actionObj", action);

  switch (action.type) {
    case Actions.GET_EARNINGS: {
      return [...action.payload];
    }

    case Actions.SET_EARNINGS: {
      return [...state, { ...action.earnings }];
    }

    case Actions.UPDATE_EARNINGS: {
      return [...action.earnings.data];
    }

    case Actions.DELETE_LOAD: {
      console.log('*** action earnings reducer delete earnings ', state, " ", action)

      return [...state.map(earnings => {
        if(action.payload !== earnings.id)
            return earnings
        else return null;
        })
        .filter( keepEarnings => keepEarnings)
      ]

    }

    case Actions.SAVE_EARNINGS: {
      return [...state];
    }

    default: {
      return state;
    }
  }
};

export default earnings;
