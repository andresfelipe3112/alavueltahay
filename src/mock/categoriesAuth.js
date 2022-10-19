import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_CATEGORIES = async (_JWT) => {
  const URL_API_CATEGORIES = `${GlobalVars.urlapi}/categories?sort[0]=category%3Aasc&pagination[page]=1&pagination[pageSize]=300`;
  const response = await FetchLib.fetchGet(URL_API_CATEGORIES, _JWT);
  const res = response?.data || [];
  return res;
};
