import Storage from "../../helpers/localStorage";

import FetchLib from "../useFetch";

import GlobalVars from "../../global/globalVars";

const registerUserSimple = async (
  name,
  lastNames,
  phoneNumber,
  mail,
  country,
  passwd,
  likedCats,
  avatarSelected,
  setUser
) => {
  const URL_API_COUNT_USERS = `${GlobalVars.urlapi}/users/count`;
  const countU = await FetchLib.fetchGet(URL_API_COUNT_USERS, null);

  const URL_API_REGISTER = `${GlobalVars.urlapi}/auth/local/register`;

  const categoriesForUser =
    (likedCats.length > 0 &&
      likedCats.map((cat) => {
        return {
          id: cat,
        };
      })) ||
    [];

  const searchIndexInMail = mail.indexOf("@");
  const strRm = mail.substr(searchIndexInMail);
  const usernameOut = `${mail.replace(strRm, "")}-${Number(countU) + 1}`;

  const res = await FetchLib.fetchPost(
    URL_API_REGISTER,
    {
      email: mail,
      password: passwd,
      username: usernameOut,
      names: name,
      lastnames: lastNames,
      phoneNumber: phoneNumber,
      isStore: false,
      avatar: { id: avatarSelected },
      categories: categoriesForUser,
    },
    null
  );

  if (res.error) {
    return false;
  }

  if (res && res?.jwt && res?.user && !res?.user?.blocked) {
    const user = {
      id: res?.user?.id,
      email: res?.user?.email,
      names: res?.user?.names,
      lastnames: res?.user?.lastnames,
      username: res?.user?.username,
    };
    await Storage.storeData("_TOKEN_API", res.jwt);
    await Storage.storeData("_USER_LOGGED", user);
    await Storage.storeData("_SIGN_METHOD", "MAIL");
    await Storage.storeData("_ON_BOARD", true);
    setUser(user);
    return true;
  }

  return false;
};

