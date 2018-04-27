import React from 'react';
import '../style/show_search_result.css';
import { FoodListItem } from '../components/foodListItem';
import { CommonFood } from '../components/commonFoodSepList';
import { ListGroup, ListGroupItem, Tab, Tabs, Image, Row, Col, NavItem, NavDropdown, MenuItem, Nav
} from 'react-bootstrap';
export const SearchResult = ({ foundFood, term }) => {
  if (!foundFood) return null;
  else {
    const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
    const common = foundFood.common.slice(0,5);
    const branded = foundFood.branded.slice(0, 3);
    const self = foundFood.self.slice(0, 5);

    const freeformElement = (
        <ListGroupItem
        className='food-item' >
          <Image
            src={foodAvatarUrl}
            alt='food'
            className='food-image'
            />
          <div className='food-description'>
          <span className='food-name'>{ term }</span>
          </div>
       </ListGroupItem>
      )
    let freeform;
    if(common.length) {
      freeform = (common[0].food_name !== term) ? freeformElement : null;
    } else {
      freeform = freeformElement;
    }

    const foodListGroup = (title, element) => {
      return (
        <ListGroup>
           <h5 className= 'food-group-title'>{title}</h5>
           {element}
        </ListGroup>
      )
    }

    return (
      <Tab.Container id="tabs-with-dropdown" defaultActiveKey="1">
        <Row className="clearfix">
          <Col sm={12} xsHidden>
            <Nav bsStyle="tabs">
              <NavItem eventKey="1">All</NavItem>
              <NavItem eventKey="2">Your foods</NavItem>
              <NavItem eventKey="4">Common</NavItem>
              <NavItem eventKey="5">Branded</NavItem>
              <NavItem eventKey="6">Freeform</NavItem>  
            </Nav>
          </Col>
          <Col sm={12} smHidden mdHidden lgHidden>
            <Nav bsStyle="tabs">
              <NavItem eventKey="1">All</NavItem>
              <NavDropdown eventKey="3" title="Other options" id="nav-dropdown-within-tab">
                <MenuItem eventKey="2">Your foods</MenuItem>
                <MenuItem eventKey="4">Common</MenuItem>
                <MenuItem eventKey="5">Branded</MenuItem>
                <MenuItem eventKey="6">Freeform</MenuItem>
              </NavDropdown>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content animation>
              <Tab.Pane eventKey="1">
                {self.length ? foodListGroup('Your Foods', <FoodListItem foods={self} />) : null}
                {common.length ? foodListGroup('Common food', <FoodListItem foods={common} />) : null}
                {branded.length ? foodListGroup('Branded food', <FoodListItem foods={branded} />) : null}
                {freeform ? foodListGroup('Freeform', freeform) : null}
              </Tab.Pane>
              <Tab.Pane eventKey="2"><CommonFood foods={foundFood.common}/></Tab.Pane>
              <Tab.Pane eventKey="4">Tab 3.1 content</Tab.Pane>
              <Tab.Pane eventKey="5">Tab 3.2 content</Tab.Pane>
              <Tab.Pane eventKey="6">Tab 3.3 content</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )
  }

}