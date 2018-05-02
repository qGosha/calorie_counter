import axios from "axios";

export const ADDFOODTOBASKET = "ADDFOODTOBASKET";
export const GETDETAILEDFOODINFO = "GETDETAILEDFOODINFO";

const ROOT_URL = "https://trackapi.nutritionix.com/v2/";

export const getDetailedFoodInfo = (jwt, foodItem) => {
  const path = foodItem.nix_item_id ?  "/search/item" : "natural/nutrients";
  const params = foodItem.nix_item_id ?  {nix_item_id : foodItem.nix_item_id} :
  {query : foodItem.food_name};
  const headers = {
    "x-app-id": 62102386,
    "x-app-key": "22ebb62ee3322813bd62ad63cab1e9f3",
    ["x-user-jwt"]: jwt,
    "Content-Type": "application/json"
 }
  const response = axios({
    method: "post",
    url: ROOT_URL + path,
    headers: {
      "x-app-id": 62102386,
      "x-app-key": "22ebb62ee3322813bd62ad63cab1e9f3",
      ["x-user-jwt"]: jwt,
      "Content-Type": "application/json"
   },
    params
  });
  return {
    type: GETDETAILEDFOODINFO,
    payload: response
  }
  }


export const addToBasket = foodItem => ({
    type: ADDFOODTOBASKET,
    payload: foodItem
  })
