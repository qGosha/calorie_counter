import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dashboard } from './Dashboard'
import  Login  from './Login'
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     auth: this.props.auth
  //   }
  // }
  render() {
      if(this.props.auth.logged) return <Dashboard />
      else return <Login />
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App);
