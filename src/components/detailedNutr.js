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
import { SHOW_DETAILED_NUTR, SHOW_BASKET } from '../containers/Modal';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from "react-redux";

import {
  hideModal
} from "../actions/index";

const DetailedNutr = (props) => {
  const hideDetailedModal = props.hideDetailedModal;
  return (
    <Modal
      show={true}
      keyboard={true}
      aria-labelledby="contained-modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">
          Basket
           </Modal.Title>
      </Modal.Header>
      <Modal.Header>
      </Modal.Header>
      <Modal.Body>
        <Container fluid style={{ padding: '0px' }}>
          <form>
            <FormGroup className='basket-form'>
              sdlpjvoisdjoivoisdjoiv
            </FormGroup>
            <Row nogutter>
              <Col xs={12}>
              sdlpjvoisdjoivoisdjoiv
              ssdlpjvoisdjoivoisdjoivdlpjvoisdjoivoisdjoiv
sdlpjvoisdjoivoisdjoiv
              sdlpjvoisdjoivoisdjoiv
sdlpjvoisdjoivoisdjoiv
              sdlpjvoisdjoivoisdjoiv
              sdlpjvoisdjoivoisdjoiv
              </Col>
            </Row>
          </form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" 
          onClick={() => hideDetailedModal(SHOW_DETAILED_NUTR)}>Close</Button>
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