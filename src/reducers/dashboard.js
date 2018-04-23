import { GETUSEROBJECT, GETSUGGESTEDFOOD, FETCHUSEROBJECTSUCCESS, FETCHSUGGESTEDFOODSUCCESS, FETCHDASHINFOFAILURE, DASHBOARDLOADING } from '../actions/index';

export function dash (state = {userInfo: false, loading: false, error: false, suggestedFood:false}, action) {
  switch (action.type) {
    case GETUSEROBJECT:
      return { ...state};
    case GETSUGGESTEDFOOD:
      return {...state};
    case FETCHUSEROBJECTSUCCESS:
      return { ...state, userInfo: action.payload}
    case FETCHSUGGESTEDFOODSUCCESS:
      return {...state, suggestedFood: action.payload, loading:false}  
    case FETCHDASHINFOFAILURE:
      return { ...state, error: action.payload, loading: false}
    case DASHBOARDLOADING:
      return { ...state, loading: true }
    default:
      return state;
  }
}
