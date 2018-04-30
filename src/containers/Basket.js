import React, { Component } from "react";
import { connect } from "react-redux";
import '../style/basket.css';
import {
  searchFood,
  searchFoodSuccess,
  searchFoodFailure
} from "../actions/index";
import {
  Modal,
  Button
} from 'react-bootstrap';

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      searchPanelView: false,
      myFoodPanel: false
    };
 }
 render() {
   return(
     <Modal.Dialog>
     <Modal>
          <Modal.Header closeButton>
            <Modal.Title>
              Contained Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
            ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
          </Modal.Body>
          <Modal.Footer>
            <Button>Close</Button>
          </Modal.Footer>
        </Modal>
     </Modal.Dialog>
   )
 }
}

const mapDispatchToProps = dispatch => {
  return {
    hideBasketModal: () => (dispatch(hideModal(modalType))) 
  };
};
const mapStateToProps = state => ({
  basket: state.basket
});
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
