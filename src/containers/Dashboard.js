import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from './search-bar';
import FontAwesome from 'react-fontawesome';
import '../style/dashboard.css';
import { SHOW_BASKET } from './Modal';
import {
  signOutUser,
  getUser,
  getSuggestedFood,
  fetchUserObjectSuccess,
  fetchSuggestedFoodSuccess,
  fetchDashInfoFailure,
  showLoadingScreen,
  showModal
} from "../actions/index";

class Dashboard extends Component {
constructor(props) {
  super(props);
  this.onSignOut = this.onSignOut.bind(this);
  this.onLongLoading = this.onLongLoading.bind(this);
}

  onSignOut(event) {
   event.preventDefault();
   this.props.signOutUser();
  }
  onLongLoading() {
    if (!this.props.suggestedFood) {
      this.props.showLoadingScreen();
    }
  }
  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    setTimeout(this.onLongLoading, 800);
    this.props.getUser(jwt)
    .then( () => {
      return this.props.getSuggestedFood(jwt);
    })
    .catch( error => {
      this.props.fetchDashInfoFailure(error.payload.response.data.message);
    } )

  }
  render() {
    const userInfo = this.props.userInfo;
    const error = this.props.error;
    const loading = this.props.loading;
    const suggestedFood = this.props.suggestedFood;
    if(loading && !error) {
      return (
        <div className='dashboard-spinner'>
         <FontAwesome
          className='fas fa-spinner'
          name='spinner'
          spin
          size='5x' />
        </div>
      )
    } else if (!userInfo && !error && !suggestedFood) {
      return null
    } else if(error) {
       return (
        <div>
         <div>Sorry we are experiencing technical problems. Please try later.</div>
         <div>{error}</div>
        </div>
      )
    } else {
      return (
      <div className='dashboard'>
        <SearchBar/>
        <h1>This is Dashboard</h1>
        <h3>Hello, {userInfo.first_name}</h3>
        <button onClick={this.onSignOut}>Sign out</button>
        <button onClick={() => this.props.showBasketModal(SHOW_BASKET)}>Basket</button>

      </div>
        )
    }

  }
}


const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(signOutUser()),
    getUser: (jwt) => dispatch(getUser(jwt))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
        dispatch(fetchUserObjectSuccess(response.payload.data));
      } )
      .catch( error => {
        return new Promise((res,rej) => rej(error));
      } ),
    getSuggestedFood: (jwt) => dispatch(getSuggestedFood(jwt))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
        dispatch(fetchSuggestedFoodSuccess(response.payload.data));
    } )
    .catch( error => {
      return new Promise((res,rej) => rej(error));
    } ),
    fetchDashInfoFailure: (error) => dispatch(fetchDashInfoFailure(error)),
    showLoadingScreen: () => dispatch(showLoadingScreen()),
    showBasketModal: modalType => dispatch(showModal(modalType))
  }
}

const mapStateToProps = state => ({
  userInfo: state.dash.userInfo,
  suggestedFood: state.dash.suggestedFood,
  error: state.dash.error,
  loading: state.dash.loading
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
