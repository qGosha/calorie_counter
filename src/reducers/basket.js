import { ADDFOODTOBASKET } from '../actions/index';

const storagedBasket = localStorage.getItem('basket');
const initialState = storagedBasket ? JSON.parse(storagedBasket) : [];

export function basket(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case ADDFOODTOBASKET:
      return payload;
    default:
      return state;
  }
}
