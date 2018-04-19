import React, { Component } from "react";
import { connect } from "react-redux";
import { PasswordEye } from "../components/password-eye";
import FontAwesome from 'react-fontawesome';
import {
  signUpUser,
  signUpUserSuccess,
  signUpUserFailure,
  hideSignUp,
  showSpinner
} from "../actions/index";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      first_name: "",
      showPassword: false
    };
    this.onInputEmailChange = this.onInputEmailChange.bind(this);
    this.onInputNameChange = this.onInputNameChange.bind(this);
    this.onInputPasswordChange = this.onInputPasswordChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onLoginAccount = this.onLoginAccount.bind(this);
    this.onPasswordVisibilityChange = this.onPasswordVisibilityChange.bind(this);
  }
  
  onPasswordVisibilityChange() {
    const showPassword = !this.state.showPassword
    this.setState({ showPassword });
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

  onInputNameChange(event) {
    this.setState({
      first_name: event.target.value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.showSpinner();
    this.props.signUpUser(this.state);

    this.setState({ email: "", password: "", first_name: "" });
  }
  onLoginAccount(event) {
    event.preventDefault();
    this.setState({ email: "", password: "", first_name: "" });
    this.props.hideSignUp();
  }
  render() {

    const signupErr = this.props.err ? (
      <div className="alert alert-danger" role="alert">
        {this.props.err}
      </div>
    ) : (
        ""
      );

    return (
      <div className="form d-flex align-items-end">
        <form className="form-signup" onSubmit={this.onFormSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Signup</h1>
         
            <label htmlFor="inputName">
              Your name:
          </label>
            <input
              type="text"
              id="inputName"
              className="form-control"
              placeholder="Your Name"
              required
              minLength="1"
              maxLength="50"
              onChange={this.onInputNameChange}
              value={this.state.first_name}
            />
          
          
          <label htmlFor="inputEmail">
            Email address:
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
          
          
          <label htmlFor="inputPassword">
            Password:
          </label>
          <div className="password-section">
          <input
            type={this.state.showPassword ? "text" : "password"}
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            minLength="6"
            maxLength="20"
            onChange={this.onInputPasswordChange}
            value={this.state.password}
          />
          <PasswordEye onClick={this.onPasswordVisibilityChange}
            showPassword={this.state.showPassword} />
          </div>

          <button className="btn btn-lg btn-primary btn-block btn-fetch" type="submit">
            {this.props.isFetching ? <FontAwesome
              className='fas fa-spinner spinner'
              name='spinner'
              spin
              size='2x'
            /> : ''}
            Sign up
          </button>
          <p className="mt-5 mb-3">
            Have an account? <a href="#" onClick={this.onLoginAccount}>Log in</a>
          </p>
          <div className="login-messages"></div>
          <div className="signup-messages">{signupErr}</div>
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    signUpUser: data => {
      dispatch(signUpUser(data)).then(response => {
        !response.error
          ? dispatch(signUpUserSuccess(response))
          : dispatch(signUpUserFailure(response.payload.response.data.message));
      });
    },
    hideSignUp: () => dispatch(hideSignUp()),
    showSpinner: () => dispatch(showSpinner())
  };
};
const mapStateToProps = state => ({
  err: state.auth.error,
  isFetching: state.auth.isFetching
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);