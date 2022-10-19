import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_FRONTS = async () => {
  const URL_API_FRONTS = `${GlobalVars.urlapi}/fronts`;
  const response = await FetchLib.fetchGet(URL_API_FRONTS, null);
  const res = response?.data || [];
  return res;
};
