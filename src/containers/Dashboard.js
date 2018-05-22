import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from './search-bar';
import FoodLog from './FoodLog';
import FontAwesome from 'react-fontawesome';
import '../style/dashboard.css';
import { BASKET } from './Modal';
import { Container, Row, Col } from 'react-grid-system';
import {
  signOutUser,
  getUser,
  getSuggestedFood,
  fetchUserObjectSuccess,
  fetchSuggestedFoodSuccess,
  fetchDashInfoFailure,
  showLoadingScreen,
  hideLoadingScreen,
  showModal,
  getFoodLog,
  getFoodLogSuccess
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
    .then(() => {
        return this.props.getLog(jwt);
      })
    .then( () => {
      return this.props.getSuggestedFood(jwt);
    })
    .then( () => {
      if (this.props.loading) {
        this.props.hideLoadingScreen()
      } } )
    .catch( error => {
      let err;
      if(error
        && error.payload
        && error.payload.response
        && error.payload.response.data
        && error.payload.response.data.message) {
          err = error.payload.response.data.message;
        }
        else {
         err  = 'Technical error';
        }
      this.props.fetchDashInfoFailure(err);
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
       <Container fluid>
        <SearchBar/>
        <h1>This is Dashboard</h1>
        <h3>Hello, {userInfo.first_name}</h3>
        <button onClick={this.onSignOut}>Sign out</button>
        <button onClick={() => this.props.showBasketModal(BASKET)}>Basket</button>
        <Row nogutter>
         <Col xs={12} md={6}>
          <FoodLog />
         </Col>
        </Row>
        </Container>
        )
    }

  }
}


const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(signOutUser()),
    getUser: jwt => dispatch(getUser(jwt))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
        dispatch(fetchUserObjectSuccess(response.payload.data));
      } ),
    getSuggestedFood: jwt => dispatch(getSuggestedFood(jwt))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
        dispatch(fetchSuggestedFoodSuccess(response.payload.data));
    } ),
    getLog: jwt => dispatch(getFoodLog(jwt))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
      dispatch(getFoodLogSuccess(response.payload.data.foods));
    } ),
    fetchDashInfoFailure: (error) => dispatch(fetchDashInfoFailure(error)),
    showLoadingScreen: () => dispatch(showLoadingScreen()),
    hideLoadingScreen: () => dispatch(hideLoadingScreen()),
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
