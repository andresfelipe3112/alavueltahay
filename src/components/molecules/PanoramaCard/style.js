import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  containerCardIsFeatured: {
    marginRight: 25,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    width: GlobalVars.windowWidth / 2,
    maxHeight: GlobalVars.windowWidth / 1.50,
    paddingBottom:30,
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
    paddingBottom:10
  },

  containerCardIsAll: {
    width: "45%",
    borderRadius: 25,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: GlobalVars.windowWidth / 2.7,
  },

  containerTouchableInAll: {
    width: "95%",
    borderRadius: 25,
    backgroundColor: GlobalVars.white,
    height: GlobalVars.windowWidth / 2.7,

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
