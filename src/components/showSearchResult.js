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
  else {
    const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
    const common = foundFood.common.slice(0,5);
    const branded = foundFood.branded.slice(0, 5);
    const self = foundFood.self.slice(0, 5);
    

    const commonFood = common.map((commonFoodItem) => {
      const foodName = commonFoodItem.food_name;
      return (
        <ListGroupItem
        key={commonFoodItem.food_name}
        className='food-item' >
          <Image
            src={commonFoodItem.photo.thumb || foodAvatarUrl}
            alt='food'
            className='food-image'
            />
          <span className='food-name'>{ foodName }</span>
       </ListGroupItem>
      )
    })
    const brandedFood = branded.map((brandedFoodItem) => {
      const foodName = brandedFoodItem.food_name;
      const brandName = brandedFoodItem.brand_name;
      const servingQty = brandedFoodItem.serving_qty;
      const servingUnit = brandedFoodItem.serving_unit;
      return (
        <ListGroupItem
          key={brandedFoodItem.food_name}
          className='food-item' >
          <Image
            src={brandedFoodItem.photo.thumb || foodAvatarUrl}
            alt='food'
            className='food-image'
          />
          <div className='food-description'>
           <span className='food-name'>{foodName}</span>
           <span className='food-size'>{`${brandName}, ${servingQty} ${servingUnit}`}</span>
          </div>
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
             {brandedFood }
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
