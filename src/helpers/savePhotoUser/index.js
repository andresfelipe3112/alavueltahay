import FetchLib from "../../utils/useFetch";

import GlobalVars from "../../global/globalVars";

const uploadUserNewPhoto = async (IMG, USR, NEW_IMG, _JWT) => {
  const URL_API_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload`;
  const formDataImage = new FormData();
  formDataImage.append("files", {
    name: `usr_image_${USR.id}_${USR.username}`,
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
        name: `usr_image_${USR.id}_${USR.username}`,
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

  const URL_API_SAVE_RELATIONSHIP_IMG_USR = `${GlobalVars.urlapi}/users/${USR.id}`;
  const resSaveRelationImage = await FetchLib.fetchPut(
    URL_API_SAVE_RELATIONSHIP_IMG_USR,
    {
      image: {
        id: resSaveImg?.data?.id,
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

  if (resPhoto[0]?.id && resSaveImg?.data && resSaveRelationImage?.id) {
    return true;
  }

  return false;
};

export default {
  uploadUserNewPhoto,
};
