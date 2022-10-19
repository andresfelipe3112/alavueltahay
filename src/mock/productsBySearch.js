import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_ALLS_PRODUCTS_SEARCH = async (S, _JWT) => {
  const URL_API_PRODUCTS = `${GlobalVars.urlapi}/products?populate[0]=image&populate[1]=entrepreneurship.category&populate[2]=entrepreneurship.avatar&filters[product][$containsi]=${S}`;
  const response = await FetchLib.fetchGet(URL_API_PRODUCTS, _JWT);
  const res = response?.data || [];
  return res;
};
