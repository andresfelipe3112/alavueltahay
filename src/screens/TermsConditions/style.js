import { StyleSheet } from "react-native";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
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

  paragraph: {
    textAlign: "justify",
  },
});

export default Styles;
