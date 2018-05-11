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
  const hideDetailedModal = props.hideDetailedModal;
  const basketItem = props.basket[props.id];
  const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
  const qty =  basketItem.serving_qty || basketItem.unformatted_qty;
  const servingUnit = basketItem.serving_unit;
  const foodName = basketItem.food_name;
  const brandName = basketItem.brand_name ? <p className='nutr-brand-name'>{basketItem.brand_name}</p> : null;
  const calorie = basketItem.nf_calories ? Math.abs(Math.round(basketItem.nf_calories)) : 0;
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
         <Col className='nutr-table-container'>
          <div className='nutr-table-heading'>Nutrition Facts</div>
          <div>{foodName}</div>
          <div className='nutr-table-servunit'>Serving size: {servingUnit}</div>
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
