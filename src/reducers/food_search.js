import { SEARCHFOOD, SEARCHFOODSUCCESS, SEARCHFOODFAILURE } from '../actions/index';

export function foodSearch(state = { foundFood: false, error:false}, action) {
  switch (action.type) {
    case SEARCHFOOD:
      return { ...state};
    case SEARCHFOODSUCCESS:
      return { ...state, foundFood: action.payload, error: false }
    case SEARCHFOODFAILURE:
      return { ...state, error: action.payload}
    default:
      return state;
  }
}
