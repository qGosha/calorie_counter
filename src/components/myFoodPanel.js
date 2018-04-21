import React, { Component } from 'react';

import {
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
export const MyFoodPanel = ({foodObj}) => {
  const myFood = foodObj.map((foodItem) => {
    return  (
      <ListGroupItem>
       foodItem['food_name']
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
