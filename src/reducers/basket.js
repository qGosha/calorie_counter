import { GETDETAILEDFOODINFO, GETDETAILEDFOODINFOFAILURE, GETDETAILEDFOODINFOSUCCESS, SETNEWBASKET } from '../actions/index';

const storagedBasket = localStorage.getItem('basket');
const initialState = storagedBasket ? JSON.parse(storagedBasket) : [];

export function basket(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case GETDETAILEDFOODINFO:
      return state;
    case GETDETAILEDFOODINFOSUCCESS:
      return [...state, payload[0]];
    case SETNEWBASKET:
      return payload;
    case GETDETAILEDFOODINFOFAILURE:
      return false;
    default:
      return state;
  }
}
