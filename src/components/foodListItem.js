import React from 'react';
import '../style/show_search_result.css';
import {
  ListGroupItem,
  Image
} from 'react-bootstrap';
import { v4 } from 'uuid';


export const FoodListItem = ({ foods, addToBasket }) => {
  if(!foods || !foods.length) return null;
    const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';

    const myFood = foods.map((foodItem, i) => {
      const foodName = foodItem.food_name;
      const brandName = foodItem.brand_name || '';
      const servingQty = foodItem.serving_qty || '';
      const servingUnit = foodItem.serving_unit || '';
      const calorie = foodItem.nf_calories ? Math.round(foodItem.nf_calories) : 0;
      const ifCaloried = foodItem.hasOwnProperty('nf_calories');
      return  (
        <ListGroupItem
          key={v4()}
          className='food-item'
          onClick={ () => addToBasket(foodItem) }>
          <Image src={foodItem.photo.thumb || foodAvatarUrl}
          alt='food'
          className='food-image'
          />
          <div className='food-description'>
           <div className='food-description-group-1'>
            <span className='food-name'>{foodName} </span>
            <span className='food-size'>{`${brandName ? brandName + ',' : ''} ${servingQty} ${servingUnit}`}</span>
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
