import {
  GETFOODLOG,
  GETFOODLOGFAILURE,
  GETFOODLOGSUCCESS,
} from '../actions/index';


export function foodLog(state = [], action) {
  const payload = action.payload;
  switch (action.type) {
    case GETFOODLOG:
      return state;
    case GETFOODLOGFAILURE:
      return state;
    case GETFOODLOGSUCCESS:
      return [ ...state, payload ];
    default:
      return state;
  }
}
