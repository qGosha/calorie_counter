import React, { Component } from 'react';

import {
  ListGroup,
  ListGroupItem,
  Tab,
  Tabs
} from 'react-bootstrap';
export const SearchResult = ({foodObj}) => {
  const myFood = foodObj.map((foodItem) => {
    return  (
      <ListGroupItem>
       foodItem['food_name']
       </ListGroupItem>
    )
  })
  return(
    <Tabs
      defaultActiveKey={2}
      id="uncontrolled-tab-example"
    >
      <Tab eventKey={1} title="All">
         <ListGroup>
         <h5>Common Foods</h5>
          <ListGroupItem>
          1 food
          </ListGroupItem>
          <ListGroupItem>
            2 food
          </ListGroupItem>
          <ListGroupItem>
            3 food
          </ListGroupItem>
          <h5>Branded food</h5>
          <ListGroupItem>
            3 food
          </ListGroupItem>
         </ListGroup>
      </Tab>
      <Tab eventKey={2} title="Yor food">
        Tab 2 content
      </Tab>
      <Tab eventKey={3} title="Tab 3">
        Tab 3 content
      </Tab>
    </Tabs>
  )
}
