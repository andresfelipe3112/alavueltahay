import { StyleSheet } from "react-native";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  scrolling: {
    width: "100%",
    backgroundColor: "transparent",
  },

  wrapScrollView: {
    paddingTop: 0,
    paddingBottom: 100,
  },

  searchView: {
    width: "100%",
    paddingTop: 20,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    justifyContent: "center",
  },
});

export default Styles;
