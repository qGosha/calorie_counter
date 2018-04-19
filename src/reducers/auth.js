import {SHOWSPINNERON, SIGNUP, SIGNIN, SIGNINERROR, SIGNINSUCCESS, SIGNOUT, SIGNUPSUCCESS, SIGNUPERROR, SIGNUPVIEWON, SIGNUPVIEWOFF, FETCH_DATA_FAILURE, HIDE_NOTIFICATION } from '../actions/index';
import jwtLib from 'jsonwebtoken';

const jwt = localStorage.getItem('jwt');
const jwtVerify = jwtLib.decode(jwt);

export default function (state = { 
  logged: (jwt && jwtVerify.exp > Date.now()/1000 - 5000) ? true : false, 
  signup: false, error: false, 
  isFetching: false
  }, action) {
let error;
  switch (action.type) {
  case SIGNUP:
    return { ...state, error: false };
  case SIGNIN:
    return {...state, error: false};
  case SHOWSPINNERON:
    return { ...state, isFetching: true };  
  case SIGNINSUCCESS:
    return {...state, userInfo: action.payload, logged: true, isFetching: false};
  case SIGNINERROR:
    return {...state, error: action.payload, isFetching: false};
  case SIGNOUT:
      return { ...state, logged: false, userInfo: false}
  case SIGNUPVIEWON:
      return { ...state, signup: true, error: false};
  case SIGNUPSUCCESS:
      return { ...state, userInfo: action.payload, logged: true, isFetching: false};
  case SIGNUPERROR:
      return { ...state, error: action.payload, isFetching: false};
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
