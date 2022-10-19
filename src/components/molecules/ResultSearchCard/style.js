import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  container: {
    width: "100%",
    height: GlobalVars.windowHeight / 8,
    backgroundColor: GlobalVars.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.84,
    elevation: 5,
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 10,
    borderRadius: 7,
    marginBottom: 35,
  },

  rootContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
    overflow: "hidden",
  },

  viewcontainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  leftcontent: {
    width: "35%",
    height: "100%",
  },

  rightcontent: {
    width: "65%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headercard: {
    width: "100%",
    height: "15%",
    backgroundColor: GlobalVars.blueOpaque,
  },

  contentcard: {
    width: "100%",
    height: "85%",
    backgroundColor: "transparent",
    paddingLeft: 15,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  tinyLogo: {
    width: "100%",
    height: "100%",
  },

  nameproduct: {
    color: GlobalVars.black,
    fontSize: 14,
    fontFamily: GlobalVars.fontFamily,
    marginBottom: 10,
  },

  priceproduct: {
    color: GlobalVars.black,
    fontFamily: GlobalVars.fontFamily,
    fontSize: 13,
  },

  iconView: {
    padding: 2,
    backgroundColor: GlobalVars.white,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    position: "absolute",
    right: 25,
    bottom: "40%",
  },
});

export default Styles;
