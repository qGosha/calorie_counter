import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  signOutUser
} from "../actions/index";

class Dashboard extends Component {
constructor(props) {
  super(props);
  this.onSignOut = this.onSignOut.bind(this);
}

  onSignOut(event) {
   event.preventDefault();
   this.props.signOutUser();
  }
  render() {
    return (
      <div className='dashboard'>
      <h1>This is Dashboard</h1>
      <button onClick={this.onSignOut}>Sign out</button>
      </div>
      )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(signOutUser())
  };
};

const mapStateToProps = state => ({
  err: state.auth.error
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);