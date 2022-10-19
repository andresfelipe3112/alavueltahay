import FetchLib from "../../utils/useFetch";

import GlobalVars from "../../global/globalVars";

const addPanorama = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const Panorama = DATA?.panorama || false;

  if (!Panorama) return false;

  const URL_API_SAVE_PANORAMA = `${GlobalVars.urlapi}/panoramas`;
  const res = await FetchLib.fetchPost(
    URL_API_SAVE_PANORAMA,
    {
      data: {
        panorama: Panorama.panorama,
        type: "panorama",
        address: Panorama.address,
        time: Panorama.time,
        date: Panorama.date,
        contactChannels: { channels: Panorama.contactChannels },
        description: Panorama.description,
        gps: Panorama.gps,
        users_permissions_user: {
          id: Panorama.usr,
        },
      },
    },
    _JWT
  );

  if (res.error) {
    return false;
  }

  const URL_API_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload`;
  const formDataImage = new FormData();
  formDataImage.append("files", {
    name: `panoramaImage-panorama:${Panorama.panorama}`,
    type: Panorama?.filePath?.format,
    uri: Panorama?.filePath?.uri,
  });
  const resPhoto = await FetchLib.fetchPostFormData(
    URL_API_UPLOAD_IMAGE,
    formDataImage,
    _JWT
  );

  if (resPhoto.error) {
    const URL_API_REMOVE_PANORAMA = `${GlobalVars.urlapi}/panoramas/${res?.data?.id}`;
    const resRemoveProduct = await FetchLib.fetchDrop(
      URL_API_REMOVE_PANORAMA,
      _JWT
    );
    return false;
  }

  const URL_API_SAVE_URI_IMAGE = `${GlobalVars.urlapi}/images`;
  const resSaveImg = await FetchLib.fetchPost(
    URL_API_SAVE_URI_IMAGE,
    {
      data: {
        name: `panoramaImage-panorama:${Panorama.panorama}`,
        uri: resPhoto[0]?.url || "",
        identifierS3: `${resPhoto[0]?.id}` || "",
      },
    },
    _JWT
  );

  if (resSaveImg.error) {
    const URL_API_REMOVE_PANORAMA = `${GlobalVars.urlapi}/panoramas/${res?.data?.id}`;
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _JWT
    );
    const resRemoveProduct = await FetchLib.fetchDrop(
      URL_API_REMOVE_PANORAMA,
      _JWT
    );
    return false;
  }

  const URL_API_UPDATE_PANORAMA = `${GlobalVars.urlapi}/panoramas/${res?.data?.id}`;
  const resUpdateItem = await FetchLib.fetchPut(
    URL_API_UPDATE_PANORAMA,
    {
      data: {
        image: {
          id: resSaveImg?.data?.id,
        },
        images: [{ id: resSaveImg?.data?.id }],
      },
    },
    _JWT
  );

  if (resUpdateItem.error) {
    const URL_API_REMOVE_PANORAMA = `${GlobalVars.urlapi}/panoramas/${res?.data?.id}`;
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const URL_API_REMOVE_CONTENT_IMAGE = `${GlobalVars.urlapi}/images/${resSaveImg?.data?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _JWT
    );
    const resRemoveImage = await FetchLib.fetchDrop(
      URL_API_REMOVE_CONTENT_IMAGE,
      _JWT
    );
    const resRemoveProduct = await FetchLib.fetchDrop(
      URL_API_REMOVE_PANORAMA,
      _JWT
    );
    return false;
  }

  if (resUpdateItem && resUpdateItem?.data && resUpdateItem?.data?.id) {
    return true;
  }

  return false;
};

const updatePanorama = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_PANORAMA = `${GlobalVars.urlapi}/panoramas/${DATA?.id}`;
  const res = await FetchLib.fetchPut(
    URL_API_UPDATE_PANORAMA,
    {
      data: {
        panorama: DATA.panorama,
        address: DATA.address,
        time: DATA.time,
        date: DATA.date,
        contactChannels: { channels: DATA.contactChannels },
        description: DATA.description,
        gps: DATA.gps,
      },
    },
    _JWT
  );

  if (!res.error && res.data) {
    return true;
  }

  return false;
};

const updateImagePanorama = async (DATA, NEW_IMG, _JWT) => {
  if (!DATA || !NEW_IMG || !_JWT) {
    return false;
  }

  const URL_API_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload`;
  const formDataImage = new FormData();
  formDataImage.append("files", {
    name: `${DATA.name}`,
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
  } else {
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${DATA?.identifierS3}`;
    const URL_API_REMOVE_CONTENT_IMAGE = `${GlobalVars.urlapi}/images/${DATA?.idImage}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _JWT
    );
    const resRemoveImage = await FetchLib.fetchDrop(
      URL_API_REMOVE_CONTENT_IMAGE,
      _JWT
    );
  }

  const URL_API_SAVE_URI_IMAGE = `${GlobalVars.urlapi}/images`;
  const resSaveImg = await FetchLib.fetchPost(
    URL_API_SAVE_URI_IMAGE,
    {
      data: {
        name: `${DATA.name}`,
        uri: resPhoto[0]?.url || "",
        identifierS3: `${resPhoto[0]?.id}` || "",
      },
    },
    _JWT
  );

  if (resSaveImg.error) {
    return false;
  }

  const URL_API_UPDATE_PANORAMA = `${GlobalVars.urlapi}/panoramas/${DATA?.id}`;
  const resUpdateItem = await FetchLib.fetchPut(
    URL_API_UPDATE_PANORAMA,
    {
      data: {
        image: {
          id: resSaveImg?.data?.id,
        },
        images: [{ id: resSaveImg?.data?.id }],
      },
    },
    _JWT
  );

  if (!resUpdateItem.error && resUpdateItem.data) {
    return true;
  }

  return false;
};

const deletePanorama = async (ID, _JWT) => {
  if (!ID || !_JWT) {
    return false;
  }

  const URL_API_DELETE_PANORAMA = `${GlobalVars.urlapi}/panoramas/${ID}?populate[0]=image`;
  const res = await FetchLib.fetchDrop(URL_API_DELETE_PANORAMA, _JWT);

  if (!res.error && res.data) {
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${res.data?.attributes?.image?.data?.attributes?.identifierS3}`;
    const URL_API_REMOVE_CONTENT_IMAGE = `${GlobalVars.urlapi}/images/${res.data?.attributes?.image?.data?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _JWT
    );
    const resRemoveImage = await FetchLib.fetchDrop(
      URL_API_REMOVE_CONTENT_IMAGE,
      _JWT
    );

    return true;
  }

  return false;
};

export default {
  addPanorama,
  updatePanorama,
  deletePanorama,
  updateImagePanorama,
};
