import React from 'react';
import '/style/show_search_result.css';
import {
  ListGroup,
  ListGroupItem,
  Tab,
  Tabs,
  Image
} from 'react-bootstrap';
export const SearchResult = ({ foundFood }) => {
  if (!foundFood) return null;
  else{
    const common = foundFood.common.slice(0,5);
    const branded = foundFood.branded.slice(0, 5);
    const self = foundFood.self.slice(0, 5);

    const commonFood = common.map((commonFoodItem) => {
      return (
        <ListGroupItem
        key={commonFoodItem.food_name}
        className='food-item' >
          <Image
            src={commonFoodItem.photo.thumb || null}
            responsive
            alt='food'
            className='food-image'
            />
         { commonFoodItem.food_name }
       </ListGroupItem>
      )
    })
    return (
      <Tabs
        defaultActiveKey={1}
        id="uncontrolled-tab-example"
      >
        <Tab eventKey={1} title="All">
          <ListGroup>
            <h5>Common Foods</h5>
            { commonFood }
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

}
