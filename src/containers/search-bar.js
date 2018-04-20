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
  Glyphicon
} from 'react-bootstrap';
import {
  showSpinner
} from "../actions/index";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
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

    return (
      <form className='form-search' onSubmit={this.onFormSubmit}>
      <FormGroup bsSize="md" controlId="search">
      <InputGroup bsSize="md">
          <FormControl
            type="text"
            value={this.state.term}
            placeholder="Search food"
            onChange={this.onInputChange}
            className='search-bar'
            autoComplete="off"
          />
          <InputGroup.Addon>
        <Glyphicon glyph="search" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      </form>
    );
  }
}
