import React, { Component } from 'react';
import '../style/show_search_result.css';
import {
  ListGroup,
  ListGroupItem,
  Image
} from 'react-bootstrap';
export const MyFoodPanel = ({ suggestedFood }) => {
  const foodArr = suggestedFood.foods;
  if (!foodArr.length) return null;
  const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
  const foods = foodArr.slice(0,5);
  const myFood = foods.map((foodItem) => {
    const foodName = foodItem.food_name;
    return  (
      <ListGroupItem
      key={foodItem.food_name}
        className='food-item'>
        <Image src={foodAvatarUrl}
        alt='food'
        className='food-image'/>
        <span className='food-name'>{foodName} </span>
       </ListGroupItem>
    )
  })
  return(
    <div>
    <ListGroup>
    <h5>My Food</h5>
     {myFood}
    </ListGroup>
    </div>
  )
}
