import * as Actions from "../../actions/index";
// import { variableCostConfig } from "../../../configs/variableCostConfig.js";

const initialState = [];

const variableCost = (state = initialState, action) => {
  // console.log("variableCost reducer actionObj", action, " ", [
  //   ...state,
  //   { ...action.variableCost }
  // ]);
  switch (action.type) {

    case Actions.GET_VARIABLE_COST: {
      // console.log('*** variableCost.reducer, state, action.payload ', state, action.payload)
      if( state.length === 0 ) return [...state,...action.payload]
      else return [...state.map(stateCost => {
        return action.payload.find( updatedCost => updatedCost.costName === stateCost.costName )
      })]
    }

    case Actions.SET_VARIABLE_COST: {
      return [...state, { ...action.variableCost }];
    }

    case Actions.UPDATE_VARIABLE_COST: {
      // console.log('reducer update variable cost ', action, state)

      return [...state.map(stateCost => {
        return action.payload.find( updatedCost => {
          return updatedCost.id === stateCost.id
        })
      })]

    }

    case Actions.DIRECT_UPDATE_VARIABLE_COST: {
      // console.log('direct update variable cost', action, state)
      return [...action.variableCost.data];
    }

    default: {
      return state;
    }
  }
};

export default variableCost;
