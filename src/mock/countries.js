import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_COUNTRIES = async () => {
  const URL_API_COUNTRIES = `${GlobalVars.urlapi}/countries`;
  const response = await FetchLib.fetchGet(URL_API_COUNTRIES, null);
  const res = response?.data || [];
  return res;
};
