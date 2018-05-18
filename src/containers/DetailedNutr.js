import React from "react";
import {
  Modal,
  Button,
  ListGroupItem,
  Image,
  FormGroup,
  form,
  FormControl
} from 'react-bootstrap';
import '../style/nutr_details.css';
import { DETAILED_NUTR } from '../containers/Modal';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from "react-redux";

import {
  hideModal
} from "../actions/index";

const DetailedNutr = props => {
  if(!props.basket.length) return null;

  const round = (item) => {
    if (!item) return 0;
    return Math.abs(Math.round(item))
    };
  const fixed = (item) => {
    if(!item) return 0;
    return Math.abs(item.toFixed(1))
  };

  const getNutrition = (nutr) => {
   const result = basketItem.full_nutrients.filter(a => {if (a.attr_id === nutr) return a});
   return (result[0] && result[0].value) ? result[0].value : 0;
  }

  const hideDetailedModal = props.hideDetailedModal;
  const basketItem = props.basket[props.id];
  const qty =  basketItem.serving_qty;
  const value = (basketItem.value === undefined || isNaN(parseInt(basketItem.value)) || isNaN(basketItem.value))
  ? qty : basketItem.value;

  const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';

  const servingUnit = basketItem.serving_unit;
  const foodName = basketItem.food_name;
  const servingWeight = round(basketItem.current_serving_weight || basketItem.serving_weight_grams);
  const brandName = basketItem.brand_name ? <p className='nutr-brand-name'>{basketItem.brand_name}</p> : null;
  const calorie = basketItem.nf_calories ? round(basketItem.nf_calories) : 0;
  const fat = fixed(basketItem.nf_total_fat);
  const calorieFromFat = round(fat * 9);
  const fatDVP = round((calorieFromFat / 500) * 100);
  const satFat = fixed(basketItem.nf_saturated_fat);
  const satFatDVP = round((round(satFat * 9) / 170) * 100);
  const sodium = round(basketItem.nf_sodium);
  const sodiumDVP = round((sodium / 2300) * 100);
  const totalCarbs = round(basketItem.nf_total_carbohydrate);
  const totalCarbsDVP = round((totalCarbs / 300) * 100);
  const protein = round(basketItem.nf_protein);


  const multiplier = (value / qty) || 0;
  const servingWeightGram = servingWeight * multiplier;
  const transFat = fixed( ((getNutrition(605) / basketItem.serving_weight_grams) * servingWeight) * multiplier);
  const polysatFat = fixed( ((getNutrition(646) / basketItem.serving_weight_grams) * servingWeight) * multiplier);
  const monosatFat = fixed( ((getNutrition(645) / basketItem.serving_weight_grams) * servingWeight) * multiplier);
  const cholesterol = round( ((basketItem.nf_cholesterol / basketItem.serving_weight_grams) * servingWeight) * multiplier);
  const cholesterolDVP = round((cholesterol / 300) * 100);
  const potassium = round( ((basketItem.nf_potassium / basketItem.serving_weight_grams) * servingWeight) * multiplier);
  const potassiumDVP = round((potassium / 4250) * 100);
  const dietFiber = fixed( ((basketItem.nf_dietary_fiber / basketItem.serving_weight_grams) * servingWeight) * multiplier);
  const dietFiberDVP = round((dietFiber / 25) * 100);
  const sugar = fixed( ((basketItem.nf_sugars / basketItem.serving_weight_grams) * servingWeight) * multiplier);
  const sugarDVP = round((sugar / 30) * 100);
  const vitaminA = round( ((((getNutrition(320) / basketItem.serving_weight_grams) * servingWeight) * multiplier) / 900) * 100);
  const vitaminC = round( ((((getNutrition(401) / basketItem.serving_weight_grams) * servingWeight) * multiplier) / 90) * 100);
  const calcium = round( ((((getNutrition(301) / basketItem.serving_weight_grams) * servingWeight) * multiplier) / 1300) * 100);
  const iron = round( ((((getNutrition(303) / basketItem.serving_weight_grams) * servingWeight) * multiplier) / 18) * 100);


  return (
    <Modal
      show={true}
      keyboard={true}
      onHide={() => hideDetailedModal(DETAILED_NUTR)}
      aria-labelledby="nutr-modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="nutr-modal-title-lg">
            Nutrition details
           </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
         <Row nogutter style={{padding: '10px'}}>
          <Col>
           <Image
            src={basketItem.photo.thumb || foodAvatarUrl}
            className='nutr-image'
            rounded
            alt='food'/>
          </Col>
          <Col>
          <div className='nutr-name'>{foodName}</div>
          {brandName}
          </Col>
        </Row>
        <Row nogutter style={{padding: '10px', justifyContent:'center'}}>
         <Col xs={12} sm={8} md={6}  className='nutr-table-container'>
         <Row nogutter>
          <Col className='nutr-table-heading'>Nutrition Facts</Col>
         </Row>
         <Row nogutter>
          <Col>{foodName}</Col>
         </Row>
         <Row nogutter>
          <Col className='nutr-table-servunit'>Serving size: {value} {servingUnit} ({servingWeightGram}g)</Col>
         </Row>
         <Row nogutter className='nutr-line line-perserving nutr-line-divider'>
          <Col>Amount Per Serving</Col>
         </Row>
         <Row nogutter className='nutr-line'>
          <Col><strong>Calories</strong> {calorie}</Col>
          <Col xs={7} className='nutr-col-right'>Calories from Fat {calorieFromFat}</Col>
         </Row>
         <Row nogutter className='nutr-bar-row'>
          <Col className='nutr-col-right'><strong>% Daily Value*</strong></Col>
         </Row>
         <Row nogutter className='nutr-line'>
          <Col xs={7}><strong>Total Fat </strong>{fat}g</Col>
          <Col className='nutr-col-right'><strong>{fatDVP}</strong>%</Col>
         </Row>
         <Row nogutter className='nutr-line-indent'>
          <Col xs={9}>Saturated Fat {satFat}g</Col>
          <Col className='nutr-col-right'><strong>{satFatDVP}</strong>%</Col>
         </Row>
         <Row nogutter className='nutr-line-indent'>
          <Col>Trans Fat {transFat}g</Col>
         </Row>
         <Row nogutter className='nutr-line-indent'>
          <Col>Polyunsaturated Fat {polysatFat}g</Col>
         </Row>
         <Row nogutter className='nutr-line-indent'>
          <Col>Monounsaturated Fat {monosatFat}g</Col>
         </Row>
         <Row nogutter className='nutr-line'>
          <Col xs={7}><strong>Cholesterol </strong>{cholesterol}mg</Col>
          <Col className='nutr-col-right'><strong>{cholesterolDVP}</strong>%</Col>
         </Row>
         <Row nogutter className='nutr-line'>
          <Col xs={7}><strong>Sodium </strong>{sodium}mg</Col>
          <Col className='nutr-col-right'><strong>{sodiumDVP}</strong>%</Col>
         </Row>
         <Row nogutter className='nutr-line'>
          <Col xs={7}><strong>Potassium </strong>{potassium}mg</Col>
          <Col className='nutr-col-right'><strong>{potassiumDVP}</strong>%</Col>
         </Row>
         <Row nogutter className='nutr-line'>
          <Col xs={10}><strong>Total Carbohydrates </strong>{totalCarbs}g</Col>
          <Col className='nutr-col-right'><strong>{totalCarbsDVP}</strong>%</Col>
         </Row>
         <Row nogutter className='nutr-line-indent'>
          <Col xs={8}>Dietary Fiber {dietFiber}g</Col>
          <Col className='nutr-col-right'><strong>{dietFiberDVP}</strong>%</Col>
         </Row>
         <Row nogutter className='nutr-line-indent'>
          <Col xs={7}>Sugars {sugar}g</Col>
          <Col className='nutr-col-right'><strong>{sugarDVP}</strong>%</Col>
         </Row>
         <Row nogutter className='nutr-line'>
          <Col><strong>Protein </strong>{protein}g</Col>
         </Row>
         <Row nogutter className='nutr-line nutr-line-divider'>
          <Col xs={7}>Vitamin A</Col>
          <Col className='nutr-col-right'>{vitaminA}%</Col>
         </Row>
         <Row nogutter className='nutr-line'>
          <Col xs={7}>Vitamin C</Col>
          <Col className='nutr-col-right'>{vitaminC}%</Col>
         </Row>
         <Row nogutter className='nutr-line'>
          <Col xs={7}>Calcium</Col>
          <Col className='nutr-col-right'>{calcium}%</Col>
         </Row>
         <Row nogutter className='nutr-line'>
          <Col xs={7}>Iron</Col>
          <Col className='nutr-col-right'>{iron}%</Col>
         </Row>
         <Row nogutter className='nutr-line nutr-bottom-text'>
          <Col>
           <span>
            * Percent Daily Values are based on a 2000 calorie diet.
           </span>
          </Col>
         </Row>
         </Col>
        </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger"
          onClick={() => hideDetailedModal(DETAILED_NUTR)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    hideDetailedModal: modalType => dispatch(hideModal(modalType))
  };
};
const mapStateToProps = state => ({
  basket: state.basket
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailedNutr);
