import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TotalPanel } from '../components/totalPanel';
import { LogFoodPanel } from '../components/logFoodPanel';
import {
 showModal
} from "../actions/index";

class FoodLog extends Component {
constructor(props) {
  super(props);
}
  render() {
    const foods = this.props.loggedFood;
    return (
  <div>
    <TotalPanel foods={foods} />
    <LogFoodPanel
    foods={foods}
    showModal={this.props.showModal} />
  </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps))
  }
}

const mapStateToProps = state => ({
  loggedFood: state.foodLog.log
});
export default connect(mapStateToProps, mapDispatchToProps)(FoodLog);
