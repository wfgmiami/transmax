import {combineReducers} from 'redux';
import candidate from './candidate.reducer';
// import settings from './settings.reducer';
// import navbar from './navbar.reducer';
// import message from './message.reducer';

const candidateReducers = combineReducers({
    candidate,
    // settings,
    // navbar,
    // message
});

export default candidateReducers;
