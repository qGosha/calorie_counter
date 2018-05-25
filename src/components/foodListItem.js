import React from 'react';
import '../style/show_search_result.css';
import {
  ListGroupItem,
  Image,
  FormControl
} from 'react-bootstrap';
import { INTAKELOG } from '../containers/Modal';

export const FoodListItem = ({ foods, addToBasket, showModal }) => {
  if(!foods || !foods.length) return null;
    const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';

    const myFood = foods.map((foodItem, i) => {
      const foodName = foodItem.food_name;
      const brandName = foodItem.brand_name || '';
      const servingQty = foodItem.serving_qty || '';
      const servingUnit = foodItem.serving_unit || '';
      const calorie = foodItem.nf_calories ? Math.round(foodItem.nf_calories) : 0;
      const ifCaloried = foodItem.hasOwnProperty('nf_calories');
      const clickFunc = () => {
          showModal ? showModal(INTAKELOG, { foods: foodItem, title: 'Edit food', isFromFoodItem: true}) :
          addToBasket ? addToBasket(foodItem) : false;
        }
      const style = {
        cursor: (!showModal && !addToBasket) ? 'default' : 'pointer'
      }

      const qty = (!showModal && !addToBasket) ? <FormControl
        type="text"
        value={servingQty}
        // onChange={(event) => onQtyChange(event, i)}
        /> : servingQty

      return  (
        <ListGroupItem
          key={foodItem.id}
          style={style}
          className='food-item'
          onClick={() => clickFunc()}>
          <Image src={ foodItem.photo.thumb || foodAvatarUrl }
          alt='food'
          className='food-image'
          />
          <div className='food-description'>
           <div className='food-description-group-1'>
            <span className='food-name'>{foodName} </span>
            <span className='food-size'>{`${brandName ? brandName + ',' : ''} ${qty} ${servingUnit}`}</span>
           </div>
           { ifCaloried ? <div className='food-description-group-2'>
            <span className='food-calorie'>{calorie}</span>
            <span className='food-calorie-name'>cal</span>
          </div>: null }
          </div>
         </ListGroupItem>
      )
    })

  return myFood;
}
