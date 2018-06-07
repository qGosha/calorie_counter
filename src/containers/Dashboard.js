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
    const basket = this.props.basket;
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
       <Container fluid style={{padding: '0'}}>
       <Row style={{padding: '20px 0'}}>
        <Col style={{textAlign: 'right'}}>
          <FontAwesome
           onClick={this.onSignOut}
           className='fas fa-sign-out-alt'
           name='sign-out'
           style={{color: 'green', cursor: 'pointer'}}
           size='2x' />
        </Col>
        </Row>
        <Row>
         <Col xs={10}>
          <h3>Hello, {userInfo.first_name}. This is your Food log</h3>
         </Col>
         <Col xs={2}>
         <span
           onClick={() => this.props.showBasketModal(BASKET)}
           className='fa-stack'
           style={{cursor: 'pointer'}}>
         <FontAwesome
          className='fas fa-shopping-basket fa-stack-2x'
          name='shopping-basket'
          style={{color: this.props.basket.length ? 'green' : 'grey'}}
          size='2x' />
         <span
          className="fa-stack fa-stack-1x"
          style={{display:basket.length ? 'block' : 'none'}}>
           <FontAwesome
            className='fa fa-circle fa-stack-1x'
            name='circle'
            style={{color: 'red',
             fontSize: '20px',
             top: '-5px',
             left: '5px'}} />
            <span
             className='fa fa-stack-1x fa-inverse'
             style={{
              top: '-5px',
              left: '5px'}}
             name='inverse'>{basket.length}</span>
         </span>
         </span>
         </Col>
        </Row>
        <Row>
         <Col md={6} xs={12}>
         <SearchBar/>
         </Col>
        </Row>
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
