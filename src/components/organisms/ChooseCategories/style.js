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

  gridCats: {
    width: "95%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  categorySelected: {
    height: 150,
    padding: 6,
    width: "45%",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderColor: GlobalVars.blueOpaque,
  },

  categoryNotSelected: {
    height: 150,
    width: "45%",
    borderRadius: 4,
    marginBottom: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  closeIcon: {
    position: "absolute",
    right: 25,
    top: 25,
  },
});

export default Styles;
