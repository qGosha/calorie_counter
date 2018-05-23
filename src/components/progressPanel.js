import React from "react";
import {
  Panel,
  ProgressBar 
} from 'react-bootstrap';
import { Container, Row, Col } from 'react-grid-system';



export const ProgressPanel =({value, now}) => {
  if(!value || !now) return null;
  const nowCal = Math.round(now);
  const val = Math.round(value);
  const rest = Math.round(val - now); 
  const valueStyle = { fontWeight: 'bold'};
  const descrStyle = {
    fontSize: '1.2rem',
    color: '#999'
    } 
    const barStyle = {
    margin: '0 5px 10px 5px'
}
    
 return(
   <Panel style={{ backgroundColor: '#eee'}}>
     <Row style={{ padding: '15px 5px 5px' }}>
    <Col style={{textAlign: 'left'}}>
         <div style={valueStyle}>{nowCal}</div>
      <div style={descrStyle}>Cal intake</div>
    </Col>
    <Col style={{textAlign: 'right'}}>
         <div style={valueStyle}>{rest}</div>
      <div style={descrStyle}>Cal remaining</div>
    </Col>
   </Row>
   <ProgressBar 
     striped
     bsStyle={nowCal <= value ? 'success' : 'danger'}
     now={nowCal}
     style={barStyle}
     max={val}/>
   </Panel>
 )
}