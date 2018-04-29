import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import '../style/basket.css';
import { SearchResult } from '../components/showSearchResult';
import { MyFoodPanel } from '../components/myFoodPanel'
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
