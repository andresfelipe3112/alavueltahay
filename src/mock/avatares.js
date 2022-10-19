import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_AVATARES = async () => {
  const URL_API_AVATARES = `${GlobalVars.urlapi}/avatars`;
  const response = await FetchLib.fetchGet(URL_API_AVATARES, null);
  const res = response?.data || [];
  return res;
};
