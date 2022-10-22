import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_USER_INFO = async (_JWT) => {
  const URL_API_USER_DATA = `${GlobalVars.urlapi}/user/allinfo`;
  console.log('URL_API_USER_DATA', URL_API_USER_DATA);
  
  const response = await FetchLib.fetchGet(URL_API_USER_DATA, _JWT);
  const res = response || [];
  return res;
};
