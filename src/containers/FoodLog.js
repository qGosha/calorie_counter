import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TotalPanel } from '../components/totalPanel';
import { LogFoodPanel } from '../components/logFoodPanel';

class FoodLog extends Component {
constructor(props) {
  super(props);
}

  render() {
    const foods = this.props.loggedFood
    const breakfast = foods.filter( (item,i) => {
      const time = new Date(item.consumed_at).getHours();
      if (time < 12) return item;
    }) 
    return (
  <div>
    <LogFoodPanel foods={foods} />
    <TotalPanel foods={breakfast} />
  </div>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     signOutUser: () => dispatch(signOutUser())
//   }
// }

const mapStateToProps = state => ({
  loggedFood: state.foodLog.log
});
export default connect(mapStateToProps, null)(FoodLog);
