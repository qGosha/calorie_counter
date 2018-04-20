import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';

import {
  Form,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Alert,
  InputGroup,
  Glyphicon,
  Tab,
  Tabs,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import {
  showSpinner
} from "../actions/index";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      searchPanelView: false,
      key: 1
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }


  onInputChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    if(!this.state.term) return;
    // this.props.fetchWeather(this.state.term);
    this.setState({
      term: "",
      showSearchResult: false
     });
  }


  render() {
    const showSearchResult = (
      <Tabs 
        defaultActiveKey={2}
        id="uncontrolled-tab-example"
      >
        <Tab eventKey={1} title="All">
           <ListGroup>
           <h5>Common Foods</h5>
            <ListGroupItem>
            1 food
            </ListGroupItem>
            <ListGroupItem>
              2 food
            </ListGroupItem>
            <ListGroupItem>
              3 food
            </ListGroupItem>
            <h5>Branded food</h5>
            <ListGroupItem>
              3 food
            </ListGroupItem>
           </ListGroup>;
           
        </Tab>
        <Tab eventKey={2} title="Yor food">
          Tab 2 content
        </Tab>
        <Tab eventKey={3} title="Tab 3">
          Tab 3 content
        </Tab>
      </Tabs>
    )
    return (
      <div className='form-search'>
      <form onSubmit={this.onFormSubmit}>
      <FormGroup bsSize="md" controlId="search">
      <InputGroup bsSize="md">
          <FormControl
            type="text"
            value={this.state.term}
            placeholder="Search food"
            onChange={this.onInputChange}
            className='search-bar'
            autoComplete="off"
            onClick={() => this.setState({ showSearchResult: !this.state.showSearchResult})}
          />
          <InputGroup.Addon>
        <Glyphicon glyph="search" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      </form>
      {this.state.showSearchResult ? showSearchResult : null}
      </div>
    );
  }
}
