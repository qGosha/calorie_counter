import { combineReducers } from 'redux';
import { auth } from './auth';
import { dash } from './dashboard';
import { food } from './food';

const rootReducer = combineReducers({dash, auth});

export default rootReducer;
