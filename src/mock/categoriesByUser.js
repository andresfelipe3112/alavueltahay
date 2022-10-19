import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_CATEGORIES_BY_USER = async (_JWT) => {
  const URL_API_CATEGORIES = `${GlobalVars.urlapi}/user/allinfo`;
  const response = await FetchLib.fetchGet(URL_API_CATEGORIES, _JWT);
  const res = response?.categories || null;
  return res;
};
