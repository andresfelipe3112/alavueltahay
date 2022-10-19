import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

/** Import Globals */
import GlobalVars from "../../global/globalVars";

/** Import Hooks */
import processingLogout from "../useLogout";

// Initialize Firebase
const app = initializeApp(GlobalVars.firebaseConfig);
const analytics = getAnalytics(app);

// modules

const SignedOut = (nav) => {
  try {
    processingLogout();
    nav.navigate("Initial");
    return true;
  } catch (e) {
    return false;
  }
};

export default {
  SignedOut,
};
