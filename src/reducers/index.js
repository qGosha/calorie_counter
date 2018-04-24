import { combineReducers } from 'redux';
import { auth } from './auth';
import { dash } from './dashboard';
import { foodSearch } from './food_search';

const rootReducer = combineReducers({ dash, auth, foodSearch});

export default rootReducer;
