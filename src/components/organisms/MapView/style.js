import { StyleSheet, Platform } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  viewMap: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
    overflow: "hidden",
  },

  map: {
    width: GlobalVars.windowWidth - 50,
    height: GlobalVars.windowHeight > 400 ? 300 : GlobalVars.windowHeight / 150,
    borderRadius: 7,
  },
});

export default Styles;
