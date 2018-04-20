import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SearchBar} from './search-bar';
import {
  signOutUser,
  getUserObject
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
  componentWillMount() {
    const jwt = localStorage.getItem('jwt');
    this.props.getUserObject(jwt);
  }
  render() {
    return (
      <div className='dashboard'>
      <h1>This is Dashboard</h1>
      <button onClick={this.onSignOut}>Sign out</button>
      <SearchBar userInfo={this.props.userInfo}/>
      </div>
      )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(signOutUser()),
    getUserObject: (jwt) => dispatch(getUserObject(jwt))
  };
};

const mapStateToProps = state => ({
  err: state.error,
  userInfo: state.userInfo
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
