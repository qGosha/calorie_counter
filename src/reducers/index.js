import { combineReducers } from 'redux';
import { auth } from './auth';
import { dash } from './dashboard';
import { foodSearch } from './food_search';
import { basket } from './basket';
import { modal } from './modal';

const rootReducer = combineReducers({ dash, auth, foodSearch, basket, modal});

export default rootReducer;
