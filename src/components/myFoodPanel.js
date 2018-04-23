import React, { Component } from 'react';

import {
  ListGroup,
  ListGroupItem,
  Image
} from 'react-bootstrap';
export const MyFoodPanel = ({ suggestedFood }) => {
  const myFood = suggestedFood.foods.map((foodItem) => {
    return  (
      <ListGroupItem key={foodItem.food_name}>
        <Image src={foodItem.photo.thumb || null} 
        responsive 
        alt='food' 
        className='food-image'/>;
        { foodItem.food_name }
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
