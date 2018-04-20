import { combineReducers } from 'redux';
import { auth } from './auth';
import { dash } from './dashboard';

const rootReducer = combineReducers({dash, auth});

export default rootReducer;
