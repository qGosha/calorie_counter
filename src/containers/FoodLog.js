import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TotalPanel } from '../components/totalPanel';
import { LogFoodPanel } from '../components/logFoodPanel';
import { ProgressPanel } from '../components/progressPanel';
import {
 showModal
} from "../actions/index";
import { totalNutrients, total } from '../helpers/help_functions';


class FoodLog extends Component {
constructor(props) {
  super(props);

}

  render() {
    const foods = this.props.loggedFood;
    const newDailyNutr = (period) => {
      if(!period || !period.length) return [];
      return {
        nf_calories: total('nf_calories', period),
        nf_total_fat: total('nf_total_fat', period),
        nf_saturated_fat: total('nf_saturated_fat', period),
        nf_sodium: total('nf_sodium', period),
        nf_total_carbohydrate: total('nf_total_carbohydrate', period),
        nf_protein: total('nf_protein', period),
        full_nutrients: totalNutrients(period)
      }
    }
    const totalDailyNutr = newDailyNutr(foods);
    const totalDailyCal = totalDailyNutr['nf_calories'];
    return (
  <div>
    <ProgressPanel
    value={this.props.value} 
    now={totalDailyCal}/>
    <TotalPanel
    foods={foods}
    showModal={this.props.showModal}
    isFromLog={true}
    totalDailyNutr={totalDailyNutr} />

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
