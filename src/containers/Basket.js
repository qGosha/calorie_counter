import React, { Component } from "react";
import { connect } from "react-redux";
import { BasketPanel } from '../components/basketPanel';
import {
 hideModal
} from "../actions/index";

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      searchPanelView: false,
      myFoodPanel: false
    };

 }

 render() {
   const basket = this.props.basket;
   return(
     <BasketPanel
     handleHide={this.props.hideBasketModal}
     basket={basket}
     />
   )
 }
}

const mapDispatchToProps = dispatch => {
  return {
    hideBasketModal: () => dispatch(hideModal())
  };
};
const mapStateToProps = state => ({
  basket: state.basket
});
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
