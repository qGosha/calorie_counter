import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import '../style/search_bar.css';
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
  searchFood,
  searchFoodSuccess,
  searchFoodFailure
} from "../actions/index";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      searchPanelView: false,
      myFoodPanel: false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchBarFocus = this.onSearchBarFocus.bind(this);
    this.onSearchBarBlur = this.onSearchBarBlur.bind(this);
  }



  onInputChange(event) {
    this.setState({
      term: event.target.value,
      searchPanelView: true,
      myFoodPanel:false
    });
    const jwt = localStorage.getItem('jwt');
    this.props.searchFood(jwt, event.target.value);
  }

  onSearchBarFocus() {
    if(this.state.searchPanelView) return;
     this.setState({
       myFoodPanel: true
     });
   }

  onSearchBarBlur(event) {
   if(!document.hasFocus()) return;
   if(event.relatedTarget && event.currentTarget.contains( event.relatedTarget )) return;
    this.setState({
      term: "",
      myFoodPanel: false,
      searchPanelView:false
    });
  }

  render() {
    let currentPanel;
    if (this.state.searchPanelView) currentPanel = <SearchResult foundFood={this.props.foundFood}/>;
       else if (this.state.myFoodPanel) currentPanel = <MyFoodPanel suggestedFood={this.props.suggestedFood}/>;
       else currentPanel = null;
    return (
      <div className='form-search' tabIndex="1" onBlur={this.onSearchBarBlur}>
      <form>
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

const mapDispatchToProps = dispatch => {
  return {
    searchFood: (jwt,term) => {
      dispatch(searchFood(jwt, term)).then(response => {
        if (!response.error) {
          dispatch(searchFoodSuccess(response.payload.data));
        } else {
          dispatch(searchFoodFailure(response.payload.response.data.message));
        }
      });
    }
  };
};
const mapStateToProps = state => ({
  userInfo: state.dash.userInfo,
  suggestedFood: state.dash.suggestedFood,
  foundFood: state.foodSearch.foundFood,
  error: state.foodSearch.error
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
