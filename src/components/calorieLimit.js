import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  Panel
} from 'react-bootstrap';
import { Container, Row, Col } from 'react-grid-system';

export class CalorieLimit extends Component {
  constructor(props){
    super(props);
    this.state = {
       value: this.props.value
    }
    this.onValueChange = this.onValueChange.bind(this);
  }
  onValueChange(event) {
    const value = event.target.value;
    this.setState({value});
  }
 render() {
  return(
   <Panel>
     <Panel.Heading>Your daily limit</Panel.Heading>
     <Panel.Body>
       <FormGroup>
         <FormControl
           type="text"
           value={this.state.value}
           autoComplete="off"
           onChange={this.onValueChange}
         />
       </FormGroup> 
       <Button
         onClick={() => this.props.onClick(this.state.value)}>
         Submit</Button>
     </Panel.Body>
   </Panel>    
 )
}
}