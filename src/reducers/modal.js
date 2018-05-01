import { SHOWMODAL, HIDEMODAL } from '../actions/index';

const initialState = {
  modalType: null
}

export function modal(state = initialState, action) {
  switch (action.type) {
    case SHOWMODAL:
      return { ...state, modalType: action.modalType };
    case HIDEMODAL:
      return initialState
    default:
      return state;
  }
}
