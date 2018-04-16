import axios from 'axios';
const headers = {
  "x-app-id" : "62102386",
  "x-app-key": "22ebb62ee3322813bd62ad63cab1e9f3",
  "x-remote-user-id": 0
}
const ROOT_URL = "https://trackapi.nutritionix.com/v2/";


export const SINGUPVIEWON = "SINGUPVIEWON";
export const SINGUPVIEWOFF = "SINGUPVIEWOFF";
export const SINGUP = "SINGUP";
export const SINGINSUCCESS = "SINGINSUCCESS";
export const SINGINERROR = "SINGINERROR";
export const SINGIN = "SINGIN";
export const ADDFOOD = "ADDFOOD";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

export const showSingUp = () => ({
  type: SINGUPVIEWON,
})

export const hideSingUp = () => ({
  type: SINGUPVIEWOFF,
})

export const singUpUser = data => {
  const path = "auth/signup";
  const response = axios.post(ROOT_URL + path, {
    body: data
  });
  return {
    type: SINGUP,
    response
  }
}

export const singInUser = data => {
  const path = "auth/signin";
  const {password, email} = data;
  const response = axios.post(ROOT_URL + path, {
    password,
    email
  });
  return {
    type: SINGIN,
    payload: response
  }
}

export const singInUserSuccess = (response) => ({
  type: SINGINSUCCESS,
  payload: response
})

export const singInUserFailure = (dispatch, response) => ({
  type: SINGINERROR,
  payload: response
})
