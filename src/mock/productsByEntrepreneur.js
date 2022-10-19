import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_ALLS_PRODUCTS_ENTREPRENEUR = async (ID, _JWT) => {
  const URL_API_PRODUCTS = `${GlobalVars.urlapi}/products?populate[0]=image&populate[1]=entrepreneurship.category&filters[entrepreneurship][id][$eq]=${ID}`;
  const response = await FetchLib.fetchGet(URL_API_PRODUCTS, _JWT);
  const res = response?.data || [];
  return res;
};
