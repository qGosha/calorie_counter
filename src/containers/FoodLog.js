import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TotalPanel } from '../components/totalPanel';

class FoodLog extends Component {
constructor(props) {
  super(props);
}

  render() {
    return (
  <div>
  <TotalPanel foods={this.props.loggedFood}/>
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
