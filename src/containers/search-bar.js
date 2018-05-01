import React, { Component } from "react";
import { connect } from "react-redux";
import { SearchResult } from '../components/showSearchResult';
import { MyFoodPanel } from '../components/myFoodPanel';
import { SearchBarPanel } from '../components/search-bar-panel';
import { SHOW_BASKET } from './Modal'
import {
  searchFood,
  searchFoodSuccess,
  searchFoodFailure,
  addToBasket,
  showModal
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
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(foodItem) { 
    const oldBasket = localStorage.getItem('basket') || [];
    const newBasket = (oldBasket.length) ? JSON.parse(oldBasket) : [];
    const newBasketForStore = newBasket.concat(foodItem);
    const newBasketForStorage = JSON.stringify(newBasketForStore);
    localStorage.setItem('basket', newBasketForStorage);
    this.props.addToBasket(newBasketForStore);
    if(!this.props.isFromBasket) {
      this.props.showBasketModal(SHOW_BASKET);    
    }
  }

  onInputChange(event) {
    const value = event.target.value;
    if(!value) {
      this.setState({
        term: '',
        searchPanelView: false,
        myFoodPanel: true
      });
      return;
    }
    this.setState({
      term: value,
      searchPanelView: true,
      myFoodPanel:false
    });
    const jwt = localStorage.getItem('jwt');
    this.props.searchFood(jwt, value);
  }

  onSearchBarFocus() {
    if(this.state.searchPanelView || this.state.myFoodPanel) return;
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
    if (this.state.searchPanelView) {
      currentPanel = <SearchResult
        foundFood={this.props.foundFood}
        term={this.state.term}
        addToBasket={this.onItemClick} />;
    }
       else if (this.state.myFoodPanel) {
      currentPanel = <MyFoodPanel
        suggestedFood={this.props.suggestedFood}
        addToBasket={this.onItemClick} />;
       }
       else currentPanel = null;
    return (
     <SearchBarPanel
      onBlur={this.onSearchBarBlur}
      onFocus={this.onSearchBarFocus}
      onChange={this.onInputChange}
      term={this.state.term}
      currentPanel={currentPanel}
      />
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
    },
    addToBasket: foodItem => dispatch(addToBasket(foodItem)),
    showBasketModal: modalType => dispatch(showModal(modalType))
  };
};
const mapStateToProps = state => ({
  userInfo: state.dash.userInfo,
  suggestedFood: state.dash.suggestedFood,
  foundFood: state.foodSearch.foundFood,
  error: state.foodSearch.error
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
