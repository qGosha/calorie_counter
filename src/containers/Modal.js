import React, { Component } from "react";
import { connect } from "react-redux";
import Basket from "./Basket";

const MODAL_COMPONENTS = {
  SHOW_BASKET: Basket
};

const ModalRoot = ({ modalType }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal />;
};


export default connect(
  state => state.modal
)(ModalRoot)

