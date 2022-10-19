import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  view: {
    width: GlobalVars.windowWidth - 40,
    minHeight: GlobalVars.windowHeight / 1.5,
    borderRadius: 7,
    backgroundColor: GlobalVars.white,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    position: "relative",
    paddingTop: 40,
  },

  containerScroll: {
    width: "100%",
  },

  rowHour: {
    height: 50,
    width: "100%",
    marginVertical: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  columnSeparator: {
    width: 20,
    height: "100%",
  },

  closeIcon: {
    position: "absolute",
    right: 25,
    top: 25,
  },
});

export default Styles;
