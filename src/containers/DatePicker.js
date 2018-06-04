import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar'
import {
  getMonthReport,
  getMonthReportSuccess,
  getMonthReportFailure,
  getFoodLogSuccess,
  changeCurrentDate,
  getFoodLog
} from "../actions/index";

class DatePicker extends Component {
  constructor(props) {
    super(props);
  }

  onChange = date => {
    const jwt = localStorage.getItem('jwt');
    this.props.changeCurrentDate(date);

    this.props.getLog(jwt, date)
    .then(() => {
        return this.props.getMonthReport(jwt, date);
      })
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
      this.props.getMonthReportFailure(err);
    } )

  }

  render() {
    return(
      <Calendar
       onChange={this.onChange}
       value={this.props.currentDate}
       showNeighboringMonth={false}/>
    )
  }

}


const mapStateToProps = state => ({
  currentDate: state.dates.currentDate,
  dates: state.dates.dates
});

const mapDispatchToProps = dispatch => {
  return {
    getMonthReport: (jwt, date) => dispatch(getMonthReport(jwt, date))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
         dispatch(getMonthReportSuccess(response.payload.data.dates))
      } ),
      getLog: (jwt, date) => dispatch(getFoodLog(jwt, date))
       .then( response => {
         if(response.error) {
           return Promise.reject(response);
         }
        dispatch(getFoodLogSuccess(response.payload.data.foods));
      } ),
      changeCurrentDate: date => dispatch(changeCurrentDate(date))
};
}

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
