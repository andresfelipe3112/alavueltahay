import { StyleSheet } from "react-native";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  bgView: {
    flex: 1,
  },

  scrolling: {
    width: "100%",
    backgroundColor: "transparent",
  },

  wrapScrollView: {
    marginTop: 50,
    paddingBottom: 100,
  },

  viewContainer: {
    borderRadius: 7,
    paddingVertical: 20,
    marginHorizontal: 20,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    width: GlobalVars.windowWidth - 40,
    backgroundColor: GlobalVars.blueOpaque,
    height:
      GlobalVars.windowHeight > 350 ? GlobalVars.windowHeight / 1.6 : "100%",
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

  tagProfile: {
    width: "100%",
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  subray: {
    height: 2,
    width: "40%",
    borderRadius: 30,
    backgroundColor: GlobalVars.whiteLight,
  },

  poweroff: {
    marginTop: GlobalVars.windowHeight < 725 ? 30 : 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: GlobalVars.windowWidth / 2,
  },

  iconPorweroff: {
    marginRight: 10,
  },
});

export default Styles;
