import {combineReducers} from 'redux';
import trip from './trip.reducer';
// import settings from './settings.reducer';
// import navbar from './navbar.reducer';
// import message from './message.reducer';

const tripReducers = combineReducers({
    trip,
    // settings,
    // navbar,
    // message
});

export default tripReducers;
