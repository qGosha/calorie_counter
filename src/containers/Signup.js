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

import {
  Form,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Alert,
  InputGroup
} from 'react-bootstrap';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      first_name: "",
      showPassword: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onLoginAccount = this.onLoginAccount.bind(this);
    this.onPasswordVisibilityChange = this.onPasswordVisibilityChange.bind(this);
  }
  onImputsChanges(prop, event) {
    this.setState({ [prop]: event.target.value });
  }
  
  onPasswordVisibilityChange() {
    const showPassword = !this.state.showPassword
    this.setState({ showPassword });
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
    const signupErr = this.props.err ?
      <Alert bsStyle="danger">
        <div>{this.props.err}</div>
      </Alert> :
      null;

    return (
      <form className='form-signin' horizontal onSubmit={this.onFormSubmit}>
        <h1 className="h3">Signup</h1>
        <FormGroup bsSize="lg" controlId="name">
          <ControlLabel htmlFor="name">Your name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.first_name}
            placeholder="Your name"
            onChange={() => this.onImputsChanges('first_name', event)}
            required="true"
          />
        </FormGroup>
        <FormGroup bsSize="lg" controlId="email">
          <ControlLabel htmlFor="email">Email address</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            placeholder="Email address"
            onChange={() => this.onImputsChanges("email", event)}
            required="true"
          />
        </FormGroup>
        <FormGroup bsSize="lg" controlId="password">
          <ControlLabel htmlFor="password">Password</ControlLabel>
          <InputGroup bsSize="lg">
            <FormControl
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              placeholder="Password"
              onChange={() => this.onImputsChanges("password",event)}
              required="true"
              minLength="6"
              maxLength="20"
            />
            <InputGroup.Button>
              <PasswordEye onClick={this.onPasswordVisibilityChange}
                showPassword={this.state.showPassword} />
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <Button type="submit" className="btn-fetch btn btn-primary btn-lg btn-block">{this.props.isFetching ? <FontAwesome
          className='fas fa-spinner spinner'
          name='spinner'
          spin
          size='2x'
        /> : ''}
          Sign up
          </Button>

        <p className="switch-login-singup">
          Have an account? <a href="#" onClick={this.onLoginAccount}>Log in</a>
        </p>
        {signupErr}
      </form>
    //   <div className="form d-flex align-items-end">
    //     <form className="form-signup" onSubmit={this.onFormSubmit}>
    //       <h1 className="h3 mb-3 font-weight-normal">Signup</h1>
         
    //         <label htmlFor="inputName">
    //           Your name:
    //       </label>
    //         <input
    //           type="text"
    //           id="inputName"
    //           className="form-control"
    //           placeholder="Your Name"
    //           required
    //           minLength="1"
    //           maxLength="50"
    //           onChange={this.onInputNameChange}
    //           value={this.state.first_name}
    //         />
          
          
    //       <label htmlFor="inputEmail">
    //         Email address:
    //       </label>
    //       <input
    //         type="email"
    //         id="inputEmail"
    //         className="form-control"
    //         placeholder="Email address"
    //         required
    //         onChange={this.onInputEmailChange}
    //         value={this.state.email}
    //       />
          
          
    //       <label htmlFor="inputPassword">
    //         Password:
    //       </label>
    //       <div className="password-section">
    //       <input
    //         type={this.state.showPassword ? "text" : "password"}
    //         id="inputPassword"
    //         className="form-control"
    //         placeholder="Password"
    //         required
    //         minLength="6"
    //         maxLength="20"
    //         onChange={this.onInputPasswordChange}
    //         value={this.state.password}
    //       />
    //       <PasswordEye onClick={this.onPasswordVisibilityChange}
    //         showPassword={this.state.showPassword} />
    //       </div>

    //       <button className="btn btn-lg btn-primary btn-block btn-fetch" type="submit">
    //         {this.props.isFetching ? <FontAwesome
    //           className='fas fa-spinner spinner'
    //           name='spinner'
    //           spin
    //           size='2x'
    //         /> : ''}
    //         Sign up
    //       </button>
    //       <p className="mt-5 mb-3">
    //         Have an account? <a href="#" onClick={this.onLoginAccount}>Log in</a>
    //       </p>
    //       <div className="login-messages"></div>
    //       <div className="signup-messages">{signupErr}</div>
    //     </form>
    //   </div>
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