import React from 'react';

import '../style/nutr_details.css';
import { Container, Row, Col } from 'react-grid-system';
import { Image } from 'react-bootstrap';
import { fixed, round, getFullNutrition } from '../helpers/help_functions';

export const DetailedNutrPanel = ({ foodObj, isFromBasket, dailyCal }) => {
  const getNutrition = (nutr) => {
    return getFullNutrition(nutr, foodObj);
  }
  const qty =  foodObj.serving_qty;
  const value = (foodObj.value === undefined || isNaN(parseInt(foodObj.value)) || isNaN(foodObj.value))
  ? qty : foodObj.value;

  const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
  const dailyCalMult = dailyCal / 2000;
  const servingUnit = foodObj.serving_unit;
  const foodName = foodObj.food_name;
  const servingWeight = round(foodObj.current_serving_weight || foodObj.serving_weight_grams);
  const brandName = foodObj.brand_name ? <p className='nutr-brand-name'>{foodObj.brand_name}</p> : null;

  // const calorie = round(foodObj.nf_calories);
  // const fat = fixed(foodObj.nf_total_fat);
  // const calorieFromFat = round(fat * 9);
  // const satFat = fixed(foodObj.nf_saturated_fat);
  // const sodium = round(foodObj.nf_sodium);
  // const totalCarbs = round(foodObj.nf_total_carbohydrate);
  // const protein = round(foodObj.nf_protein);




  const multiplier = (value / qty) || 0;
  const servingWeightGram = servingWeight * multiplier;

  const condCalc = (nutr, func) => {
    return isFromBasket ? func( ((nutr/foodObj.serving_weight_grams) * servingWeight) * multiplier) : func(nutr);
  }


  const calorie = condCalc(getNutrition(208), round);
  const fat = condCalc(getNutrition(204), fixed);
  const calorieFromFat = round(fat * 9);
  const satFat = condCalc(getNutrition(606), fixed);
  const sodium = condCalc(getNutrition(307), round);
  const totalCarbs = condCalc(getNutrition(205), round);
  const protein = condCalc(getNutrition(203), round);

  const satFatDVP = round((round(satFat * 9) / (170 * dailyCalMult)) * 100);
  const fatDVP = round((calorieFromFat / (600 * dailyCalMult)) * 100);
  const sodiumDVP = round((sodium / 2300) * 100);
  const totalCarbsDVP = round((totalCarbs / (300 * dailyCalMult)) * 100);


  const transFat = condCalc(getNutrition(605), fixed);
  const polysatFat = condCalc(getNutrition(646), fixed);
  const monosatFat = condCalc(getNutrition(645), fixed);
  const cholesterol = condCalc(getNutrition(601), round);
  const cholesterolDVP = round((cholesterol / 300) * 100);
  const potassium = condCalc(getNutrition(306), round);
  const potassiumDVP = round((potassium / 4250) * 100);
  const dietFiber = condCalc(getNutrition(291), fixed);
  const dietFiberDVP = round(( dietFiber / ((dailyCal/1000) * 14) ) * 100);
  const sugar = condCalc(getNutrition(269), fixed);
  const sugarDVP = round((sugar / (30 * dailyCalMult)) * 100);
  const vitaminAsum = condCalc(getNutrition(320), fixed);
  const vitaminCsum = condCalc(getNutrition(401), fixed);
  const calciumSum = condCalc(getNutrition(301), fixed);
  const ironSum = condCalc(getNutrition(303), fixed);
  const vitaminA = round((vitaminAsum / (900 * dailyCalMult)) * 100);
  const vitaminC = round((vitaminCsum / (90 * dailyCalMult)) * 100);
  const calcium = round((calciumSum / (1300 * dailyCalMult)) * 100);
  const iron = round((ironSum / (18 * dailyCalMult)) * 100);
 
  const basketSection = (
      <Row nogutter style={{padding: '10px'}}>
       <Col>
        <Image
         src={foodObj.photo ? foodObj.photo.thumb : foodAvatarUrl}
         className='nutr-image'
         rounded
         alt='food'/>
       </Col>
       <Col>
       <div className='nutr-name'>{foodName}</div>
       {brandName}
       </Col>
     </Row>
    )
  const foodNameRow = (
    <Row nogutter>
     <Col>{foodName}</Col>
    </Row>
  )
  const servingSizeRow  = (
    <Row nogutter>
     <Col className='nutr-table-servunit'>Serving size: {value} {servingUnit} ({servingWeightGram}g)</Col>
    </Row>

  )
  const perServingRow = (
     <Col>Amount Per Serving</Col>
  )
  return(
    <Container fluid>
    { isFromBasket ? basketSection : null }
    <Row nogutter style={{padding: '10px', justifyContent:'center'}}>
     <Col xs={12} sm={8} md={6}  className='nutr-table-container'>
     <Row nogutter>
      <Col className='nutr-table-heading'>Nutrition Facts</Col>
     </Row>
      { isFromBasket ? foodNameRow : null }
      { isFromBasket ? servingSizeRow : null }
     <Row nogutter className='nutr-line line-perserving nutr-line-divider'>
      { isFromBasket ? perServingRow : <span></span> }
      </Row>
     <Row nogutter className='nutr-line' style={{borderTop: isFromBasket ? '1px solid #222' : 'none'}}>
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
       <span>* Percent Daily Values are based on a {dailyCal} calorie diet.</span>
      </Col>
     </Row>
     </Col>
    </Row>
    </Container>
  )
}
