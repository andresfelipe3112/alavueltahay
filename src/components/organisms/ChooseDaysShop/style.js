import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  view: {
    width: GlobalVars.windowWidth - 40,
    minHeight: GlobalVars.windowHeight / 1.5,
    borderRadius: 7,
    backgroundColor: GlobalVars.white,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    position: "relative",
  },

  containerScroll: {
    width: "100%",
    height:
      GlobalVars.windowHeight > 300
        ? GlobalVars.windowHeight / 2
        : GlobalVars.windowHeight - 100,
  },

  scrolling: {
    width: "100%",
    backgroundColor: "transparent",
  },

  wrapScrollView: {
    marginTop: 10,
    paddingBottom: 100,
  },

  checkGroupBoxView: {
    width: "100%",
  },

  checBoxView: {
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: GlobalVars.blueOpaque,
  },

  closeIcon: {
    position: "absolute",
    right: 25,
    top: 25,
  },
});

export default Styles;
