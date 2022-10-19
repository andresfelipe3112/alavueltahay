import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_USER_INFO = async (_JWT) => {
  const URL_API_USER_DATA = `${GlobalVars.urlapi}/user/allinfo`;
  const response = await FetchLib.fetchGet(URL_API_USER_DATA, _JWT);
  const res = response || [];
  return res;
};
