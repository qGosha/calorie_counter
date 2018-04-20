import { GETUSEROBJECT } from '../actions/index';

export function dash (state = {}, action) {
  switch (action.type) {
    case GETUSEROBJECT:
      return { ...state, userInfo: action.payload.data };
      
    default:
      return state;
  }
}