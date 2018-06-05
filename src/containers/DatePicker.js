import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar'
import {
  getMonthReport,
  getMonthReportSuccess,
  getMonthReportFailure,
  getFoodLogSuccess,
  changeCurrentDate,
  getFoodLog,
  setCurrentDateCalLimit
} from "../actions/index";
import '../style/date_picker.css';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state={
      green: [],
      red: []
    }
  }

 dateColors = dates => {
   const green = dates.map( i => {
     if (i['total_cal'] && i['total_cal'] <= i['daily_kcal_limit']) {
       return new Date(i['date']).getUTCDate();
     }
   })
   const red = dates.map(i => {
     if (i['total_cal'] && i['total_cal'] > i['daily_kcal_limit']) {
       return new Date(i['date']).getUTCDate();
     }
   })
   this.setState({ green, red })
 }

 componentDidMount() {
   const dates = this.props.dates;
   this.dateColors(dates);
 }

  onDateChange = date => {
    const dates = this.props.dates;
    const dateArr = dates.filter(i => new Date(i['date']).getDate() === new Date(date).getDate());
    const newLimit = (dateArr && dateArr.length) ? dateArr[0]['daily_kcal_limit'] : null;
    const jwt = localStorage.getItem('jwt');
    this.props.getLog(jwt, date)
      .then(() => {
        return this.props.getMonthReport(jwt, date);
      })
      .then(() => Promise.resolve(this.props.setCurrentDateCalLimit(newLimit)) )
      .then(() => this.props.changeCurrentDate(date))
      .catch(error => {
        let err;
        if (error
          && error.payload
          && error.payload.response
          && error.payload.response.data
          && error.payload.response.data.message) {
          err = error.payload.response.data.message;
        }
        else {
          err = 'Technical error';
        }
        this.props.getMonthReportFailure(err);
      })
  }

  onMonthChange = (date) => {
    this.setState({ green: [], red: [] })
    const jwt = localStorage.getItem('jwt');
    this.props.getMonthReport(jwt, date)
    .then(() => {
      const dates = this.props.dates;
      this.dateColors(dates);
    });
  }

  daysColor = ({ date, view }) => {
    const green = this.state.green;
    const red = this.state.red;
    if (view === 'month' && green.includes(date.getDate())) return 'green';
    else if (view === 'month' && red.includes(date.getDate())) return 'red';
    else return null
  }

  render() {
    return(
      <Calendar
       onChange={this.onDateChange}
       value={this.props.currentDate}
       showNeighboringMonth={false}
       className={'custom-calendar'}
       tileClassName={(date, view) => this.daysColor(date, view)}
       onActiveDateChange={value => this.onMonthChange(value['activeStartDate'])}
       onClickMonth={value => this.onMonthChange(value)}
       />
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
      changeCurrentDate: date => dispatch(changeCurrentDate(date)),
      setCurrentDateCalLimit: limit => dispatch(setCurrentDateCalLimit(limit))
};
}

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
