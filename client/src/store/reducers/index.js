import {combineReducers} from 'redux';
import application from './application';
import load from './load';
// import navbar from './navbar.reducer';
// import message from './message.reducer';

const appReducers = combineReducers({
    application,
    load,
    // navbar,
    // message
});

export default appReducers;
