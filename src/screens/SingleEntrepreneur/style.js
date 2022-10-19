import { StyleSheet } from "react-native";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  scrolling: {
    width: "100%",
    backgroundColor: "transparent",
  },

  wrapScrollView: {
    paddingBottom: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  shadowBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 9,
    shadowRadius: 5.46,
    shadowOpacity: 0.32,
    borderRadius: 7,
    marginVertical: 30,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: GlobalVars.windowWidth - 40,
    backgroundColor: GlobalVars.whiteLight,
  },

  collection: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  orderRows: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  spinner: {
    marginTop: 20,
  },
});

export default Styles;
