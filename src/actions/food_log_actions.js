import axios from "axios";

export const GETFOODLOG = "GETFOODLOG";
export const GETFOODLOGSUCCESS = "GETFOODLOGSUCCESS";
export const GETFOODLOGFAILURE = "GETFOODLOGFAILURE";

const ROOT_URL = "https://trackapi.nutritionix.com/v2/";


export const getFoodLog = jwt => {
  const headers = {
    ["x-user-jwt"]: jwt
  }
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateFunc = (term) => {
    const date = new Date(term);
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const query = {
   timezone,
   begin: dateFunc(new Date().setHours(0,0,0,0)),
   end: dateFunc(new Date().setHours(23,59,59,999))

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

export const getFoodLogSuccess = response => ({
  type: GETFOODLOGSUCCESS,
  payload: response
})

export const getFoodLogFailure = response => ({
  type: GETFOODLOGFAILURE,
  payload: response
})
