import React, { Component } from 'react';
import '../style/show_search_result.css';
import { FoodListItem } from '../components/foodListItem';
import {
  ListGroup,
  ListGroupItem,
  Image
} from 'react-bootstrap';
export const MyFoodPanel = ({ suggestedFood }) => {
  const foodArr = suggestedFood.foods;
  if (!foodArr.length) return null;
  const foods = foodArr.slice(0,5);

  return(
    <ListGroup>
    <h5>My Food</h5>
     <FoodListItem foods={foods}/>
    </ListGroup>
  )
}
