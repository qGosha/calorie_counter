import React from "react";
import { connect } from "react-redux";
import Basket from "./Basket";
import DetailedNutr from "../components/detailedNutr";


export const SHOW_BASKET = 'SHOW_BASKET';
export const SHOW_DETAILED_NUTR = 'SHOW_DETAILED_NUTR';

const MODAL_COMPONENTS = {
  SHOW_BASKET: Basket,
  SHOW_DETAILED_NUTR: DetailedNutr
};

const ModalRoot = (modal) => {
  const modalArr = modal.modal;
  if (!modalArr || !modalArr.length) {
    return null;
  }
  const modals = modalArr.map( window => {
  const SpecificModal = MODAL_COMPONENTS[window];
  return <div><SpecificModal /></div>;
  })
  return <div> {modals} </div>;

};

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(mapStateToProps, null)(ModalRoot)
