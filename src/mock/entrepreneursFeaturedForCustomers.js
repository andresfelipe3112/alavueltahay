import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_FEATURED_ENTREPRENEURS_FOR_CUSTOMERS = async (_JWT) => {
  const URL_API_ENTREPRENEURSHIPS = `${GlobalVars.urlapi}/entrepreneurships?filters[isFeatured][$eq]=true&populate=%2A`;
  const response = await FetchLib.fetchGet(URL_API_ENTREPRENEURSHIPS, _JWT);
  const res = response?.data || [];
  return res;
};
