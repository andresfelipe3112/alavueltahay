import FetchLib from "../../utils/useFetch";

import GlobalVars from "../../global/globalVars";

const entrepreneurData = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_DATA_SHOP = `${GlobalVars.urlapi}/entrepreneurships/${DATA.id}`;
  const resSaveUpdateDataShop = await FetchLib.fetchPut(
    URL_API_UPDATE_DATA_SHOP,
    {
      data: {
        entrepreneurship: DATA?.entrepreneurship,
        description: DATA?.description,
      },
    },
    _JWT
  );

  if (resSaveUpdateDataShop.error) {
    return false;
  }

  return true;
};

const entrepreneurCategory = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_DATA_SHOP = `${GlobalVars.urlapi}/entrepreneurships/${DATA.id}`;
  const resSaveUpdateDataShop = await FetchLib.fetchPut(
    URL_API_UPDATE_DATA_SHOP,
    {
      data: {
        category: { id: DATA?.category },
      },
    },
    _JWT
  );

  if (resSaveUpdateDataShop.error) {
    return false;
  }

  return true;
};

const entrepreneurAvatar = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_DATA_SHOP = `${GlobalVars.urlapi}/entrepreneurships/${DATA.id}`;
  const resSaveUpdateDataUser = await FetchLib.fetchPut(
    URL_API_UPDATE_DATA_SHOP,
    {
      data: {
        avatar: { id: DATA?.avatar },
      },
    },
    _JWT
  );

  if (resSaveUpdateDataUser.error) {
    return false;
  }

  return true;
};

const entrepreneurFront = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_DATA_SHOP = `${GlobalVars.urlapi}/entrepreneurships/${DATA.id}`;
  const resSaveUpdateDataUser = await FetchLib.fetchPut(
    URL_API_UPDATE_DATA_SHOP,
    {
      data: {
        frontImageGallery: DATA?.frontImageGallery,
      },
    },
    _JWT
  );

  if (resSaveUpdateDataUser.error) {
    return false;
  }

  return true;
};

const uploadShopNewPhoto = async (IMG, SHOP, NEW_IMG, _JWT) => {
  const URL_API_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload`;
  const formDataImage = new FormData();
  formDataImage.append("files", {
    name: `firstImage-shop_image_${SHOP.id}`,
    type: NEW_IMG?.format,
    uri: NEW_IMG?.uri,
  });
  const resPhoto = await FetchLib.fetchPostFormData(
    URL_API_UPLOAD_IMAGE,
    formDataImage,
    _JWT
  );

  if (resPhoto.error) {
    return false;
  }

  const URL_API_SAVE_URI_IMAGE = `${GlobalVars.urlapi}/images`;
  const resSaveImg = await FetchLib.fetchPost(
    URL_API_SAVE_URI_IMAGE,
    {
      data: {
        name: `firstImage-shop_image_${SHOP.id}`,
        uri: resPhoto[0]?.url || "",
        identifierS3: `${resPhoto[0]?.id}` || "",
      },
    },
    _JWT
  );

  if (resSaveImg.error) {
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _JWT
    );
    return false;
  }

  const URL_API_SAVE_RELATIONSHIP_IMG_SHOP = `${GlobalVars.urlapi}/entrepreneurships/${SHOP.id}`;
  const resSaveRelationImage = await FetchLib.fetchPut(
    URL_API_SAVE_RELATIONSHIP_IMG_SHOP,
    {
      data: {
        imageFirst: {
          id: resSaveImg?.data?.id,
        },
      },
    },
    _JWT
  );

  if (resSaveRelationImage.error) {
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _JWT
    );
    const URL_API_REMOVE_CONTENT_IMAGE = `${GlobalVars.urlapi}/images/${resSaveImg?.data?.id}`;
    const resRemoveImage = await FetchLib.fetchDrop(
      URL_API_REMOVE_CONTENT_IMAGE,
      _JWT
    );
    return false;
  }

  if (IMG) {
    const URL_API_DROP_IMAGE_ROW = `${GlobalVars.urlapi}/images/${IMG.id}`;
    const deleteRowImage = await FetchLib.fetchDrop(
      URL_API_DROP_IMAGE_ROW,
      _JWT
    );
    if (deleteRowImage.error) {
      return false;
    }

    const URL_API_DROP_IMAGE_S3 = `${GlobalVars.urlapi}/upload/files/${IMG.identifierS3}`;
    const deleteImageS3 = await FetchLib.fetchDrop(URL_API_DROP_IMAGE_S3, _JWT);
    if (deleteImageS3.error) {
      return false;
    }
  }

  if (resPhoto[0]?.id && resSaveImg?.data && resSaveRelationImage?.data?.id) {
    return true;
  }

  return false;
};

const uploadShopNewPhotoFront = async (IMG, SHOP, NEW_IMG, _JWT) => {
  const URL_API_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload`;
  const formDataImage = new FormData();
  formDataImage.append("files", {
    name: `frontImage-shop_image_${SHOP.id}`,
    type: NEW_IMG?.format,
    uri: NEW_IMG?.uri,
  });
  const resPhoto = await FetchLib.fetchPostFormData(
    URL_API_UPLOAD_IMAGE,
    formDataImage,
    _JWT
  );

  if (resPhoto.error) {
    return false;
  }

  const URL_API_SAVE_URI_IMAGE = `${GlobalVars.urlapi}/images`;
  const resSaveImg = await FetchLib.fetchPost(
    URL_API_SAVE_URI_IMAGE,
    {
      data: {
        name: `frontImage-shop_image_${SHOP.id}`,
        uri: resPhoto[0]?.url || "",
        identifierS3: `${resPhoto[0]?.id}` || "",
      },
    },
    _JWT
  );

  if (resSaveImg.error) {
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _JWT
    );
    return false;
  }

  const URL_API_SAVE_RELATIONSHIP_IMG_SHOP = `${GlobalVars.urlapi}/entrepreneurships/${SHOP.id}`;
  const resSaveRelationImage = await FetchLib.fetchPut(
    URL_API_SAVE_RELATIONSHIP_IMG_SHOP,
    {
      data: {
        frontImage: {
          id: resSaveImg?.data?.id,
        },
      },
    },
    _JWT
  );

  if (resSaveRelationImage.error) {
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _JWT
    );
    const URL_API_REMOVE_CONTENT_IMAGE = `${GlobalVars.urlapi}/images/${resSaveImg?.data?.id}`;
    const resRemoveImage = await FetchLib.fetchDrop(
      URL_API_REMOVE_CONTENT_IMAGE,
      _JWT
    );
    return false;
  }

  if (IMG) {
    const URL_API_DROP_IMAGE_ROW = `${GlobalVars.urlapi}/images/${IMG.id}`;
    const deleteRowImage = await FetchLib.fetchDrop(
      URL_API_DROP_IMAGE_ROW,
      _JWT
    );
    if (deleteRowImage.error) {
      return false;
    }

    const URL_API_DROP_IMAGE_S3 = `${GlobalVars.urlapi}/upload/files/${IMG.identifierS3}`;
    const deleteImageS3 = await FetchLib.fetchDrop(URL_API_DROP_IMAGE_S3, _JWT);
    if (deleteImageS3.error) {
      return false;
    }
  }

  if (resPhoto[0]?.id && resSaveImg?.data && resSaveRelationImage?.data?.id) {
    return true;
  }

  return false;
};

