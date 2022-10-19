import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_JUST_5_ENTREPRENEURS_FOR_CUSTOMERS = async (_JWT) => {
  const URL_API_ENTREPRENEURSHIPS = `${GlobalVars.urlapi}/entrepreneurships?populate=%2A&pagination[page]=1&pagination[pageSize]=5`;
  const response = await FetchLib.fetchGet(URL_API_ENTREPRENEURSHIPS, _JWT);
  const res = response?.data || [];
  return res;
};
