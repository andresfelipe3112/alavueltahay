import FetchLib from "../../utils/useFetch";

import GlobalVars from "../../global/globalVars";

const addProduct = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const Product = DATA?.product || false;

  if (!Product) return false;

  const URL_API_SAVE_PRODUCT = `${GlobalVars.urlapi}/products`;
  const res = await FetchLib.fetchPost(
    URL_API_SAVE_PRODUCT,
    {
      data: {
        product: Product.description,
        entrepreneurship: {
          id: Product.shop,
        },
        unity: String(Product.unity),
        quantity: String(Product.qty),
        price: String(Product.price),
        delivery: Product.delivery,
        starProduct: Product.starProduct,
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
    name: `productImage-${Product.description}-shop:${Product.shop}`,
    type: Product?.filePath?.format,
    uri: Product?.filePath?.uri,
  });
  const resPhoto = await FetchLib.fetchPostFormData(
    URL_API_UPLOAD_IMAGE,
    formDataImage,
    _JWT
  );

  if (resPhoto.error) {
    const URL_API_REMOVE_PRODUCT = `${GlobalVars.urlapi}/products/${res?.data?.id}`;
    const resRemoveProduct = await FetchLib.fetchDrop(
      URL_API_REMOVE_PRODUCT,
      _JWT
    );
    return false;
  }

  const URL_API_SAVE_URI_IMAGE = `${GlobalVars.urlapi}/images`;
  const resSaveImg = await FetchLib.fetchPost(
    URL_API_SAVE_URI_IMAGE,
    {
      data: {
        name: `productImage-${Product.description}-shop:${Product.shop}`,
        uri: resPhoto[0]?.url || "",
        identifierS3: `${resPhoto[0]?.id}` || "",
      },
    },
    _JWT
  );

  if (resSaveImg.error) {
    const URL_API_REMOVE_PRODUCT = `${GlobalVars.urlapi}/products/${res?.data?.id}`;
    const URL_API_REMOVE_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload/files/${resPhoto[0]?.id}`;
    const resRemoveUpload = await FetchLib.fetchDrop(
      URL_API_REMOVE_UPLOAD_IMAGE,
      _JWT
    );
    const resRemoveProduct = await FetchLib.fetchDrop(
      URL_API_REMOVE_PRODUCT,
      _JWT
    );
    return false;
  }

  const URL_API_UPDATE_PRODUCT = `${GlobalVars.urlapi}/products/${res?.data?.id}`;
  const resUpdateItem = await FetchLib.fetchPut(
    URL_API_UPDATE_PRODUCT,
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
    const URL_API_REMOVE_PRODUCT = `${GlobalVars.urlapi}/products/${res?.data?.id}`;
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
      URL_API_REMOVE_PRODUCT,
      _JWT
    );
    return false;
  }

  if (resUpdateItem && resUpdateItem?.data && resUpdateItem?.data?.id) {
    return true;
  }

  return false;
};

const updateProduct = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_UPDATE_PRODUCT = `${GlobalVars.urlapi}/products/${DATA?.id}`;
  const res = await FetchLib.fetchPut(
    URL_API_UPDATE_PRODUCT,
    {
      data: {
        product: DATA.product,
        delivery: DATA.delivery,
        starProduct: DATA.starProduct,
        unity: String(DATA.unity),
        quantity: String(DATA.qty),
        price: String(DATA.price),
      },
    },
    _JWT
  );

  if (!res.error && res.data) {
    return true;
  }

  return false;
};

const updateImageProduct = async (DATA, NEW_IMG, _JWT) => {
  if (!DATA || !NEW_IMG || !_JWT) {
    return false;
  }

  const URL_API_UPLOAD_IMAGE = `${GlobalVars.urlapi}/upload`;
  const formDataImage = new FormData();
  formDataImage.append("files", {
    name: `${DATA?.name}`,
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
        name: `${DATA?.name}`,
        uri: resPhoto[0]?.url || "",
        identifierS3: `${resPhoto[0]?.id}` || "",
      },
    },
    _JWT
  );

  if (resSaveImg.error) {
    return false;
  }

  const URL_API_UPDATE_PRODUCT = `${GlobalVars.urlapi}/products/${DATA?.id}`;
  const resUpdateItem = await FetchLib.fetchPut(
    URL_API_UPDATE_PRODUCT,
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

const deleteProduct = async (ID, _JWT) => {
  if (!ID || !_JWT) {
    return false;
  }

  const URL_API_DELETE_PRODUCT = `${GlobalVars.urlapi}/products/${ID}?populate[0]=image`;
  const res = await FetchLib.fetchDrop(URL_API_DELETE_PRODUCT, _JWT);

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
  addProduct,
  updateProduct,
  deleteProduct,
  updateImageProduct,
};
