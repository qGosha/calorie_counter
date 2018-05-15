import axios from "axios";

export const GETFOODLOG = "GETFOODLOG";
export const GETFOODLOGSUCCESS = "GETFOODLOGSUCCESS";
export const GETFOODLOGFAILURE = "GETFOODLOGFAILURE";

const ROOT_URL = "https://trackapi.nutritionix.com/v2/";


export const getFoodLog = (jwt, basket) => {
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
    type: GETFOODLOG,
    payload: response
  }
}

export const getFoodLogSuccess = () => ({
  type: GETFOODLOGSUCCESS,
})

export const getFoodLogFailure = () => ({
  type: GETFOODLOGFAILURE,
})
