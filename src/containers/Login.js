import React, { Component } from "react";
import { connect } from "react-redux";
import {
  signInUser,
  signInUserSuccess,
  signInUserFailure,
  showSignUp
} from "../actions/index";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onInputEmailChange = this.onInputEmailChange.bind(this);
    this.onInputPasswordChange = this.onInputPasswordChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCreateAccount = this.onCreateAccount.bind(this);
  }

  onInputEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  onInputPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.signInUser(this.state);
    this.setState({ email: "", password: "" });
  }

  onCreateAccount(event) {
    event.preventDefault();
    this.props.showSignUp();
  }

  render() {
    const loginErr = this.props.err ? (
      <div className="alert alert-danger" role="alert">
        {this.props.err}
      </div>
    ) : (
      ""
    );
    return (
      <div className="form d-flex align-items-end">
        <form className="form-signin" onSubmit={this.onFormSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            onChange={this.onInputEmailChange}
            value={this.state.email}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            minLength="6"
            maxLength="20"
            onChange={this.onInputPasswordChange}
            value={this.state.password}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3">
            Not registered?{" "}
            <a href="#" onClick={this.onCreateAccount}>
              Create an account
            </a>
          </p>
          <div className="login-messages">{loginErr}</div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInUser: data => {
      dispatch(signInUser(data)).then(response => {
        !response.error
          ? dispatch(signInUserSuccess(response))
          : dispatch(signInUserFailure(response.payload.response.data.message));
      });
    },
    showSignUp: () => dispatch(showSignUp())
  };
};
const mapStateToProps = state => ({
  err: state.auth.error
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
