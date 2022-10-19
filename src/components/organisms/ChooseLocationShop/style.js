import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  view: {
    width: GlobalVars.windowWidth - 20,
    height: GlobalVars.windowHeight / 1.2,
    borderRadius: 7,
    backgroundColor: GlobalVars.white,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
    paddingTop: 30,
  },

  mapContainer: {
    width: "100%",
    height: GlobalVars.windowHeight / 4,
    borderRadius: 7,
    overflow: "hidden",
  },

  closeIcon: {
    position: "absolute",
    right: 25,
    top: 25,
  },
});

export default Styles;
