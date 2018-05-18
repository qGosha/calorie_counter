import React from "react";
import { Container, Row, Col } from 'react-grid-system';
import '../style/total_panel.css';


export const TotalPanel = ({ foods }) => {

    const total = (element) => {
      return Math.abs(Math.round(foods.reduce((sum, next) => {
          return sum += next[element]
        }, 0) ));
    }
    const totalCalories = total('nf_calories');
    const totalProtein = total('nf_protein');
    const totalCarbs = total('nf_total_carbohydrate');
    const totalFat = total('nf_total_fat');
    const totalSodium = total('nf_sodium');
    return (
      <Row nogutter>
        <Col xs={12}>
         <Row nogutter className='calorie-total-row'>
           <span>Totat calories: </span>
           <span className='total-nutritient'>{totalCalories}</span>
         </Row>
        </Col>
        <Col xs={12}>
         <Row nogutter className='nutrient-total-row'>
          <Col xs={3} className='total-description-group'>
           <span>Protein: </span>
           <span className='total-nutritient'>{totalProtein}g</span>
          </Col>
          <Col xs={3} className='total-description-group'>
          <span>Carbs: </span>
          <span className='total-nutritient'>{totalCarbs}g</span>
          </Col>
          <Col xs={3} className='total-description-group'>
          <span>Fat:</span>
          <span className='total-nutritient'>{totalFat}g</span>
          </Col>
          <Col xs={3} className='total-description-group'>
          <span>Sodium: </span>
          <span className='total-nutritient'>{totalSodium}mg</span>
          </Col>
         </Row>
        </Col>
      </Row>
     )
    }
