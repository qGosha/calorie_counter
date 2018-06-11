import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import  Signup  from "./Signup";
import Login from "./Login";
import ModalRoot from "./Modal";
import ErrorHandle from "./ErrorHandle";
import '../style/app.css';
class App extends Component {

  render() {
    const combinedComps = (Comp) => {
      return (
       <div className='container'>
        {Comp}
        <ModalRoot/>
        <ErrorHandle />
       </div>
    )
  }
    if (this.props.auth.logged) return combinedComps(<Dashboard />);
    else if (this.props.auth.signup) return combinedComps(<Signup />);
    else return combinedComps(<Login />);
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
