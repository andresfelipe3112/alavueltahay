import FetchLib from "../../utils/useFetch";

import GlobalVars from "../../global/globalVars";

const userData = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_DATA_USR = `${GlobalVars.urlapi}/users/${DATA.id}`;
  const resSaveUpdateDataUser = await FetchLib.fetchPut(
    URL_API_UPDATE_DATA_USR,
    {
      names: DATA?.name,
      lastnames: DATA?.lastNames,
      phoneNumber: DATA?.phoneNumber,
    },
    _JWT
  );

  if (resSaveUpdateDataUser.error) {
    return false;
  }

  return true;
};

const userPushToken = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_DATA_USR = `${GlobalVars.urlapi}/users/${DATA.id}`;
  const resSaveUpdateDataUser = await FetchLib.fetchPut(
    URL_API_UPDATE_DATA_USR,
    {
      pushToken: DATA?.pushToken,
    },
    _JWT
  );

  if (resSaveUpdateDataUser.error) {
    return false;
  }

  return true;
};

const userLikedCats = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const categoriesForUser =
    (DATA?.likedCats.length &&
      DATA?.likedCats.map((cat) => {
        return {
          id: cat,
        };
      })) ||
    null;

  const URL_API_UPDATE_DATA_USR = `${GlobalVars.urlapi}/users/${DATA.id}`;
  const resSaveUpdateDataUser = await FetchLib.fetchPut(
    URL_API_UPDATE_DATA_USR,
    {
      categories: categoriesForUser,
    },
    _JWT
  );

  if (resSaveUpdateDataUser.error) {
    return false;
  }

  return true;
};

const userAvatar = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_DATA_USR = `${GlobalVars.urlapi}/users/${DATA.id}`;
  const resSaveUpdateDataUser = await FetchLib.fetchPut(
    URL_API_UPDATE_DATA_USR,
    {
      avatar: { id: DATA?.avatar },
    },
    _JWT
  );

  if (resSaveUpdateDataUser.error) {
    return false;
  }

  return true;
};

export default {
  userData,
  userLikedCats,
  userAvatar,
  userPushToken,
};
