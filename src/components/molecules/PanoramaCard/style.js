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

  contentCardIsFeatured: {
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  containerCardIsAll: {
    width: "45%",
    borderRadius: 25,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: GlobalVars.windowWidth / 3,
  },

  containerTouchableInAll: {
    width: "100%",
    borderRadius: 25,
    backgroundColor: GlobalVars.white,
    height: GlobalVars.windowWidth / 3,
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

  aditionalInfo: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
});

export default Styles;
