import GlobalVars from "../../global/globalVars";

import useFetch from "../../utils/useFetch";

import randomToken from "../randomToken";

const RecoverPass = async (data) => {
  const API_URL_UPDATE_PASS = `${GlobalVars.urlapi}/user/update-account`;
  try {
    const newHashTmp = await randomToken(8);
    if (data) {
      const res = await useFetch.fetchPut(API_URL_UPDATE_PASS, {
        type: data?.type || "1",
        identifier: data?.email,
        newPassword: data?.newPass || newHashTmp,
        newPasswordConfirmation: data?.newPassConfirm || null,
        currentPassword: data?.currentPass || null,
      });

      return res;
    }
    return false;
  } catch (e) {
    // console.log(e);
    return false;
  }
};

const NavigateScreen = (navigation, screen) => {
  navigation.navigate(screen);
};

export default { RecoverPass, NavigateScreen };
