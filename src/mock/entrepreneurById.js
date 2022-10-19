import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_ENTREPRENEUR_BY_ID = async (_JWT, ID) => {
  const URL_API_ENTREPRENEURSHIP = `${GlobalVars.urlapi}/entrepreneurships/${ID}?populate=%2A`;
  const response = await FetchLib.fetchGet(URL_API_ENTREPRENEURSHIP, _JWT);
  const res = response?.data || {};
  return res;
};
