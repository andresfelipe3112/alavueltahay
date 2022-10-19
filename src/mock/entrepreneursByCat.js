import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_ENTREPRENEURS_FOR_CATEGORY = async (_JWT, ID_CAT) => {
  const URL_API_ENTREPRENEURSHIPS = `${GlobalVars.urlapi}/entrepreneurships?filters[category][id][$eq]=${ID_CAT}&populate=%2A`;
  const response = await FetchLib.fetchGet(URL_API_ENTREPRENEURSHIPS, _JWT);
  const res = response?.data || [];
  return res;
};
