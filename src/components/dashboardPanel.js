import React from "react";
import { BASKET } from '../containers/Modal';
import {
 Panel
} from 'react-bootstrap';
import { Container, Row, Col } from 'react-grid-system';
import FontAwesome from 'react-fontawesome';
import { CalorieLimit } from '../components/calorieLimit';
import SearchBar from '../containers/search-bar';
import DatePicker from '../containers/DatePicker';
import FoodLog from '../containers/FoodLog';
import '../style/dashboard.css';


export const DashboardPanel = ({
  onSignOut,
  userInfo,
  showBasketModal,
  dailyCalChange,
  dailyCalUpSuccess,
  basket}) => {
    return (
     <Container fluid style={{padding: '0'}}>
     <Row style={{padding: '20px 0', justifyContent: 'flex-end'}}>
    <Col style={{textAlign: 'right'}} xs={5} sm={3} md={2}>
     <Panel>
      <Panel.Heading>Sign out</Panel.Heading>
       <FontAwesome
        onClick={this.onSignOut}
        className='fas fa-sign-out-alt'
        name='sign-out'
        style={{color: 'green', cursor: 'pointer'}}
        size='2x' />
     </Panel>
     </Col>
      </Row>
      <Row>
       <Col xs={10}>
        <h3>Hello, {userInfo.first_name}. This is your Food log</h3>
       </Col>
       <Col xs={2}>
       <span
         onClick={() => showBasketModal(BASKET)}
         className='fa-stack'
         style={{cursor: 'pointer'}}>
       <FontAwesome
        className='fas fa-shopping-basket fa-stack-2x'
        name='shopping-basket'
        style={{color: basket.length ? 'green' : 'grey'}}
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
       <SearchBar/>
      <Row nogutter>
      <Col xs={12} lg={6}>
       <Col xs={12} lg={6}>
       <Panel>
         <Panel.Heading>Track Calendar</Panel.Heading>
          <Panel.Body>
          <Row style={{justifyContent:'center'}}>
           <DatePicker />
           </Row>
          </Panel.Body>
       </Panel>
       </Col>
       <Col xs={12} lg={6}>
       <CalorieLimit
         value={userInfo['daily_kcal']}
         onClick={dailyCalChange}
         dailyCalUpSuccess={dailyCalUpSuccess}/>
       </Col>
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
