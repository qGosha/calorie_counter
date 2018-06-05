import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from './search-bar';
import FoodLog from './FoodLog';
import FontAwesome from 'react-fontawesome';
import '../style/dashboard.css';
import { BASKET } from './Modal';
import DatePicker from './DatePicker';
import { Container, Row, Col } from 'react-grid-system';
import { CalorieLimit } from '../components/calorieLimit';

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
  getFoodLogSuccess,
  setDailyCal,
  setDailyCalSuccess,
  setDailyCalFailure,
  setDailyCalNoteRemove,
  getMonthReport,
  getMonthReportSuccess
} from "../actions/index";

class Dashboard extends Component {
constructor(props) {
  super(props);
  this.onSignOut = this.onSignOut.bind(this);
  this.onLongLoading = this.onLongLoading.bind(this);
  this.dailyCalChange = this.dailyCalChange.bind(this);
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

  dailyCalChange(value) {
    const jwt = localStorage.getItem('jwt');
    const request = {
      'daily_kcal': value
    };
    this.props.setDailyCal(jwt, request);
  }

  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    setTimeout(this.onLongLoading, 800);
    this.props.getUser(jwt)
    .then(() => {
        return this.props.getLog(jwt, this.props.currentDate);
      })
    .then( () => {
      return this.props.getMonthReport(jwt, this.props.currentDate);
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
        <Row nogutter>
         <Col xs={12} md={6}>
         <CalorieLimit
           value={userInfo['daily_kcal']}
           onClick={this.dailyCalChange}
           dailyCalUpSuccess={this.props.dailyCalUpSuccess}/>
         </Col>
         <Col xs={12} md={6}>
          <DatePicker />
         </Col>
         </Row>
        <button onClick={this.onSignOut}>Sign out</button>
        <span
        onClick={() => this.props.showBasketModal(BASKET)}
        style={{
          cursor: 'pointer',
          color: this.props.basket.length ? 'green' : 'grey'
        }}>
        <FontAwesome
         className='fas fa-shopping-basket'
         name='shopping-basket'
         size='2x' />
        </span>
        <Row nogutter>
         <Col xs={12} md={6}>
          <FoodLog
            value={userInfo['daily_kcal']}/>
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
    getLog: (jwt, currentDate) => dispatch(getFoodLog(jwt, currentDate))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
      dispatch(getFoodLogSuccess(response.payload.data.foods));
    } ),
    getMonthReport: (jwt, currentDate) => dispatch(getMonthReport(jwt, currentDate))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
        dispatch(getMonthReportSuccess(response.payload.data.dates));
      } ),
    fetchDashInfoFailure: (error) => dispatch(fetchDashInfoFailure(error)),
    showLoadingScreen: () => dispatch(showLoadingScreen()),
    hideLoadingScreen: () => dispatch(hideLoadingScreen()),
    showBasketModal: modalType => dispatch(showModal(modalType)),
    setDailyCal: (jwt, user) => dispatch(setDailyCal(jwt, user))
      .then(response => {
        if (!response.error) {
          dispatch(setDailyCalSuccess(response.payload.data));
          setTimeout(() => { dispatch(setDailyCalNoteRemove()) }, 3000)
        } else {
          dispatch(setDailyCalFailure(response.payload.response.data.message))
        }
      })
  }
}

const mapStateToProps = state => ({
  userInfo: state.dash.userInfo,
  suggestedFood: state.dash.suggestedFood,
  error: state.dash.error,
  loading: state.dash.loading,
  dailyCalUpSuccess: state.dash.dailyCalUpSuccess,
  currentDate: state.dates.currentDate,
  basket: state.basket
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
