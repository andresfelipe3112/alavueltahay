import GlobalVars from "../global/globalVars";
import FetchLib from "../utils/useFetch";

export const GET_10_STAR_PRODUCTS_ENTREPRENEUR = async (ID, _JWT) => {
  const URL_API_PRODUCTS = `${GlobalVars.urlapi}/products?populate[0]=image&populate[1]=entrepreneurship.category&populate[2]=entrepreneurship.avatar&filters[starProduct][$eq]=true&filters[entrepreneurship][id][$eq]=${ID}&pagination[page]=1&pagination[pageSize]=10`;
  const response = await FetchLib.fetchGet(URL_API_PRODUCTS, _JWT);
  const res = response?.data || [];
  return res;
};
