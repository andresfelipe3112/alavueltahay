import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_JUST_5_PANORAMAS = async (_JWT) => {
  const URL_API_PANORAMAS = `${GlobalVars.urlapi}/panoramas?populate=%2A&pagination[page]=1&pagination[pageSize]=5`;
  const response = await FetchLib.fetchGet(URL_API_PANORAMAS, _JWT);
  const res = response?.data || [];
  return res;
};
