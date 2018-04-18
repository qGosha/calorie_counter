import { SIGNUP, SIGNIN, SIGNINERROR, SIGNINSUCCESS, SIGNOUT, SIGNUPSUCCESS, SIGNUPERROR, SIGNUPVIEWON, SIGNUPVIEWOFF, FETCH_DATA_FAILURE, HIDE_NOTIFICATION } from '../actions/index';
let jwt = localStorage.getItem('jwt');
export default function (state = { logged: jwt ? true : false, signup: false, error: false}, action) {
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
  case SIGNOUT:
      return { ...state, logged: false, userInfo: false}  
  case SIGNUPVIEWON:
      return { ...state, signup: true, error: false};
  case SIGNUPSUCCESS:
    return {...state};
  case SIGNUPERROR:
    return {...state, error: action.payload};    
  case FETCH_DATA_FAILURE:
    error = action.payload.response.data.message || 'Server is not available';
    return  {...state, error: error, data: [...state.data] };
  case SIGNUPVIEWOFF:
      return { ...state, signup: false, error: false};
  case HIDE_NOTIFICATION:
      return  { ...state, error: false, data: [...state.data] };
  default:
    return state;
  }
}



// import jwtLib from 'jsonwebtoken';

// const jwt = jwtLib.decode(localStorage.getItem('id_token'));
// var isAuthenticated: jwt && (jwt.exp > Date.now() / 1000);
// ```

// https://medium.com/@grales/a-redux-pattern-for-expired-jwts-f6e130e612f

// https://stackoverflow.com/questions/36948557/how-to-use-redux-to-refresh-jwt-token?rq=1

// http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example