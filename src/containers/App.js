import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import  Signup  from "./Signup";
import Login from "./Login";
import '/style/app.css';
class App extends Component {
  render() {
    if (this.props.auth.logged) return <Dashboard />;
    else if (this.props.auth.signup) return <Signup />;
    else return <Login />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
