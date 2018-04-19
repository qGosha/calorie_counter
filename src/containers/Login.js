import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import { PasswordEye } from "../components/password-eye";
import {
  Form,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  InputGroup
} from 'react-bootstrap';
import {
  signInUser,
  signInUserSuccess,
  signInUserFailure,
  showSignUp,
  showSpinner
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
    this.props.showSpinner();
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
      <form className='form-signin' horizontal onSubmit={this.onFormSubmit}>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <FormGroup>
          <ControlLabel className="sr-only">Email address</ControlLabel>
            <FormControl
              type="email"
              value={this.state.email}
              placeholder="Email address"
              onChange={this.onInputEmailChange}
              required="true"
            />
          </FormGroup>
          <FormGroup>
          <ControlLabel className="sr-only">Password</ControlLabel>
           <InputGroup>
            <FormControl
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.onInputPasswordChange}
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
                Sign in
          </Button>
          <p className="my-3">
            Not registered?
            <a href="#" onClick={this.onCreateAccount}>
              Create an account
            </a>
          </p>
          <div className="login-messages">{loginErr}</div>
        </form>
      // <div className="form d-flex align-items-end">
      //   <form className="form-signin" onSubmit={this.onFormSubmit}>
      //     <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      //     <label htmlFor="inputEmail" className="sr-only">
      //       Email address
      //     </label>
      //     <input
      //       type="email"
      //       id="inputEmail"
      //       className="form-control"
      //       placeholder="Email address"
      //       required
      //       onChange={this.onInputEmailChange}
      //       value={this.state.email}
      //     />
      //     <label htmlFor="inputPassword" className="sr-only">
      //       Password
      //     </label>
      //     <input
      //       type="password"
      //       id="inputPassword"
      //       className="form-control"
      //       placeholder="Password"
      //       required
      //       minLength="6"
      //       maxLength="20"
      //       onChange={this.onInputPasswordChange}
      //       value={this.state.password}
      //     />
      //     <button className="btn btn-lg btn-primary btn-block btn-fetch" type="submit">
      //     {this.props.isFetching ? <FontAwesome
      //     className='fas fa-spinner spinner'
      //     name='spinner'
      //     spin
      //     size='2x'
      //     /> : ''}
      //       Sign in
      //     </button>
      //     <p className="mt-5 mb-3">
      //       Not registered?{" "}
      //       <a href="#" onClick={this.onCreateAccount}>
      //         Create an account
      //       </a>
      //     </p>
      //     <div className="login-messages">{loginErr}</div>
      //   </form>
      // </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInUser: data => {
      dispatch(signInUser(data)).then(response => {
        if(!response.error) {
          localStorage.setItem('jwt', response.payload.data['x-user-jwt']);
          dispatch(signInUserSuccess(response));
        } else {
          dispatch(signInUserFailure(response.payload.response.data.message));
        }
      });
    },
    showSignUp: () => dispatch(showSignUp()),
    showSpinner: () => dispatch(showSpinner())
  };
};
const mapStateToProps = state => ({
  err: state.auth.error,
  isFetching: state.auth.isFetching
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
