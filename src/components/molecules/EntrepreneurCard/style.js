import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  containerCardIsFeatured: {
    marginRight: 25,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    width: GlobalVars.windowWidth / 2,
    height: GlobalVars.windowWidth / 2,
    backgroundColor: GlobalVars.whiteLight,
    borderRadius: 25,
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

  contentCardIsFeatured: {
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  containerCardIsAllCats: {
    width: "50%",
    marginBottom: 20,
    borderRadius: 25,
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
    borderRadius: 25,
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

  containerCardIsLarge: {
    width: "50%",
    marginBottom: 20,
    borderRadius: 25,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "transparent",
    height: GlobalVars.windowWidth / 2,
  },

  containerTouchableIsLarge: {
    width: "100%",
    height: "100%",
    backgroundColor: GlobalVars.white,
    borderRadius: 25,
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

  contentCardIsAll: {
    width: "100%",
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  contentCardIsLarge: {
    width: "100%",
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  aditionalInfo: {
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Styles;
