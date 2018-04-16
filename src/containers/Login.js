import React, { Component } from 'react';
import { connect } from 'react-redux';
import { singInUser, singInUserSuccess, singInUserFailure } from '../actions/index';

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
    this.props.singInUser(this.state);
    this.setState({ email: "", password: ""});
  }

  render() {
  const loginErr = this.props.err ? this.props.err : '';
    return (
  <div className="form">
  <div>{loginErr}</div>
  <form className="form-signin" onSubmit={this.onFormSubmit}>
     <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
     <label htmlFor="inputEmail" className="sr-only">Email address</label>
     <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus onChange={this.onInputEmailChange} value={this.state.email}/>
     <label htmlFor="inputPassword" className="sr-only">Password</label>
     <input type="password" id="inputPassword" className="form-control" placeholder="Password" required minLength="6" maxLength="20" onChange={this.onInputPasswordChange} value={this.state.password}/>
     <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
     <p className="mt-5 mb-3 singup">Not registered? <a href="#">Create an account</a></p>
   </form>
  </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    singInUser: (data) => {
      dispatch(singInUser(data)).then((response) => {
            !response.error ?
            dispatch(singInUserSuccess(response)) :
            dispatch(singInUserFailure(dispatch, response.payload.response.data.message))

          })
    }
  }
}
const mapStateToProps = (state) => ({
  err: state.auth.error
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
