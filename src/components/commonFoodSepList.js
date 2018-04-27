import React, { Component } from 'react';
import '../style/show_search_result.css';
import { FoodListItem } from '../components/foodListItem';
import {
  ListGroup,
  ListGroupItem,
  Image
} from 'react-bootstrap';

export const CommonFood = ({ foods }) => {
  return (
    <ListGroup className='common-food-sep'>
      <h5 className='food-group-title'>Common foods</h5>
      <FoodListItem foods={foods} />
    </ListGroup>
  )
}