const registerUserWhitEntrepreneurship = async (
  name,
  lastNames,
  phoneNumber,
  mail,
  country,
  passwd,
  likedCats,
  avatarSelected,
  shopName,
  descriptionShop,
  shopCat,
  nameAddress,
  coords,
  daysWork,
  continuousHours,
  openHour,
  closeHour,
  openHourMorning,
  closeHourMorning,
  openHourEvernoon,
  closeHourEvernoon,
  contactChannels,
  avatarShop,
  imageShop,
  frontShop,
  frontShopPre,
  setUser
) => {
  const URL_API_COUNT_USERS = `${GlobalVars.urlapi}/users/count`;
  const countU = await FetchLib.fetchGet(URL_API_COUNT_USERS, null);

  const URL_API_REGISTER = `${GlobalVars.urlapi}/auth/local/register`;

  const categoriesForUser =
    (likedCats.length > 0 &&
      likedCats.map((cat) => {
        return {
          id: cat,
        };
      })) ||
    [];

  const searchIndexInMail = mail.indexOf("@");
  const strRm = mail.substr(searchIndexInMail);
  const usernameOut = `${mail.replace(strRm, "")}-${Number(countU) + 1}`;

  const res = await FetchLib.fetchPost(
    URL_API_REGISTER,
    {
      email: mail,
      password: passwd,
      username: usernameOut,
      names: name,
      lastnames: lastNames,
      phoneNumber: phoneNumber,
      isStore: true,
      avatar: { id: avatarSelected },
      categories: categoriesForUser,
    },
    null
  );

  if (res.error) {
    return false;
  }

  if (res && res?.jwt && res?.user && !res?.user?.blocked) {
    const user = {
      id: res?.user?.id,
      email: res?.user?.email,
      names: res?.user?.names,
      lastnames: res?.user?.lastnames,
      username: res?.user?.username,
    };
    await Storage.storeData("_TOKEN_API", res.jwt);
    await Storage.storeData("_USER_LOGGED", user);
    await Storage.storeData("_SIGN_METHOD", "MAIL");
    await Storage.storeData("_ON_BOARD", true);
    setUser(user);
  }

  const URL_API_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload`;
  const formDataImage = new FormData();
  formDataImage.append("files", {
    name: `firstImage-${shopName.replace(/ /g, "")}-${name}-${lastNames}`,
    type: imageShop?.format,
    uri: imageShop?.uri,
  });
  const resPhoto = imageShop
    ? await FetchLib.fetchPostFormData(
        URL_API_UPLOAD_IMAGE,
        formDataImage,
        res.jwt
      )
    : null;

  if (resPhoto?.error) {
    const URL_API_REMOVE_USER = `${GlobalVars.urlapi}/users/${res?.user?.id}`;
    const resRemoveUser = await FetchLib.fetchDrop(
      URL_API_REMOVE_USER,
      res.jwt
    );
    await Storage.clearAll();
    return false;
  }

  const URL_API_SAVE_URI_IMAGE = `${GlobalVars.urlapi}/images`;
  const resSaveImg = imageShop
    ? await FetchLib.fetchPost(
        URL_API_SAVE_URI_IMAGE,
        {
          data: {
            name: `firstImage-${shopName.replace(
              / /g,
              ""
            )}-${name}-${lastNames}`,
            uri: resPhoto[0]?.url || "",
            identifierS3: `${resPhoto[0]?.id}` || "",
          },
        },
        res.jwt
      )
    : null;

  if (resSaveImg?.error) {
    const URL_API_REMOVE_USER = `${GlobalVars.urlapi}/users/${res?.user?.id}`;
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      res.jwt
    );
    const resRemoveUser = await FetchLib.fetchDrop(
      URL_API_REMOVE_USER,
      res.jwt
    );
    await Storage.clearAll();
    return false;
  }

  const formDataFront = new FormData();
  formDataFront.append("files", {
    name: `frontImage-${shopName.replace(/ /g, "")}-${name}-${lastNames}`,
    type: frontShop?.format,
    uri: frontShop?.uri,
  });
  const resPhotoFront = frontShop
    ? await FetchLib.fetchPostFormData(
        URL_API_UPLOAD_IMAGE,
        formDataFront,
        res.jwt
      )
    : null;

  if (resPhotoFront?.error) {
    const URL_API_REMOVE_USER = `${GlobalVars.urlapi}/users/${res?.user?.id}`;
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const URL_API_REMOVE_CONTENT_IMAGE = `${GlobalVars.urlapi}/images/${resSaveImg?.data?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      res.jwt
    );
    const resRemoveImage = await FetchLib.fetchDrop(
      URL_API_REMOVE_CONTENT_IMAGE,
      res.jwt
    );
    const resRemoveUser = await FetchLib.fetchDrop(
      URL_API_REMOVE_USER,
      res.jwt
    );
    await Storage.clearAll();
    return false;
  }

  const resSaveImgFront = frontShop
    ? await FetchLib.fetchPost(
        URL_API_SAVE_URI_IMAGE,
        {
          data: {
            name: `frontImage-${shopName.replace(
              / /g,
              ""
            )}-${name}-${lastNames}`,
            uri: resPhotoFront[0]?.url || "",
            identifierS3: `${resPhotoFront[0]?.id}` || "",
          },
        },
        res.jwt
      )
    : null;

  if (resSaveImgFront?.error) {
    const URL_API_REMOVE_USER = `${GlobalVars.urlapi}/users/${res?.user?.id}`;
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const URL_API_REMOVE_CONTENT_IMAGE = `${GlobalVars.urlapi}/images/${resSaveImg?.data?.id}`;
    const URL_API_REMOVE_UPLOAD_IMAGE_FRONT = `${GlobalVars.urlapi}/upload/files/${resPhotoFront[0]?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      res.jwt
    );
    const resRemoveImage = await FetchLib.fetchDrop(
      URL_API_REMOVE_CONTENT_IMAGE,
      res.jwt
    );
    const resRemoveUploadFront = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE_FRONT,
      res.jwt
    );
    const resRemoveUser = await FetchLib.fetchDrop(
      URL_API_REMOVE_USER,
      res.jwt
    );
    await Storage.clearAll();
    return false;
  }

  const URL_API_SAVE_ENTREPRENEURSHIP = `${GlobalVars.urlapi}/entrepreneurships`;
  const dataEntrepreneur = {
    entrepreneurship: shopName,
    description: descriptionShop,
    gps: coords,
    address: nameAddress,
    officeHours: !continuousHours
      ? {
          continuousHours: false,
          open: openHour,
          close: closeHour,
        }
      : {
          continuousHours: true,
          evernoon: {
            close: closeHourEvernoon,
            open: openHourEvernoon,
          },
          morning: {
            close: closeHourMorning,
            open: openHourMorning,
          },
        },
    officeDays: {
      workDays: daysWork,
    },
    contactChannels: {
      channels: contactChannels,
    },
    score: 4,
    category: {
      id: shopCat,
    },
    users_permissions_user: {
      id: res?.user?.id,
    },
  };

  if (imageShop) {
    dataEntrepreneur.images = [{ id: resSaveImg?.data?.id }];
    dataEntrepreneur.imageFirst = { id: resSaveImg?.data?.id };
  }

  if (avatarShop) {
    dataEntrepreneur.avatar = avatarShop;
  }

  if (frontShop) {
    dataEntrepreneur.frontImage = { id: resSaveImgFront?.data?.id };
  }

  if (frontShopPre) {
    dataEntrepreneur.frontImageGallery = frontShopPre;
  }

  const resSaveEntrepreneurships = await FetchLib.fetchPost(
    URL_API_SAVE_ENTREPRENEURSHIP,
    {
      data: dataEntrepreneur,
    },
    res.jwt
  );

  if (resSaveEntrepreneurships.error) {
    const URL_API_REMOVE_USER = `${GlobalVars.urlapi}/users/${res?.user?.id}`;
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const URL_API_REMOVE_CONTENT_IMAGE = `${GlobalVars.urlapi}/images/${resSaveImg?.data?.id}`;
    const URL_API_REMOVE_UPLOAD_IMAGE_FRONT = `${GlobalVars.urlapi}/upload/files/${resPhotoFront[0]?.id}`;
    const URL_API_REMOVE_CONTENT_IMAGE_FRONT = `${GlobalVars.urlapi}/images/${resSaveImg?.data?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      res.jwt
    );
    const resRemoveImage = await FetchLib.fetchDrop(
      URL_API_REMOVE_CONTENT_IMAGE,
      res.jwt
    );
    const resRemoveUploadFront = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE_FRONT,
      res.jwt
    );
    const resRemoveImageFront = await FetchLib.fetchDrop(
      URL_API_REMOVE_CONTENT_IMAGE_FRONT,
      res.jwt
    );
    const resRemoveUser = await FetchLib.fetchDrop(
      URL_API_REMOVE_USER,
      res.jwt
    );
    await Storage.clearAll();
    return false;
  }

  if (
    resSaveEntrepreneurships &&
    resSaveEntrepreneurships?.data &&
    resSaveEntrepreneurships?.data?.id
  ) {
    await Storage.storeData(
      "_USER_ENTREPRENEUR",
      resSaveEntrepreneurships?.data?.id
    );
    return true;
  }

  return false;
};

