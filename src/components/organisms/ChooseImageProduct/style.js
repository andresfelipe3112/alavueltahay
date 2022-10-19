import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  view: {
    width: GlobalVars.windowWidth - 40,
    minHeight: GlobalVars.windowHeight / 1.5,
    borderRadius: 7,
    backgroundColor: GlobalVars.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
  },

  closeIcon: {
    position: "absolute",
    right: 25,
    top: 25,
  },
});

export default Styles;
