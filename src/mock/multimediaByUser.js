import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_MULTIMEDIA_USER = async (_JWT) => {
  const URL_API_DATA_USER = `${GlobalVars.urlapi}/user/allinfo`;
  const response = await FetchLib.fetchGet(URL_API_DATA_USER, _JWT);
  const resAvatar = response?.avatar || null;
  const resImage = response?.image || null;

  const res =
    resAvatar || resImage
      ? {
          resAvatar,
          resImage,
        }
      : null;

  return res;
};
