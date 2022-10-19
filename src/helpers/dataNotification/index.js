import FetchLib from "../../utils/useFetch";

import GlobalVars from "../../global/globalVars";

const deleteNotification = async (ID, _JWT) => {
  if (!ID || !_JWT) {
    return false;
  }

  const URL_API_DELETE_NOTIFICATION = `${GlobalVars.urlapi}/notifications/${ID}`;
  const res = await FetchLib.fetchDrop(URL_API_DELETE_NOTIFICATION, _JWT);

  if (!res.error && res.data) {
    return true;
  }

  return false;
};

const sendQueryNotification = async (DATA, _JWT) => {
  if (!DATA || !_JWT) {
    return false;
  }

  const URL_API_DISPATCH_NOTIFICATION = `${GlobalVars.urlapi}/notifications/activeSend`;
  const res = await FetchLib.fetchPost(
    URL_API_DISPATCH_NOTIFICATION,
    DATA,
    _JWT
  );

  if (!res.error && res.data) {
    return true;
  }

  return false;
};

export default {
  deleteNotification,
  sendQueryNotification,
};
