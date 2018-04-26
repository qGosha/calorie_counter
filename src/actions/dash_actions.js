import axios from "axios";
const ROOT_URL = "https://trackapi.nutritionix.com/v2/";

export const GETUSEROBJECT = "GETUSEROBJECT";
export const GETSUGGESTEDFOOD = "GETSUGGESTEDFOOD";
export const FETCHUSEROBJECTSUCCESS = "FETCHUSEROBJECTSUCCESS";
export const FETCHSUGGESTEDFOODSUCCESS = "FETCHSUGGESTEDFOODSUCCESS";
export const FETCHDASHINFOFAILURE = "FETCHDASHINFOFAILURE";
export const SIGNOUT = "SIGNOUT";
export const DASHBOARDLOADING = "DASHBOARDLOADING";

export const getUser = jwt => {
  const path = "me";
  const response = axios.get(ROOT_URL + path, {
    headers: { ["x-user-jwt"]: jwt }
  });
  return {
    type: GETUSEROBJECT,
    payload: response
  };
};

export const getSuggestedFood = (jwt) => {
  const path = "reports/suggested";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const response = axios.get(ROOT_URL + path, {
    headers: { ["x-user-jwt"]: jwt },
    params: { timezone }  
  });
  return {
    type: GETSUGGESTEDFOOD,
    payload: response
  };
};

export const fetchUserObjectSuccess = response => ({
  type: FETCHUSEROBJECTSUCCESS,
  payload: response
});

export const fetchSuggestedFoodSuccess = response => ({
  type: FETCHSUGGESTEDFOODSUCCESS,
  payload: response
});

export const fetchDashInfoFailure = response => ({
  type: FETCHDASHINFOFAILURE,
  payload: response
});

export const showLoadingScreen = () => ({
  type: DASHBOARDLOADING
})

export const signOutUser = () => {
  localStorage.removeItem('jwt');
  return {
    type: SIGNOUT
  }
}