const LogInUser = async (email, password, setUser, setJwt) => {
  const URL_API_LOGIN = `${GlobalVars.urlapi}/auth/local`;
  const res = await FetchLib.fetchPost(
    URL_API_LOGIN,
    { identifier: email, password },
    null
  );


  if (res && res?.jwt && res?.user && !res.user.blocked) {
    const user = {
      id: res?.user?.id,
      email: res?.user?.email,
      names: res?.user?.names,
      lastnames: res?.user?.lastnames,
      username: res?.user?.username,
    };

    await Storage.storeData("_TOKEN_API", res.jwt);
    await Storage.storeData("_USER_LOGGED", user);
    await Storage.storeData("_SIGN_METHOD", "MAIL");
    setUser(user);
    setJwt(res?.jwt);

    const URL_API_RECOVER_ENTREPRENEUR_IF_EXISTS = `${GlobalVars.urlapi}/entrepreneurships?filters[users_permissions_user][id][$eq]=${res.user.id}&fields[0]=id`;
    const resEntrepreneur = await FetchLib.fetchGet(
      URL_API_RECOVER_ENTREPRENEUR_IF_EXISTS,
      res.jwt
    );

    if (resEntrepreneur && resEntrepreneur?.data.length) {
      await Storage.storeData(
        "_USER_ENTREPRENEUR",
        resEntrepreneur?.data[0]?.id
      );
    }

    return true;
  }

  return false;
};

