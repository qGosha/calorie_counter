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
import { Container, Row, Col } from 'react-grid-system';
import '../style/basket.css';
import FontAwesome from 'react-fontawesome';

export const BasketPanel = ({ handleHide, basket, deleteItem, onQtyChange, onMeasureChange }) => {
  let basketFood;
  if(!basket.length) {
    basketFood = null;
  } else {
    basketFood = basket.map((basketItem, i) => {
      const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
      const qty =  basketItem.serving_qty;
      const altMesures = basketItem.alt_measures;
      const foodName = basketItem.food_name;
      const calorie = basketItem.nf_calories ? Math.abs(Math.round(basketItem.nf_calories)) : 0;
      const options = altMesures ? altMesures.map( (option, j) => {
        const value = option.measure;
        return <option key={value + j} value={value}>{value}</option>
      }) : null;
      let select;
      if(altMesures && altMesures.length){
        select = (
          <FormControl
          componentClass="select"
          placeholder="select"
          className='basket-select'
          value={basketItem.serving_unit}
          onChange={event => onMeasureChange(event, i)}>
           {options}
          </FormControl>
        )
      } else {
        select = (
          <FormControl
            type="text"
            disabled={true}
            defaultValue={basketItem.serving_unit}/>
        )
      }
      return(
      <Row key={foodName + i} nogutter className='basket-row'>
        <Col xs={2} md={1}>
          <Image src={basketItem.photo.thumb || foodAvatarUrl}
            alt='food'
            className='food-image'/>
        </Col>
        <Col xs={6} md={8}>
         <Row style={{justifyContent: 'space-between'}}>
          <Col xs={3} sm={3} md={2}>
            <FormControl
              type="text"
              value={qty}
              onChange={(event) => onQtyChange(event, i)}
              className='basket-qty'/>
          </Col>
          <Col xs={8} sm={8} md={9}>
             {select}
          </Col>
          </Row>
          <Row>
          <Col xs={12}>
          <div className='basket-food-name'>{foodName}</div>
          </Col>
          </Row>
        </Col>
        <Col xs={1} sm={1}>
        <FontAwesome
          className='fas fa-info-circle'
          name='info'
            />
        </Col>
        <Col xs={2} sm={1}>
           <div className='food-description-group-2 basket'>
            <span className='food-calorie'>{calorie}</span>
            <span className='food-calorie-name'>cal</span>
          </div>
        </Col>
        <Col xs={1} sm={1}>
          <Button bsClass="close" aria-label="Close" onClick={() => deleteItem(i)}>
           <span aria-hidden="true">&times;</span>
          </Button>
        </Col>

     </Row>
      )
    })
  }
  const totalCalories = Math.abs(Math.round(basket.reduce((sum, next) => {
      return sum += next.nf_calories
    }, 0) ));
  const totalProtein = Math.abs(Math.round(basket.reduce((sum, next) => {
        return sum += next.nf_protein
      }, 0) ));
  return(
    <Modal
      show={true}
      onHide={handleHide}
      keyboard={true}
      aria-labelledby="contained-modal-title">
         <Modal.Header closeButton>
           <Modal.Title id="contained-modal-title-lg">
             Basket
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Container fluid style={{padding: '0px'}}>
            <form>
              <FormGroup>
              {basketFood}
              </FormGroup>
              <Row nogutter>
                <Col xs={12}>
                 <Row nogutter style={{justifyContent: 'space-between'}}>
                   <span>Totat calories:</span>
                   <span>{totalCalories}</span>
                 </Row>
                </Col>
                <Col xs={12}>
                 <Row nogutter style={{justifyContent: 'space-evenly'}}>
                  <Col xs={3}>
                   <div>Protein:</div>
                   <div>{totalProtein}</div>
                  </Col>
                  <Col xs={3}>
                  <div>Carbs:</div>
                  <div>{totalProtein}</div>
                  </Col>
                  <Col xs={3}>
                  <div>Fat:</div>
                  <div>{totalProtein}</div>
                  </Col>
                  <Col xs={3}>
                  <div>Sodium:</div>
                  <div>{totalProtein}</div>
                  </Col>
                 </Row>
                </Col>
              </Row>
            </form>

           </Container>
         </Modal.Body>
         <Modal.Footer>
           <Button bsStyle="danger" onClick={handleHide}>Close</Button>
         </Modal.Footer>
       </Modal>
  )
}
