import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  hideModal,
  getFoodLog,
  getFoodLogSuccess,
  getFoodLogFailure,
  deleteFoodLogItem,
  deleteFoodLogItemFailure,
  showModal,
  setNewBasket,
  updateQty,
  updateQtySuccess,
  updateQtyFailure
} from "../actions/index";
import "../style/nutr_details.css";
import { INTAKELOG, CONFIRM, BASKET } from "../containers/Modal";
import { DetailedNutrPanel } from "../components/detailedNutrPanel";
import { FoodListItem } from "../components/foodListItem";
import { connect } from "react-redux";
import { v4 } from "uuid";

class IntakeLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: false
    };
    this.onQtyChange = this.onQtyChange.bind(this);
    this.renewBasket = this.renewBasket.bind(this);
    this.updateQty = this.updateQty.bind(this);
  }
  componentDidMount() {
    const foods = this.props.foods;
    this.setState({foods})
  }

  updateQty() {
    const jwt = localStorage.getItem("jwt");
    const foods = this.state.foods;
    foods["serving_qty"] = +foods.serving_qty
      ? foods.serving_qty
      : foods.last_good_value;
    foods["last_good_value"] = undefined;
    this.props.updateQty(jwt, foods);
    this.props.hideModal(INTAKELOG)

  }

  onQtyChange(event) {
    const newFoods = Object.assign({}, this.state.foods);
    const newValue = event.target.value;
    const oldValue = newFoods["serving_qty"];
    const isnan = value => isNaN(parseInt(value)) || isNaN(value) || !+value;
    if (isnan(newValue)) {
      newFoods["serving_qty"] = newValue;
      if (!newFoods["last_good_value"]) newFoods["last_good_value"] = oldValue;
      this.setState({ foods: newFoods });
    } else {
      const fullNutr = newFoods["full_nutrients"].map(i => {
        const n =
          i["value"] *
          (newValue /
            (isnan(oldValue) ? newFoods["last_good_value"] : oldValue));
        return {
          attr_id: i["attr_id"],
          value: n
        };
      });
      newFoods["last_good_value"] = newValue;
      newFoods["serving_qty"] = newValue;
      newFoods["full_nutrients"] = fullNutr;
      this.setState({ foods: newFoods });
    }
  }

  renewBasket(item) {
    const basket = this.props.basket;
    const newItem = {
      ...item,
      id: v4(),
      full_nutrients: this.state.foods["full_nutrients"],
      isFromFoodLog: true,
      serving_qty: +item.serving_qty ? item.serving_qty : item.last_good_value
    };
    const newBasket = basket.concat(newItem);
    this.props.hideModal(INTAKELOG);
    this.props.setNewBasket(newBasket);
    this.props.showModal(BASKET);
  }

  render() {
    const foods = this.state.foods;
    if (!foods) return null;
    const props = this.props;
    const title = props.title;
    const isFromFoodItem = props.isFromFoodItem;
    const hideModal = props.hideModal;
    const deleteFoodLogItem = props.deleteFoodLogItem;
    const showModal = props.showModal;
    const jwt = localStorage.getItem("jwt");
    const confirmText = "Are you sure you want to delete this item?";

    const deleteButton = isFromFoodItem ? (
      <Button
        bsStyle="danger"
        onClick={() =>
          showModal(CONFIRM, {
            text: confirmText,
            confirmFunk: () => this.props.deleteFoodLogItem(jwt, foods)
          })
        }
      >
        Delete
      </Button>
    ) : null;

    const copyButton = isFromFoodItem ? (
      <Button bsStyle="info" onClick={() => this.renewBasket(foods)}>
        Copy
      </Button>
    ) : null;

    const updateSection = isFromFoodItem ? (
      <Modal.Footer>
        <Button 
        bsStyle='warning' 
        onClick={this.updateQty}>Update</Button>
      </Modal.Footer>
    ) : null;

    const qtyPanelAdjust = isFromFoodItem ? (
      <FoodListItem foods={[foods]} onQtyChange={this.onQtyChange} />
    ) : null;

    return (
      <Modal
        show={true}
        keyboard={true}
        onHide={() => hideModal(INTAKELOG)}
        aria-labelledby="nutr-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="nutr-modal-title-lg">{title} Total</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {qtyPanelAdjust}
          <DetailedNutrPanel
            foodObj={foods}
            isFromBasket={false}
            dailyCal={props.dailyCal} />
        </Modal.Body>
         {updateSection}
         <Modal.Footer>
          {deleteButton}
          {copyButton}
          <Button onClick={() => hideModal(INTAKELOG)}>Close</Button>
         </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  dailyCal: state.dash.userInfo["daily_kcal"],
  basket: state.basket
});

const mapDispatchToProps = dispatch => {
  return {
    hideModal: modalType => dispatch(hideModal(modalType)),
    deleteFoodLogItem: (jwt, item) => {
      dispatch(deleteFoodLogItem(item)).then(response => {
        if (!response.error) {
          dispatch(hideModal(INTAKELOG));
          dispatch(getFoodLog(jwt)).then(response => {
            if (!response.error) {
              dispatch(getFoodLogSuccess(response.payload.data.foods));
            } else {
              dispatch(
                getFoodLogFailure(response.payload.response.data.message)
              );
            }
          });
        } else {
          dispatch(deleteFoodLogItemFailure());
        }
      });
    },
    showModal: (modalType, modalProps) =>
      dispatch(showModal(modalType, modalProps)),
    setNewBasket: basket => dispatch(setNewBasket(basket)),
    updateQty: (jwt, foods) =>
      dispatch(updateQty(jwt, foods)).then(response => {
        if (!response.error) {
          dispatch(getFoodLog(jwt)).then(response => {
            if (!response.error) {
              dispatch(getFoodLogSuccess(response.payload.data.foods));
            } else {
              dispatch(
                getFoodLogFailure(response.payload.response.data.message)
              );
            }
          });
        } else {
          dispatch(updateQtyFailure(response.payload.response.data.message));
        }
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntakeLog);
