import { SIGNUP, SIGNIN, SIGNINERROR, SIGNINSUCCESS, SIGNUPSUCCESS, SIGNUPERROR, SIGNUPVIEWON, SIGNUPVIEWOFF, FETCH_DATA_FAILURE, HIDE_NOTIFICATION } from '../actions/index';
export default function(state={logged: false, signup: false, error: false}, action) {

let error;
  switch (action.type) {
  case SIGNUP:
    return { ...state, error: false };
  case SIGNIN:
    return {...state, error: false};
  case SIGNINSUCCESS:
    return {...state, userInfo: action.payload, logged: true};
  case SIGNINERROR:
    return {...state, error: action.payload};
  case SIGNUPVIEWON:
    return {...state, signup: true};
  case SIGNUPSUCCESS:
    return {...state};
  case SIGNUPERROR:
    return {...state, error: action.payload};    
  case FETCH_DATA_FAILURE:
    error = action.payload.response.data.message || 'Server is not available';
    return  {...state, error: error, data: [...state.data] };
  case SIGNUPVIEWOFF:
    return  {...state, signup: false};
  case HIDE_NOTIFICATION:
      return  { ...state, error: false, data: [...state.data] };
  default:
    return state;
  }
}
