import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import { SearchResult } from '../components/showSearchResult';
import { MyFoodPanel } from '../components/myFoodPanel'
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
      term: "",
      searchPanelView: false,
      myFoodPanel: false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSearchBarFocus = this.onSearchBarFocus.bind(this);
    this.onSearchBarBlur = this.onSearchBarBlur.bind(this);
  }



  onInputChange(event) {
    this.setState({
      term: event.target.value,
      searchPanelView: true,
      myFoodPanel:false
    });
  }

  onSearchBarFocus() {
     this.setState({
       myFoodPanel: true
     });
   }

  onSearchBarBlur(event) {
   if(event.relatedTarget && event.currentTarget.contains( event.relatedTarget )) return;
    this.setState({
      term: "",
      myFoodPanel: false,
      searchPanelView:false
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    if(!this.state.term) return;
    // this.props.fetchWeather(this.state.term);
    this.setState({
      term: "",
      searchPanelView: false,
      myFoodPanel: false
     });
  }

  render() {
    let currentPanel;
       if(this.state.searchPanelView) currentPanel = <SearchResult />;
       else if (this.state.myFoodPanel) currentPanel = <MyFoodPanel suggestedFood={this.props.suggestedFood}/>;
       else currentPanel = null;
    return (
      <div className='form-search' tabIndex="1" onBlur={this.onSearchBarBlur}>
      <form onSubmit={this.onFormSubmit}>
      <FormGroup bsSize="sm" controlId="search">
      <InputGroup bsSize="sm">
          <FormControl
            type="text"
            value={this.state.term}
            placeholder="Search food"
            onChange={this.onInputChange}
            onFocus={this.onSearchBarFocus}

            className='search-bar'
            autoComplete="off"
          />
          <InputGroup.Addon>
        <Glyphicon glyph="search" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      </form>
      {currentPanel}
     </div>
    );
  }
}
