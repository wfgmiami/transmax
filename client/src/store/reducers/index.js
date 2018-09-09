import {combineReducers} from 'redux';
import application from './application';
// import settings from './trips';
// import navbar from './navbar.reducer';
// import message from './message.reducer';

const appReducers = combineReducers({
    application,
    // settings,
    // navbar,
    // message
});

export default appReducers;
