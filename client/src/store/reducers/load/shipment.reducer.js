import * as Actions from "../../actions/index";
// import { shipmentsConfig } from "../../../configs/shipmentsConfig.js";

const initialState = {}//shipmentsConfig;

const shipments = (state = initialState, action) => {
  // console.log("shipment reducer actionObj", action, " ", [
  //   ...state,
  //   { ...action.shipment }
  // ]);
  switch (action.type) {
    case Actions.GET_SHIPMENT: {
      return [...action.payload];
    }

    case Actions.SET_SHIPMENT: {
      return [...state, { ...action.shipment }];
    }

    case Actions.UPDATE_SHIPMENT: {
      return [...action.shipment.data];
    }

    case Actions.SAVE_SHIPMENT: {
      return [...state];
    }

    default: {
      return state;
    }
  }
};

export default shipments;
