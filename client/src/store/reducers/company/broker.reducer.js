import * as Actions from "../../actions/index";
import { brokerConfig } from "../../../configs/brokerConfig.js";

const initialState = [];

const broker = (state = initialState, action) => {
  // console.log("broker reducer actionObj", action);

  switch (action.type) {
    case Actions.GET_BROKER: {
      return [...action.payload];
    }

    case Actions.SET_BROKER: {
      return [...state, { ...action.broker }];
    }

     // when putting numbers in edit mode
     case Actions.EDIT_BROKER: {
      // console.log('*** action broker reducer edit broker ', state, " ", action)

      return [...state.map( (broker, idx) => {
        if( idx === action.broker.indexToUpdate ) {

          const newObj = { [action.broker.keyToUpdate]: action.broker.valueToUpdate,
              rowIndex:  action.broker.indexToUpdate }
          console.log('idx; action.broker.indexToUpdate',newObj)
          return Object.assign({}, broker, newObj)
        }
        else return broker
      })]

    }

    // when closing edit mode
    case Actions.UPDATE_BROKER: {
      console.log('*** action broker reducer update broker ', state, " ", action)

      return [...state.map( broker => {

        if( (broker.id && broker.id === action.payload.id) || (broker.rowIndex && broker.rowIndex === action.payload.rowIndex )) {

          return action.payload
        }
        else return broker
      })]

    }

    case Actions.SAVE_BROKER: {
      console.log('*** save broker reducer ', action, state)

      return [...state.map( (broker, idx) => {
        if(broker.id === action.payload.id) {
          return action.payload;
        }
        else return broker
      })]
    }

    default: {
      return state;
    }
  }
};

export default broker;
