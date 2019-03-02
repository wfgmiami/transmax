import * as Actions from "../../actions/index";
import { driverConfig } from "../../../configs/driverConfig.js";

const initialState = driverConfig;

const driver = (state = initialState, action) => {
  // console.log("driver reducer actionObj", action)

  switch (action.type) {

    case Actions.GET_DRIVER: {
      return [...action.payload];
    }

    case Actions.EDIT_DRIVER: {
      return [...state.map( (driver, idx) => {
        if( idx === action.driver.indexToUpdate ) {

          const newObj = { [action.driver.keyToUpdate]: action.driver.valueToUpdate,
              rowIndex:  action.driver.indexToUpdate }
          console.log('driver.reducer.js edit_driver newObj: ',newObj)
          return Object.assign({}, driver, newObj)
        }
        else return driver
      })]
    }

    case Actions.UPDATE_DRIVER: {
      console.log('driver.reducer.js update_driver state: ', state, action)

      return [...state.map( load => {

        if( (load.id && load.id === action.payload.id) || (load.rowIndex && load.rowIndex === action.payload.rowIndex )) {

          return action.payload
        }
        else return load
      })]
    }

    case Actions.SAVE_DRIVER: {
      return [...state];
    }

    case Actions.DELETE_DRIVER: {
      return [...state.map(driver => {
        if(action.payload !== driver.id)
            return driver
        else return null;
        })
        .filter( keepDriver => keepDriver)
      ]
    }

    default: {
      return state;
    }
  }
};

export default driver;
