import React, { Component } from "react";
import { connect } from "react-redux";
import { BasketPanel } from '../components/basketPanel';
import {
 hideModal,
 setNewBasket
} from "../actions/index";

class Basket extends Component {

  constructor(props) {
    super(props);

  this.renewBasket = this.renewBasket.bind(this);
  this.refreshBasket = this.refreshBasket.bind(this);
  this.onQtyChange = this.onQtyChange.bind(this);
  this.onMeasureChange = this.onMeasureChange.bind(this);
 }

renewBasket(basket) {
    let checkedBasked;
    if (basket && basket.length) {
      checkedBasked = basket.map((item, i) => {
        const itemQty = +item.serving_qty;
        if (!(!Number.isNaN(itemQty) && Number.isFinite(itemQty))) {
          item.serving_qty = basket[i].last_serving_qty || 0;
        }
        return item;
      })
    } else {
      checkedBasked = basket
    };
    this.props.setNewBasket(checkedBasked);
    const newBasketForStorage = JSON.stringify(checkedBasked);
    localStorage.setItem('basket', newBasketForStorage);

}

onMeasureChange(event,id) {
  const getNutrition = (nutr) => {
   const result = basket[id].full_nutrients.filter(a => {if (a.attr_id === nutr) return a});
   return (result[0] && result[0].value) ? result[0].value : 0;
  }
  const basket = this.props.basket;
  const value = event.target.value;
  const index = event.target.selectedIndex;
  const servWeight = basket[id].alt_measures[index].serving_weight;
  const foodWeight = basket[id].serving_weight_grams;
  const resultCal = (getNutrition(208)/foodWeight) * servWeight;
  const resultProt = (getNutrition(203)/foodWeight) * servWeight;
  const resultFat = (getNutrition(204)/foodWeight) * servWeight;
  const resultCarbs = (getNutrition(205)/foodWeight) * servWeight;
  const resultSodium = (getNutrition(307)/foodWeight) * servWeight;
  const resultSatFat = (getNutrition(606)/foodWeight) * servWeight;
  const newQty = basket[id].alt_measures[index].qty;

  basket[id].originalCal = resultCal;
  basket[id].nf_calories = resultCal;

  basket[id].original_protein = resultProt;
  basket[id].nf_protein = resultProt;

  basket[id].original_fat = resultFat;
  basket[id].nf_total_fat = resultFat;

  basket[id].original_carbs = resultCarbs;
  basket[id].nf_total_carbohydrate = resultCarbs;

  basket[id].original_sodium = resultSodium;
  basket[id].nf_sodium = resultSodium;

  basket[id].original_saturated_fat = resultSatFat;
  basket[id].nf_saturated_fat = resultSatFat;

  basket[id].serving_unit = value;

  basket[id].original_qty = newQty;
  basket[id].serving_qty = newQty;
  this.renewBasket(basket);
}

onQtyChange(event, id) {
  const basket = this.props.basket;
  let value = event.target.value;
  if(isNaN(parseInt(value)) || isNaN(value)) {
    if(!basket[id].original_qty) {
      basket[id].originalCal = basket[id].nf_calories;
      basket[id].original_qty = basket[id].serving_qty;
      basket[id].original_protein = basket[id].nf_protein;
      basket[id].original_fat = basket[id].nf_total_fat;
      basket[id].original_carbs = basket[id].nf_total_carbohydrate;
      basket[id].original_sodium = basket[id].nf_sodium;
      basket[id].original_saturated_fat = basket[id].nf_saturated_fat;
    }
    basket[id].serving_qty = false;
    basket[id].unformatted_qty = value;
    this.renewBasket(basket);
    return;
  }


  const multiplier = (value / (basket[id].original_qty || basket[id].serving_qty)) || 0;
  const calories = basket[id].originalCal || basket[id].nf_calories;
  const protein = basket[id].original_protein || basket[id].nf_protein;
  const fat = basket[id].original_fat || basket[id].nf_total_fat;
  const carbs = basket[id].original_carbs || basket[id].nf_total_carbohydrate;
  const sodium = basket[id].original_sodium || basket[id].nf_sodium;
  const satFat = basket[id].original_saturated_fat || basket[id].nf_saturated_fat;
  const resultCal = multiplier * calories;
  const resultProt = multiplier * protein;
  const resultFat = multiplier * fat;
  const resultCarbs = multiplier * carbs;
  const resultSodium = multiplier * sodium;
  const resultSatFat = multiplier * satFat;

  if(!isNaN(+value) && isFinite(+value)) {
    basket[id].last_serving_qty = Math.abs(+value);
  }
  basket[id].serving_qty = value;
  basket[id].nf_protein = resultProt
  basket[id].serving_qty = value;
  basket[id].nf_calories = resultCal;
  basket[id].nf_total_fat = resultFat;
  basket[id].nf_total_carbohydrate = resultCarbs;
  basket[id].nf_sodium = resultSodium;
  basket[id].nf_saturated_fat = resultSatFat;
  this.renewBasket(basket);
}


 refreshBasket(id) {
   const oldBasket = this.props.basket;
   const basket = oldBasket.filter( (item, i) => i !== id);
   this.renewBasket(basket);
 }

 render() {
   return(
     <BasketPanel
     handleHide={this.props.hideBasketModal}
     basket={this.props.basket}
     deleteItem={this.refreshBasket}
     onQtyChange={this.onQtyChange}
     onMeasureChange={this.onMeasureChange}
     />
   )
 }
}

const mapDispatchToProps = dispatch => {
  return {
    hideBasketModal: () => dispatch(hideModal()),
    setNewBasket: (basket) => dispatch(setNewBasket(basket))
  };
};
const mapStateToProps = state => ({
  basket: state.basket
});
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
