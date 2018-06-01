import axios from "axios";

export const GETFOODLOG = "GETFOODLOG";
export const GETFOODLOGSUCCESS = "GETFOODLOGSUCCESS";
export const GETFOODLOGFAILURE = "GETFOODLOGFAILURE";

export const DELETEFOODLOGITEM = "DELETEFOODLOGITEM";
export const DELETEFOODLOGITEMFAILURE = "DELETEFOODLOGITEMFAILURE";

export const UPDATEQTY = "UPDATEQTY";
export const UPDATEQTYSUCCESS = "UPDATEQTYSUCCESS";
export const UPDATEQTYFAILURE = "UPDATEQTYFAILURE";


const ROOT_URL = "https://trackapi.nutritionix.com/v2/";

// const jwt = localStorage.getItem('jwt');

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

export const deleteFoodLogItem = item => {
  const headers = {
    ["x-user-jwt"]: jwt
  }
  const obj = {
    foods: [{id: item['id']}]
  }
  const response = axios({
    method: "DELETE",
    url: ROOT_URL + "log",
    headers,
    data: obj
  });
  return {
    type: DELETEFOODLOGITEM,
    payload: response
  }
}

export const deleteFoodLogItemFailure = response => ({
  type: DELETEFOODLOGITEMFAILURE,
  payload: response
})


export const updateQty = (jwt, foods) => {
  const headers = {
    ["x-user-jwt"]: jwt
  }
  const obj = {
    foods: [foods]
  }
  const response = axios({
    method: "PUT",
    url: ROOT_URL + "log",
    headers,
    data: obj
  });
  return {
    type: UPDATEQTY,
    payload: response
  }
}

export const updateQtySuccess = response => ({
  type: UPDATEQTYSUCCESS,
  payload: response
})

export const updateQtyFailure = response => ({
  type: UPDATEQTYFAILURE,
  payload: response
})

