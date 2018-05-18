import React from "react";
import { Container, Row, Col } from 'react-grid-system';
import {
  ListGroup,
  Panel
} from 'react-bootstrap';
import { FoodListItem } from '../components/foodListItem';


export const LogFoodPanel = ({foods}) => {
  return (
    <div className='food-log-panel'>
      <Panel>
        <Panel.Heading>
          Breakfast
        </Panel.Heading>
        <ListGroup>
          <FoodListItem foods={foods} />
        </ListGroup>
      </Panel>
    </div>
  )
}
