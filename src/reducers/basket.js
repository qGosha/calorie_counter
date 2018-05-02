import { ADDFOODTOBASKET, GETDETAILEDFOODINFO } from '../actions/index';

const storagedBasket = localStorage.getItem('basket');
const initialState = storagedBasket ? JSON.parse(storagedBasket) : [];

export function basket(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case ADDFOODTOBASKET:
      return payload;
    case GETDETAILEDFOODINFO:
      return state;
    default:
      return state;
  }
}
