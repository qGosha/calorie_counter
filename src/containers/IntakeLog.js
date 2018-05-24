import React from "react";
import {
  Modal,
  Button,
} from 'react-bootstrap';
import {
  hideModal
} from "../actions/index";
import '../style/nutr_details.css';
import { INTAKELOG } from '../containers/Modal';
import { DetailedNutrPanel } from '../components/detailedNutrPanel'
import { connect } from "react-redux";

const IntakeLog = props => {
  const foods = props.foods;
  const title = props.title;
  const hideModal = props.hideModal;
  return (
    <Modal
      show={true}
      keyboard={true}
      onHide={() => hideModal(INTAKELOG)}
      aria-labelledby="nutr-modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="nutr-modal-title-lg">
            { title } Total
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <DetailedNutrPanel
       foodObj={foods}
       isFromBasket={false}
       dailyCal={props.dailyCal}/>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger"
          onClick={() => hideModal(INTAKELOG)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = state => ({
  dailyCal: state.dash.userInfo['daily_kcal']
});

const mapDispatchToProps = dispatch => {
  return {
    hideModal: modalType => dispatch(hideModal(modalType))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntakeLog);
