import { ADDFOODTOBASKET } from '../actions/index';

export function basket(state = [], action) {
  const payload = action.payload;
  switch (action.type) {
    case ADDFOODTOBASKET:
      return [ ...state, payload ];
    default:
      return state;
  }
}
