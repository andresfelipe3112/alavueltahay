import { StyleSheet } from "react-native";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  bgView: {
    flex: 1,
  },

  viewRoot: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  viewContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
  },

  scrollView: {
    width: "100%",
    backgroundColor: "transparent",
  },

  contentContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
    paddingHorizontal: 20,
    alignContent: "center",
    justifyContent: "center",
  },

  burbbleBottom: {
    height: 1000,
    bottom: -925,
    position: "absolute",
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
    justifyContent: "flex-start",
    width: GlobalVars.windowWidth + 200,
    backgroundColor: GlobalVars.firstColor,
  },

  containerLogoMarchantes: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  positionedLogoMarchantes: { position: "absolute", top: -15 },
});

export default Styles;
