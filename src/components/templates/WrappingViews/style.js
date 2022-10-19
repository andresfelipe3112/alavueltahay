import { StyleSheet, Platform } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: GlobalVars.fondoPrincipal,
    paddingTop: Platform.OS === "ios" ? 30 : 0,
  },
});

export default Styles;