const addEntrepreneurshipPostRegister = async (
  user,
  _jwt,
  shopName,
  descriptionShop,
  shopCat,
  nameAddress,
  coords,
  daysWork,
  continuousHours,
  openHour,
  closeHour,
  openHourMorning,
  closeHourMorning,
  openHourEvernoon,
  closeHourEvernoon,
  contactChannels,
  avatarShop,
  imageShop,
  frontShop,
  frontShopPre
) => {
  if (!user || !user?.id || !_jwt) {
    return false;
  }

  const URL_API_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload`;
  const formDataImage = new FormData();
  formDataImage.append("files", {
    name: shopName
      ? `firstImage-${shopName.replace(/ /g, "")}-${user?.names}-${
          user?.lastnames
        }`
      : "",
    type: imageShop?.format ?? "",
    uri: imageShop?.uri ?? "",
  });
  const resPhoto = imageShop
    ? await FetchLib.fetchPostFormData(
        URL_API_UPLOAD_IMAGE,
        formDataImage,
        _jwt
      )
    : null;

  const URL_API_SAVE_URI_IMAGE = `${GlobalVars.urlapi}/images`;
  const resSaveImg = imageShop
    ? await FetchLib.fetchPost(
        URL_API_SAVE_URI_IMAGE,
        {
          data: {
            name: `firstImage-${shopName.replace(/ /g, "")}-${user?.names}-${
              user?.lastnames
            }`,
            uri: resPhoto[0]?.url || "",
            identifierS3: `${resPhoto[0]?.id}` || "",
          },
        },
        _jwt
      )
    : null;

  if (resSaveImg?.error) {
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _jwt
    );
    return false;
  }

  const formDataFront = new FormData();
  formDataFront.append("files", {
    name: `frontImage-${shopName.replace(/ /g, "")}-${user?.names}-${
      user?.lastnames
    }`,
    type: frontShop?.format,
    uri: frontShop?.uri,
  });
  const resPhotoFront = frontShop
    ? await FetchLib.fetchPostFormData(
        URL_API_UPLOAD_IMAGE,
        formDataFront,
        _jwt
      )
    : null;

  if (resPhotoFront?.error) {
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const URL_API_REMOVE_CONTENT_IMAGE = `${GlobalVars.urlapi}/images/${resSaveImg?.data?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _jwt
    );
    const resRemoveImage = await FetchLib.fetchDrop(
      URL_API_REMOVE_CONTENT_IMAGE,
      _jwt
    );

    return false;
  }

  const resSaveImgFront = frontShop
    ? await FetchLib.fetchPost(
        URL_API_SAVE_URI_IMAGE,
        {
          data: {
            name: `frontImage-${shopName.replace(/ /g, "")}-${user?.names}-${
              user?.lastnames
            }`,
            uri: resPhotoFront[0]?.url || "",
            identifierS3: `${resPhotoFront[0]?.id}` || "",
          },
        },
        _jwt
      )
    : null;

  if (resSaveImgFront?.error) {
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const URL_API_REMOVE_CONTENT_IMAGE = `${GlobalVars.urlapi}/images/${resSaveImg?.data?.id}`;
    const URL_API_REMOVE_UPLOAD_IMAGE_FRONT = `${GlobalVars.urlapi}/upload/files/${resPhotoFront[0]?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _jwt
    );
    const resRemoveImage = await FetchLib.fetchDrop(
      URL_API_REMOVE_CONTENT_IMAGE,
      _jwt
    );
    const resRemoveUploadFront = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE_FRONT,
      _jwt
    );

    return false;
  }

  const URL_API_SAVE_ENTREPRENEURSHIP = `${GlobalVars.urlapi}/entrepreneurships`;
  const dataEntrepreneur = {
    entrepreneurship: shopName,
    description: descriptionShop,
    gps: coords,
    address: nameAddress,
    officeHours: !continuousHours
      ? {
          continuousHours: false,
          open: openHour,
          close: closeHour,
        }
      : {
          continuousHours: true,
          evernoon: {
            close: closeHourEvernoon,
            open: openHourEvernoon,
          },
          morning: {
            close: closeHourMorning,
            open: openHourMorning,
          },
        },
    officeDays: {
      workDays: daysWork,
    },
    contactChannels: {
      channels: contactChannels,
    },
    score: 4,
    category: {
      id: shopCat,
    },
    users_permissions_user: {
      id: user?.id,
    },
  };

  if (imageShop) {
    dataEntrepreneur.images = [{ id: resSaveImg?.data?.id }];
    dataEntrepreneur.imageFirst = { id: resSaveImg?.data?.id };
  }

  if (avatarShop) {
    dataEntrepreneur.avatar = avatarShop;
  }

  if (frontShop) {
    dataEntrepreneur.frontImage = { id: resSaveImgFront?.data?.id };
  }

  if (frontShopPre) {
    dataEntrepreneur.frontImageGallery = frontShopPre;
  }

  const resSaveEntrepreneurships = await FetchLib.fetchPost(
    URL_API_SAVE_ENTREPRENEURSHIP,
    {
      data: dataEntrepreneur,
    },
    _jwt
  );

  if (resSaveEntrepreneurships.error) {
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const URL_API_REMOVE_CONTENT_IMAGE = `${GlobalVars.urlapi}/images/${resSaveImg?.data?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _jwt
    );
    const resRemoveImage = await FetchLib.fetchDrop(
      URL_API_REMOVE_CONTENT_IMAGE,
      _jwt
    );
    return false;
  }

  if (
    resSaveEntrepreneurships &&
    resSaveEntrepreneurships?.data &&
    resSaveEntrepreneurships?.data?.id
  ) {
    const URL_API_UPDATE_DATA_USR = `${GlobalVars.urlapi}/users/${user?.id}`;
    const resSaveUpdateDataUser = await FetchLib.fetchPut(
      URL_API_UPDATE_DATA_USR,
      {
        isStore: true,
      },
      _jwt
    );

    await Storage.storeData(
      "_USER_ENTREPRENEUR",
      resSaveEntrepreneurships?.data?.id
    );
    return true;
  }

  return false;
};

export default {
  registerUserSimple,
  registerUserWhitEntrepreneurship,
  LogInUser,
  addEntrepreneurshipPostRegister,
};
