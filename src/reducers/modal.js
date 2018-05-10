import { SHOWMODAL, HIDEMODAL } from '../actions/index';



export function modal(state = [], action) {
  switch (action.type) {
    case SHOWMODAL:
      return [...state, action.modalType];
    case HIDEMODAL:
      return state.filter(item => item !== action.modalType);
    default:
      return state;
  }
}
