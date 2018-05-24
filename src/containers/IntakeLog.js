import React from "react";
import {
  Modal,
  Button,
} from 'react-bootstrap';
import {
  hideModal,
  getFoodLog,
  getFoodLogSuccess,
  getFoodLogFailure,
  deleteFoodLogItem,
  deleteFoodLogItemFailure
} from "../actions/index";
import '../style/nutr_details.css';
import { INTAKELOG } from '../containers/Modal';
import { DetailedNutrPanel } from '../components/detailedNutrPanel'
import { connect } from "react-redux";

const IntakeLog = props => {
  const foods = props.foods;
  const title = props.title;
  const isFromFoodItem = props.isFromFoodItem;
  const hideModal = props.hideModal;
  const deleteFoodLogItem = props.deleteFoodLogItem;

  const deleteButton = isFromFoodItem ? <Button bsStyle="danger"
    onClick={() => deleteFoodLogItem(foods)}>Delete</Button> : null;

  const copyButton = isFromFoodItem ? <Button bsStyle="info"
        onClick={() => hideModal(INTAKELOG)}>Copy</Button> : null;
       
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
        {deleteButton}
        {copyButton}
        <Button
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
    hideModal: modalType => dispatch(hideModal(modalType)),
    deleteFoodLogItem: item => {
      dispatch(deleteFoodLogItem(item)).then( response => {
        if (!response.error) { 
          const jwt = localStorage.getItem('jwt');
          dispatch(getFoodLog(jwt)).then(response => {
            if (!response.error) {
              dispatch(getFoodLogSuccess(response.payload.data.foods));
              dispatch(hideModal(INTAKELOG));
            } else {
              dispatch(getFoodLogFailure(response.payload.response.data.message))
            }
          }) 
          } else {
           dispatch(deleteFoodLogItemFailure())  
          } 
      }) 
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntakeLog);
