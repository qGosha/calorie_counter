import {
  GETFOODLOG,
  GETFOODLOGFAILURE,
  GETFOODLOGSUCCESS,
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
    default:
      return state;
  }
}
