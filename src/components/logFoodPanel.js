import React from "react";
import { Container, Row, Col } from 'react-grid-system';
import {
  ListGroup,
  Panel,
  Popover,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { FoodListItem } from '../components/foodListItem';
import FontAwesome from 'react-fontawesome';
import { INTAKELOG } from '../containers/Modal';
import { totalNutrients, total } from '../helpers/help_functions';


export const LogFoodPanel = ({ foods, showModal }) => {

  const totalPeriodNutr = (period) => {
    if(!period || !period.length) return false;
    return {
      nf_calories: total('nf_calories', period),
      nf_total_fat: total('nf_total_fat', period),
      nf_saturated_fat: total('nf_saturated_fat', period),
      nf_sodium: total('nf_sodium', period),
      nf_total_carbohydrate: total('nf_total_carbohydrate', period),
      nf_protein: total('nf_protein', period),
      full_nutrients: totalNutrients(period)
    }
  }
  const intake = (arr, time1, time2) => {
    return foods.filter( (item,i) => {
      const consumed = new Date(item.consumed_at).getHours();
      if (consumed >= time1 && (time2 ? (consumed < time2) : true )) return item;
    })
  }


  const breakfast = intake(foods, 6, 12);
  const lunch = intake(foods, 12, 17);
  const dinner = intake(foods, 17, 21);
  const snacks = intake(foods, 21);

  const breakfastCal = Math.round(total('nf_calories', breakfast));
  const lunchCal = Math.round(total('nf_calories', lunch));
  const dinnerCal = Math.round(total('nf_calories', dinner));
  const snacksCal = Math.round(total('nf_calories', snacks));


  const totalIntake = {
    Breakfast: totalPeriodNutr(breakfast),
    Lunch: totalPeriodNutr(lunch),
    Dinner: totalPeriodNutr(dinner),
    Snacks: totalPeriodNutr(snacks)
  }

  const headStyle = {
    padding:'10px 8px',
    textTransform: 'uppercase',
    color: '#222'
  }
  const colStyle = {
    textAlign: 'right'
  }
  const iconStyle ={
    cursor: 'pointer',
    fontSize: '17px',
    marginRight: '10px',
    color: '#837474'
  }

  const tooltip = (obj, name) => {
      return (
        <Tooltip id="tooltip" style={{ display: obj ? 'none': 'auto'}}>
          <strong>No added food for {name}</strong>
        </Tooltip>
      )
};

  const period = (name, totalCal, per) => {
    return (
      <Panel bsStyle="success" style={{margin:'0'}}>
        <Panel.Heading style={headStyle}>
        <Row nogutter>
         <Col xs={9}>{name}</Col>
         <Col style={colStyle} xs={3}>
           <Row nogutter style={{justifyContent:'space-between'}}>
            <Col xs={5}>
            <OverlayTrigger
            onClick={ () => 
              totalIntake[name] ? showModal(INTAKELOG, { foods: totalIntake[name], title: name}) : false }
            placement="bottom"
            triger='hover'
            overlay={tooltip(totalIntake[name], name)}
            >
             <FontAwesome
               style={iconStyle}
               name='info-circle' />
            </OverlayTrigger>
            </Col>
            <Col xs={7}>
             {totalCal}
            </Col>
           </Row>
         </Col>
        </Row>
        </Panel.Heading>
        <ListGroup>
          <FoodListItem foods={per} />
        </ListGroup>
      </Panel>
    )
  }
  return (
    <Container fluid className='food-log-panel'>
     { period('Breakfast', breakfastCal, breakfast) }
     { period('Lunch', lunchCal, lunch) }
     { period('Dinner', dinnerCal, dinner) }
     { period('Snacks', snacksCal, snacks) }
    </Container>
  )
}
