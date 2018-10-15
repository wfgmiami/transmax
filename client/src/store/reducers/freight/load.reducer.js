import * as Actions from "../../actions/index";
import { loadsConfig } from "../../../configs/loadsConfig.js";
// import { Datatable } from "../../../components/members/Datatable";

const initialState = [];

const loads = (state = initialState, action) => {
  // console.log("load reducer actionObj", action)

  switch (action.type) {
    case Actions.GET_LOAD: {
      return [...action.payload];
    }

    case Actions.GET_LOAD_DATE_RANGE: {
      return [...action.payload];
    }

    case Actions.DELETE_LOAD: {
      console.log('*** action load reducer delete load ', state, " ", action)
      // return [...state.map(load => {
      //   if(action.load.id === load.id) return action.load
      //   else return load
      // })]

      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    }

    case Actions.ADD_LOAD: {
      // console.log('*** action load reducer add load ', state, " ", action.load)
      return [...state,{...action.load}];
    }

    case Actions.UPDATE_LOAD: {
      // console.log('*** action load reducer update load ', state, " ", action)

      return [...state.map( (load, idx) => {
        if( idx === action.load.indexToUpdate ) {

          const newObj = { [action.load.keyToUpdate]: action.load.valueToUpdate }
          // console.log('idx; action.load.indexToUpdate',idx, load, action.load.indexToUpdate, newObj)
          return Object.assign({}, load, newObj)
        }
        else return load
      })]

    }


    case Actions.SAVE_LOAD: {
      // console.log('*** save loads reducer ', action, state)

      return [...state.map(load => {
        if(action.payload.id === load.id) return action.payload
        else return load
      })]
    }

    default: {
      return state;
    }
  }
};

export default loads;
