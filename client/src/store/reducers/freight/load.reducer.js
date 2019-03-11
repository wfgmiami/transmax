import * as Actions from "../../actions/index";

const initialState = [];

const loads = (state = initialState, action) => {
  // console.log("load reducer actionObj", action)

  switch (action.type) {
    case Actions.GET_LOAD: {
      return [...state, ...action.payload];
    }

    case Actions.GET_LOAD_DATE_RANGE: {

      const sortedByDate = action.payload.sort( (d1, d2) => {
        let pickupDate1 = new Date(d1.pickupDate)
        let pickupDate2 = new Date(d2.pickupDate)
        console.log('d1:', d1.pickupDate, 'd2:', new Date(d2.pickupDate), 'compare: ', pickupDate1 - pickupDate2)
        return pickupDate1 - pickupDate2 }
        );
      console.log('date range: ', sortedByDate)
      return [...sortedByDate]

    }

    case Actions.DELETE_EMPTY_LOAD: {
      return [...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ]
    }

    case Actions.DELETE_LOAD: {
      console.log('*** action load reducer deleteLoad state: ', state, " action: ", action)

      return [...state.map(load => {
        if(action.payload !== load.id)
            return load
        else return null;
        })
        .filter( keepLoad => keepLoad)
      ]

    }

    case Actions.ADD_LOAD: {
      // console.log('*** load.reducer addLoad ', state, " action.load: ", action.load)
      return [...state,{...action.load}];
    }


    case Actions.EDIT_LOAD: {
      // when putting numbers in edit mode (need it because otherwise the change is not captured in the store)
      console.log('*** load.reducer editLoad state: ', state, " action: ", action)

      return [...state.map( (load, idx) => {
        if( idx === action.load.indexToUpdate ) {

          const newObj = { [action.load.keyToUpdate]: action.load.valueToUpdate,
              rowIndex:  action.load.indexToUpdate }
          console.log('*** load.reducer editLoad newObj: ', newObj)
          return Object.assign({}, load, newObj)
        }
        else return load
      })]

    }

    case Actions.UPDATE_LOAD: {
      // when closing edit mode (need it in order to persist the calculated fields eg dispatch cost)
      // console.log('*** load.reducer updateLoad state: ', state, " action: ", action)
      // load.id only on existing loads; on new loads- load.rowIndex
      return [...state.map( load => {
        // console.log('load:', load, 'action.payload.id ', action.payload.id)
        if( (load.id && load.id === action.payload.id) || (load.rowIndex && load.rowIndex === action.payload.rowIndex )) {
          return action.payload
        }
        else return load
      })]

    }

    case Actions.SAVE_NEW_LOAD: {
      console.log('*** save new load reducer ', action, state)
      return [...state.map( (load, idx) => {
        if(load.rowIndex === action.payload.rowIndex) {
          return action.payload;
        }
        else return load
      })]

    }

    case Actions.SAVE_EXISTING_LOAD: {
      console.log('*** save existing load reducer action: ', action, ' state: ', state)
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
