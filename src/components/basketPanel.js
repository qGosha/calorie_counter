import React from "react";
import {
  Modal,
  Button,
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import '../style/basket.css';

export const BasketPanel = ({ handleHide, basket }) => {
  let basketFood;
  if(!basket.length) {
    basketFood = null;
  } else {
    basketFood = basket.map(basketItem => {
      return(
        <Row className="show-grid">
        <Col xs={11} >

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
           </Grid>
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={handleHide}>Close</Button>
         </Modal.Footer>
       </Modal>
  )
}
