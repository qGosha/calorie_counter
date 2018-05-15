import axios from "axios";

export const GETDFOODLOG = "GETDFOODLOG";
export const GETDFOODLOGSUCCESS = "GETDFOODLOGSUCCESS";
export const GETDFOODLOGFAILURE = "GETDFOODLOGFAILURE";

const ROOT_URL = "https://trackapi.nutritionix.com/v2/";


export const getFoodLoog = (jwt, basket) => {
  const headers = {
    ["x-user-jwt"]: jwt
  }
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const query = {
   timezone,
   begin: new Date().setHours(0,0,0,0),
   end: new Date().setHours(23,59,59,999)

 }
   const response = axios({
      method: "GET",
      url: ROOT_URL + "log",
      headers,
      params : query
    });

  return {
    type: GETDFOODLOG,
    payload: response
  }
}

export const logBasketFoodSuccess = () => ({
  type: LOGBASKETFOODSUCCESS,
})

export const logBasketFoodFailure = () => ({
  type: LOGBASKETFOODFAILURE,
})
