import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  containerCardIsFav: {
    marginRight: 25,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    width: GlobalVars.windowWidth / 3.6,
    height: GlobalVars.windowWidth / 2.6,
  },

  containerCardIsAllCats: {
    width: "50%",
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "transparent",
    height: GlobalVars.windowWidth / 3,
  },

  containerTouchableInAll: {
    width: "100%",
    height: "100%",
    backgroundColor: GlobalVars.white,
    borderRadius: 4,
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
  },

  contentCardIsFav: {
    width: "100%",
    marginTop: 10,
    borderRadius: 30,
    paddingVertical: 5,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: GlobalVars.white,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 10.84,
    // elevation: 5,
    // textShadowColor: "black",
    // textShadowOffset: { width: 2, height: 1 },
    // textShadowRadius: 10,
  },

  contentCardIsAll: {
    width: "100%",
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Styles;
