import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_USER_INFO = async (_JWT) => {
  const URL_API_USER_DATA = `${GlobalVars.urlapi}/user/allinfo`;
  console.log('URL_API_USER_DATA', URL_API_USER_DATA);
  
  const response = await FetchLib.fetchGet(URL_API_USER_DATA, _JWT);
  const res = response || [];
  return res;
};


export const GET_USER_INFO_ESTADISTICS = async (_JWT) => {
  const URL_API_USER_DATA = `${GlobalVars.urlapi}/user/count`;
  
  const response = await FetchLib.fetchGet(URL_API_USER_DATA, _JWT);
  const res = response || [];
  return res;
};

export const GET_USER_INFO_ENTREPRENEURSHIP = async (_JWT) => {
  const URL_API_USER_DATA = `${GlobalVars.urlapi}/entrepreneurship/count`;
  
  const response = await FetchLib.fetchGet(URL_API_USER_DATA, _JWT);
  const res = response || [];
  return res;
};

export const GET_USER_INFO_VISIT = async (_JWT) => {
  const URL_API_USER_DATA = `${GlobalVars.urlapi}/visit/count`;
  
  const response = await FetchLib.fetchGet(URL_API_USER_DATA, _JWT);
  const res = response || [];
  return res;
};

export const GET_USER_INFO_PANORAMA = async (_JWT) => {
  const URL_API_USER_DATA = `${GlobalVars.urlapi}/panorama/count`;
  
  const response = await FetchLib.fetchGet(URL_API_USER_DATA, _JWT);
  const res = response || [];
  return res;
};

export const GET_USER_INFO_PRODUCT = async (_JWT) => {
  const URL_API_USER_DATA = `${GlobalVars.urlapi}/product/count`;
  
  const response = await FetchLib.fetchGet(URL_API_USER_DATA, _JWT);
  const res = response || [];
  return res;
};

export const SEND_EMAIL = async (_JWT,data ) => {
  console.log(data);
  
  const URL_API_USER_DATA = `${GlobalVars.urlapi}/user/csv`;
  
  const response = await FetchLib.fetchPost(URL_API_USER_DATA, 
    {
      'email':'andresfelipe3112@gmail.com'
      },
     _JWT);
  const res = response || [];
  return res;
};

export const COUNTER = async (_JWT, id_store ) => {
 console.log('id_store',id_store);
 try {
   const URL_API_USER_DATA = `${GlobalVars.urlapi}/visitas/${id_store}`;
   let headers;
   if (_JWT) {
     headers = {
       Accept: "application/json",
       "Content-Type": "application/json",
       Authorization: "Bearer " + _JWT,
     };
   } else {
     headers = {
       Accept: "application/json",
       "Content-Type": "application/json",
     };
   }
   const response = await fetch(URL_API_USER_DATA, {
     method: "PUT",
     headers:headers
   });
   const res = response || [];
   return res;
  
 } catch (error) {
   console.log('error',error);
   
 }
};
