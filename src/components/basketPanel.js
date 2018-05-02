import React from "react";
import {
  Modal,
  Button,
  Grid,
  Col,
  Row,
  ListGroupItem,
  Image,
  FormGroup,
  form,
  FormControl
} from 'react-bootstrap';
import '../style/basket.css';

export const BasketPanel = ({ handleHide, basket }) => {
  let basketFood;
  if(!basket.length) {
    basketFood = null;
  } else {
    basketFood = basket.map(basketItem => {
      const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
      const altMesures = basketItem.alt_measures;
      const foodName = basketItem.food_name;
      const options = altMesures ? altMesures.map( option => {
        const value = option.measure;
        return <option key={value} value={value}>{value}</option>
      }) : null;
      const select = altMesures ?
      <FormControl componentClass="select" placeholder="select">
       {options}
      </FormControl> :
      <FormControl
        type="text"
        disabled={true}
        defaultValue={basketItem.serving_unit}/>;
      return(
        <Row className="show-grid">
        <Col xs={11} >
        <FormGroup key={foodName} >
          <Image src={basketItem.photo.thumb || foodAvatarUrl}
            alt='food'
            className='food-image'/>
          <span>{foodName}</span>
          <FormControl
            type="text"
            defaultValue='1'/>
           {select}
        </FormGroup>
        </Col>
        <Col xs={1}>

        </Col>
        </Row>
      )
    })
  }
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
           <Grid>
            <form>
              <FormGroup>
              {basketFood}
              </FormGroup>
            </form>
           </Grid>
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={handleHide}>Close</Button>
         </Modal.Footer>
       </Modal>
  )
}
