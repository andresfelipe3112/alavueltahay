import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  rootView: {
    width: "100%",
    marginBottom: 30,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: GlobalVars.windowHeight / 20,
  },

  viewContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerContent: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  viewAllLabel: {
    // top: 0,
    // right: 20,
    fontSize: 13,
    // position: "absolute",
  },

  stylesCarousel: {},

  contentCarousel: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 25,
    paddingBottom: 25,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});

export default Styles;
