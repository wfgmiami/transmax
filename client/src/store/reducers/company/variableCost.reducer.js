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
      return [...state,...action.payload];
    }

    case Actions.SET_VARIABLE_COST: {
      return [...state, { ...action.variableCost }];
    }

    case Actions.UPDATE_VARIABLE_COST: {
      // console.log('action ', action, state)

      let costToUpdate = {};
      let updatedState = [];
      updatedState.push({ costName: "Driver Pay",
                        dollarPerMile: Number(action.variableCost.driverpayDollarPerMile).toFixed(2) })
      updatedState.push({ costName: "Diesel Cost",
                        dollarPerMile: (Number(action.variableCost.dieselppg) / Number(action.variableCost.mpg)).toFixed(2) })
      updatedState.push({ costName: "DEF Cost",
                        dollarPerMile:(Number(action.variableCost.defppg) /
                        (Number(action.variableCost.mpg) / Number(action.variableCost.defConsumptionRate))).toFixed(2) })
      updatedState.push({ costName: "Oil Change",
                        dollarPerMile: (Number(action.variableCost.oilChangeCost) / Number(action.variableCost.oilChangeMiles)).toFixed(2) })

      let truckTiresChangeCost =  Number(action.variableCost.truckTiresChangeCost) /
                                  Number(action.variableCost.truckTiresChangeMiles);
      let trailerTiresChangeCost = Number(action.variableCost.trailerTiresChangeCost) /
                                  Number(action.variableCost.trailerTiresChangeMiles);

      updatedState.push({ costName: "Tires Change",
                        dollarPerMile: (truckTiresChangeCost + trailerTiresChangeCost).toFixed(2) })
                        // console.log('action2 ', updatedState)
      return [...updatedState]
    }

    case Actions.DIRECT_UPDATE_VARIABLE_COST: {
      // console.log('direct update variable cost', action, state)
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