const entrepreneurGps = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_DATA_SHOP = `${GlobalVars.urlapi}/entrepreneurships/${DATA.id}`;
  const resSaveUpdateDataShop = await FetchLib.fetchPut(
    URL_API_UPDATE_DATA_SHOP,
    {
      data: {
        address: DATA?.address,
        gps: DATA?.GPS,
      },
    },
    _JWT
  );

  if (resSaveUpdateDataShop.error) {
    return false;
  }

  return true;
};

const entrepreneurDays = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_DATA_SHOP = `${GlobalVars.urlapi}/entrepreneurships/${DATA.id}`;
  const resSaveUpdateDataShop = await FetchLib.fetchPut(
    URL_API_UPDATE_DATA_SHOP,
    {
      data: {
        officeDays: {
          workDays: DATA?.workDays,
        },
      },
    },
    _JWT
  );

  if (resSaveUpdateDataShop.error) {
    return false;
  }

  return true;
};

const entrepreneurHours = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_DATA_SHOP = `${GlobalVars.urlapi}/entrepreneurships/${DATA.id}`;
  const resSaveUpdateDataShop = await FetchLib.fetchPut(
    URL_API_UPDATE_DATA_SHOP,
    {
      data: {
        officeHours: !DATA.continuousHours
          ? {
              continuousHours: false,
              open: DATA.hours.open,
              close: DATA.hours.close,
            }
          : {
              continuousHours: true,
              evernoon: {
                close: DATA.hours.evernoon.close,
                open: DATA.hours.evernoon.open,
              },
              morning: {
                close: DATA.hours.morning.close,
                open: DATA.hours.morning.open,
              },
            },
      },
    },
    _JWT
  );

  if (resSaveUpdateDataShop.error) {
    return false;
  }

  return true;
};

const entrepreneurChannels = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_DATA_SHOP = `${GlobalVars.urlapi}/entrepreneurships/${DATA.id}`;
  const resSaveUpdateDataShop = await FetchLib.fetchPut(
    URL_API_UPDATE_DATA_SHOP,
    {
      data: {
        contactChannels: {
          channels: DATA.dataSend,
        },
      },
    },
    _JWT
  );

  if (resSaveUpdateDataShop.error) {
    return false;
  }

  return true;
};

export default {
  entrepreneurData,
  entrepreneurCategory,
  entrepreneurAvatar,
  entrepreneurFront,
  uploadShopNewPhoto,
  entrepreneurGps,
  entrepreneurDays,
  entrepreneurHours,
  entrepreneurChannels,
  uploadShopNewPhotoFront,
};
