import { StyleSheet } from "react-native";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  scrolling: {
    width: "100%",
    backgroundColor: "transparent",
  },

  wrapScrollView: {
    paddingBottom: 100,
  },

  mapView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    justifyContent: "center",
    height: GlobalVars.windowHeight / 4,
  },

  searchView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    justifyContent: "center",
  },
});

export default Styles;
