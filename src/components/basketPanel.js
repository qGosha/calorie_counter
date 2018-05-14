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
import '../style/show_search_result.css';
import FontAwesome from 'react-fontawesome';
import SearchBar from '../containers/search-bar'
import { DETAILED_NUTR, BASKET, CONFIRM } from '../containers/Modal';

export const BasketPanel = ({ handleHide, basket, deleteItem, onQtyChange,
  onMeasureChange, sendItemToTheBasketState, showModal, clearBasket }) => {
  let basketFood;
  if(!basket.length) {
    basketFood = null;
  } else {
    basketFood = basket.map((basketItem, i) => {
      const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';

      const qty =  (basketItem.value === undefined) ? basketItem.serving_qty : basketItem.value;
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
          className='info-circle'
          name='info-circle'
          onClick={() => showModal(DETAILED_NUTR, {id: i})}
          style={{}}
            />
        </Col>
        <Col xs={2} sm={1}>
           <div className='basket-description-group'>
            <span className='basket-nutritient'>{calorie}</span>
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
  const confirmText = 'Are you sure you want to clear basket?';


  const total = (element) => {
    return Math.abs(Math.round(basket.reduce((sum, next) => {
        return sum += next[element]
      }, 0) ));
  }
  const totalCalories = total('nf_calories');
  const totalProtein = total('nf_protein');
  const totalCarbs = total('nf_total_carbohydrate');
  const totalFat = total('nf_total_fat');
  const totalSodium = total('nf_sodium');
  return(
    <Modal
      show={true}
      onHide={() => handleHide(BASKET)}
      keyboard={true}
      aria-labelledby="contained-modal-title">
         <Modal.Header closeButton>
           <Modal.Title id="contained-modal-title-lg">
             Basket
           </Modal.Title>
         </Modal.Header>
         <Modal.Header>
            <SearchBar
            isFromBasket={true}
            sendItemToTheBasketState={sendItemToTheBasketState}/>
         </Modal.Header>
         <Modal.Body>
           <Container fluid style={{padding: '0px'}}>
            <form>
              <FormGroup className='basket-form'>
              {basketFood}
              </FormGroup>
              <Row nogutter>
                <Col xs={12}>
                 <Row nogutter className='calorie-basket-row'>
                   <span>Totat calories: </span>
                   <span className='basket-nutritient'>{totalCalories}</span>
                 </Row>
                </Col>
                <Col xs={12}>
                 <Row nogutter className='nutrient-basket-row'>
                  <Col xs={3} className='basket-description-group'>
                   <span>Protein: </span>
                   <span className='basket-nutritient'>{totalProtein}g</span>
                  </Col>
                  <Col xs={3} className='basket-description-group'>
                  <span>Carbs: </span>
                  <span className='basket-nutritient'>{totalCarbs}g</span>
                  </Col>
                  <Col xs={3} className='basket-description-group'>
                  <span>Fat:</span>
                  <span className='basket-nutritient'>{totalFat}g</span>
                  </Col>
                  <Col xs={3} className='basket-description-group'>
                  <span>Sodium: </span>
                  <span className='basket-nutritient'>{totalSodium}mg</span>
                  </Col>
                 </Row>
                </Col>
              </Row>
            </form>
           </Container>
         </Modal.Body>
         <Modal.Footer className='basket-first-footer'>
          <Container fluid>
            <Row style={{justifyContent:'center'}}>
             <Col xs={12} lg={10} style={{marginBottom:'20px'}}>
              <Button
                disabled={!basket.length}
                block
                bsStyle="success"
                onClick={() => handleHide(BASKET)}>
                Log {basket.length ? basket.length : null} foods
              </Button>
             </Col>
            </Row>
             <Row style={{justifyContent:'center'}}>
              <Col xs={12} lg={10}>
               <Button
                 block
                 bsStyle="danger"
                 onClick={() => showModal(CONFIRM, {
                  text: confirmText,
                  confirmFunk: clearBasket
                })}>
                 Clear basket
               </Button>
              </Col>
            </Row>
          </Container>
         </Modal.Footer>
         <Modal.Footer>
        <Button bsStyle="primary" onClick={() => handleHide(BASKET)}>Close</Button>
         </Modal.Footer>
       </Modal>
  )
}
