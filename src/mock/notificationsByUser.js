import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_ALLS_MY_NOTIFICATIONS = async (ID, _JWT) => {
  const URL_API_NOTIFICATIONS = `${GlobalVars.urlapi}/notifications?filters[users_permissions_user][id][$eq]=${ID}`;
  const response = await FetchLib.fetchGet(URL_API_NOTIFICATIONS, _JWT);
  const res = response?.data || [];
  return res;
};
