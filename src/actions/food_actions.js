// import axios from "axios";
// const ROOT_URL = "https://trackapi.nutritionix.com/v2/";
//
// export const GETSUGGESTEDFOOD = "GETMYFOOD";
// export const GETSUGGESTEDFOODSUCCESS = "GETMYFOODSUCCESS";
// export const GETSUGGESTEDFOODFAILURE = "GETMYFOODFAILURE";
//
//
// export const getSuggestedFood = jwt => {
//   const path = "me";
//   const response = axios.get(ROOT_URL + path, {
//     headers: { ["x-user-jwt"]: jwt }
//   });
//   return {
//     type: GETSUGGESTEDFOOD,
//     payload: response
//   };
// };
//
// export const getSuggestedFoodSuccess = response => ({
//   type: GETSUGGESTEDFOODSUCCESS,
//   payload: response
// });
//
// export const getSuggestedFoodFailure = response => ({
//   type: GETSUGGESTEDFOODFAILURE,
//   payload: response
// });
