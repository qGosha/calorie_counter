export const ADDFOODTOBASKET = "ADDFOODTOBASKET";

export const addToBasket = foodItem => ({
  type: ADDFOODTOBASKET,
  payload: foodItem
})
