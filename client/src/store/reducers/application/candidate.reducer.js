import * as Actions from '../../actions/index';
import { candidateConfig } from '../../../configs/candidateConfig.js';

const initialState = candidateConfig;

const candidate = ( state = initialState, action ) => {

  switch( action.type ){
    case Actions.GET_CANDIDATE:
    {
      return {
        ...state
      }
    }
    case Actions.SUCCESS_CANDIDATE_APPLICATION:
    {
      return {
        ...state,
        applicationSuccess: true
      }
    }
    case Actions.SET_CANDIDATE_ATTRIBUTES:
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

export default candidate;
