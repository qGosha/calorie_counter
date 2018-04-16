import { SINGUP, SINGIN, SINGINERROR, SINGINSUCCESS, SINGUPVIEWON, SINGUPVIEWOFF, FETCH_DATA_FAILURE, HIDE_NOTIFICATION } from '../actions/index';
export default function(state={logged: false, signup: false, error: false}, action) {

let error;
  switch (action.type) {
  case SINGUP:
    return state;
  case SINGIN:
    return state
  case SINGINSUCCESS:
    return {userInfo: action.payload, logged: true}
  case SINGINERROR:
      return {error: action.payload}
  case SINGUPVIEWON:
    return {signup: true};
  case FETCH_DATA_FAILURE:
    error = action.payload.response.data.message || 'Server is not available';
    return  { error: error, data: [...state.data] };
  case SINGUPVIEWOFF:
    return  {signup: false};
  case HIDE_NOTIFICATION:
      return  { error: false, data: [...state.data] };
  default:
    return state;
  }
}
