import {
  CHANGECURRENTDATE,
  GETMONTHREPORT,
  GETMONTHREPORTSUCCESS,
  GETMONTHREPORTFAILURE
 } from '../actions/index';

 const initialState = {
   currentDate: new Date(),
   dates: [],
   error: false
 }
  export function dates (state = initialState, action) {
    const payload = action.payload;
    switch (action.type) {
      case CHANGECURRENTDATE:
        return { ...state, currentDate: payload};
      case GETMONTHREPORT:
        return { ...state };
      case GETMONTHREPORTSUCCESS:
        return {...state, dates: payload};
      case GETMONTHREPORTFAILURE:
        return { ...state, error: payload }
      default:
        return state;
    }
  }
