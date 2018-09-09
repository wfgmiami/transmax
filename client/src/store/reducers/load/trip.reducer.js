import * as Actions from '../../actions/index';
import { tripsConfig } from '../../../configs/tripsConfig.js';

const initialState = tripsConfig;

const trips = ( state = initialState, action ) => {

  switch( action.type ){
    case Actions.GET_TRIP:
    {
      console.log('...action payload', action)
      return [
        ...action.payload
      ]
    }

    case Actions.SET_TRIP:
    {
      return {
        ...state,
        ...action.attribute
      }
    }
    default:
    {
      return state;
    }
  }
}

export default trips;
