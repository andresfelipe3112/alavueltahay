import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_ALLS_PRODUCTS_CATEGORY = async (ID, _JWT) => {
  const URL_API_PRODUCTS = `${GlobalVars.urlapi}/products?populate[0]=image&populate[1]=entrepreneurship.category&populate[2]=entrepreneurship.avatar&filters[entrepreneurship][category][id][$eq]=${ID}&sort[0]=product%3Aasc&pagination[page]=1&pagination[pageSize]=300`;
  const response = await FetchLib.fetchGet(URL_API_PRODUCTS, _JWT);
  const res = response?.data || [];
  return res;
};

export const GET_ALLS_PRODUCTS = async (_JWT) => {
  const URL_API_PRODUCTS = `${GlobalVars.urlapi}/products?populate[0]=image&populate[1]=entrepreneurship.category&populate[2]=entrepreneurship.avatar&sort[0]=product%3Aasc&pagination[page]=1&pagination[pageSize]=300`;
  const response = await FetchLib.fetchGet(URL_API_PRODUCTS, _JWT);
  const res = response?.data || [];
  return res;
};
