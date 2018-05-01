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
  form
} from 'react-bootstrap';
import '../style/basket.css';

export const BasketPanel = ({ handleHide, basket }) => {
  let basketFood;
  if(!basket.length) {
    basketFood = null;
  } else {
    basketFood = basket.map(basketItem => {
      const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
      return(
        <Row className="show-grid">
        <Col xs={11} >
          <ListGroupItem
              key={basketItem.food_name}>
              <Image src={basketItem.photo.thumb || foodAvatarUrl}
                alt='food'
                className='food-image'
              />
          </ListGroupItem>
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
