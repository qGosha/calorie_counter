import axios from "axios";


export const SETNEWBASKET = "SETNEWBASKET";
export const GETDETAILEDFOODINFO = "GETDETAILEDFOODINFO";
export const GETDETAILEDFOODINFOSUCCESS = "GETDETAILEDFOODINFOSUCCESS";
export const GETDETAILEDFOODINFOFAILURE = "GETDETAILEDFOODINFOFAILURE";
export const LOGBASKETFOOD = "LOGBASKETFOOD";
export const LOGBASKETFOODSUCCESS = "LOGBASKETFOODSUCCESS";
export const LOGBASKETFOODFAILURE = "LOGBASKETFOODFAILURE";

const ROOT_URL = "https://trackapi.nutritionix.com/v2/";

export const logBasketFood = (jwt, basket) => {
  const headers = {
    ["x-user-jwt"]: jwt
  }
 const obj = {
   consumed_at: new Date(),
   foods: basket
 }
   const response = axios({
      method: "POST",
      url: ROOT_URL + "log",
      headers,
      obj
    });

  return {
    type: LOGBASKETFOOD,
    payload: response
  }
}

export const logBasketFoodSuccess = () => ({
  type: LOGBASKETFOODSUCCESS,
})

export const logBasketFoodFailure = () => ({
  type: LOGBASKETFOODFAILURE,
})


export const getDetailedFoodInfo = (jwt, foodItem) => {
  const headers = {
    "x-app-id": 62102386,
    "x-app-key": "22ebb62ee3322813bd62ad63cab1e9f3",
    ["x-user-jwt"]: jwt,
    "Content-Type": "application/json"
 }
 let response;
  if(foodItem.nix_item_id) {
   const query =  { "nix_item_id": foodItem.nix_item_id };
     response = axios({
      method: "GET",
      url: ROOT_URL + "search/item",
      headers,
      params : query
    });
  } else {
     response = axios({
      method: "POST",
      url: ROOT_URL + "natural/nutrients",
      headers,
      data : { "query": foodItem.food_name }
    });
  }

  return {
    type: GETDETAILEDFOODINFO,
    payload: response
  }
  }

export const setNewBasket = basket => ({
  type: SETNEWBASKET,
  payload: basket
})

export const getDetailedFoodInfoSuccess = response => ({
  type: GETDETAILEDFOODINFOSUCCESS,
  payload: response
})

export const getDetailedFoodInfoFailure = response => ({
  type: GETDETAILEDFOODINFOFAILURE,
  payload: response
})
