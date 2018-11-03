import * as Actions from "../../actions/index";

const initialState = [];

const loads = (state = initialState, action) => {
  // console.log("load reducer actionObj", action)

  switch (action.type) {
    case Actions.GET_LOAD: {
      return [...state, ...action.payload];
    }

    case Actions.GET_LOAD_DATE_RANGE: {
      return [...action.payload];
    }

    case Actions.DELETE_EMPTY_LOAD: {
      return [...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ]
    }

    case Actions.DELETE_LOAD: {
      console.log('*** action load reducer delete load ', state, " ", action)

      return [...state.map(load => {
        if(action.payload !== load.id)
            return load
        else return null;
        })
        .filter( keepLoad => keepLoad)
      ]

    }

    case Actions.ADD_LOAD: {
      // console.log('*** action load reducer add load ', state, " ", action.load)
      return [...state,{...action.load}];
    }

    // when putting numbers in edit mode
    case Actions.EDIT_LOAD: {
      // console.log('*** action load reducer edit load ', state, " ", action)

      return [...state.map( (load, idx) => {
        if( idx === action.load.indexToUpdate ) {

          const newObj = { [action.load.keyToUpdate]: action.load.valueToUpdate,
              rowIndex:  action.load.indexToUpdate }
          // console.log('idx; action.load.indexToUpdate',newObj)
          return Object.assign({}, load, newObj)
        }
        else return load
      })]

    }
    // when closing edit mode
    case Actions.UPDATE_LOAD: {
      // console.log('*** action load reducer update load ', state, " ", action)

      return [...state.map( load => {

        if( load.id === action.payload.id || (load.rowIndex && load.rowIndex === action.payload.rowIndex )) {
          return action.payload
        }
        else return load
      })]

    }

    case Actions.SAVE_NEW_LOAD: {
      console.log('*** save new load reducer ', action, state)

      return [...state.map( (load, idx) => {
        if( !load.id ) {
          return action.payload;
        }
        else return load
      })]

      // return [
      //   ...state,{...action.payload}
      // ]

    }

    case Actions.EDIT_EXISTING_LOAD: {
      console.log('*** save existing load reducer ', action, state)

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
