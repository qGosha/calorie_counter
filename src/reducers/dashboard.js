import {
  GETUSEROBJECT,
  GETSUGGESTEDFOOD,
  FETCHUSEROBJECTSUCCESS,
  FETCHSUGGESTEDFOODSUCCESS,
  FETCHDASHINFOFAILURE,
  DASHBOARDLOADING,
  DASHBOARDLOADED,
  SETDAILYCAL,
  SETDAILYCALSUCCESS,
  SETDAILYCALFAILURE,
  SETDAILYCALNOTEREMOVE } from '../actions/index';

  const initialState = {
    userInfo: false,
    loading: false,
    error: false,
    suggestedFood:false,
    dailyCalUpSuccess: false
  }

export function dash (state = initialState, action) {
  switch (action.type) {
    case GETUSEROBJECT:
      return { ...state};
    case GETSUGGESTEDFOOD:
      return {...state};
    case FETCHUSEROBJECTSUCCESS:
      return { ...state, userInfo: action.payload }
    case FETCHSUGGESTEDFOODSUCCESS:
      return {...state, suggestedFood: action.payload }
    case FETCHDASHINFOFAILURE:
      return { ...state, error: action.payload, loading:false }
    case DASHBOARDLOADING:
      return { ...state, loading: true }
    case DASHBOARDLOADED:
      return { ...state, loading: false }
    case SETDAILYCAL:
      return { ...state }
    case SETDAILYCALSUCCESS:
      return { ...state, userInfo: action.payload, dailyCalUpSuccess: true }
    case SETDAILYCALFAILURE:
      return { ...state, error: action.payload}
    case SETDAILYCALNOTEREMOVE:
      return { ...state, dailyCalUpSuccess: false}
    default:
      return state;
  }
}
