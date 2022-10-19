/** Import helpers */
import Storage from "../../helpers/localStorage";

const processingLogout = async () => {
  try {
    await Storage.removeItem("_TOKEN_API");
    await Storage.removeItem("_USER_LOGGED");
    await Storage.removeItem("_SIGN_METHOD");
    await Storage.removeItem("_USER_ENTREPRENEUR");
    return "complete";
  } catch (e) {
    return "error";
  }
};

export default processingLogout;
