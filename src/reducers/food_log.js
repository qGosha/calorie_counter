import {
  GETFOODLOG,
  GETFOODLOGFAILURE,
  GETFOODLOGSUCCESS,
  DELETEFOODLOGITEM,
  DELETEFOODLOGITEMFAILURE
} from '../actions/index';

const initialState = {
  error: false,
  log: []
}
export function foodLog(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case GETFOODLOG:
      return state;
    case GETFOODLOGFAILURE:
      return {...state, error: action.payload};
    case GETFOODLOGSUCCESS:
      return {...state, log: action.payload };
    case DELETEFOODLOGITEM:
      return state;
    case DELETEFOODLOGITEMFAILURE:
      return { ...state, error: action.payload };     
    default:
      return state;
  }
}
