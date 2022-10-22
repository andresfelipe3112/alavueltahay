import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_ALLS_MY_PANORAMAS = async (ID, _JWT) => {
  const URL_API_PANORAMAS = `${GlobalVars.urlapi}/panoramas?populate[0]=image&filters[users_permissions_user][id][$eq]=${ID}`;
  console.log('URL_API_PANORAMAS',URL_API_PANORAMAS );URL_API_PANORAMAS;
  const response = await FetchLib.fetchGet(URL_API_PANORAMAS, _JWT);
  const res = response?.data || [];
  return res;
};
