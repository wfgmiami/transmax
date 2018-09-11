import * as Actions from '../../actions/index';
import { tripsConfig } from '../../../configs/tripsConfig.js';

const initialState = tripsConfig;

const trips = ( state = initialState, action ) => {
  console.log('trip reducer actionObj',action,' ', [...state,{...action.trip}])
  switch( action.type ){

    case Actions.GET_TRIP:
    {
      return [
        ...action.payload
      ]
    }

    case Actions.SET_TRIP:
    {
      return [
        ...state,
        {...action.trip}
      ]
    }

    case Actions.UPDATE_TRIP:
    {
      return [...action.trips.data]
    }

    default:
    {
      return state;
    }
  }
}

export default trips;
