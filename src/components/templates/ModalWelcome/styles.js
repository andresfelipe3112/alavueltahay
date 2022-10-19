import { StyleSheet, Platform } from "react-native";
import GlobalVars from "../../../global/globalVars";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    height: GlobalVars.windowHeight,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingTop: Platform.OS === "ios" ? 70 : 20,
  },

  container: {
    width: "90%",
    paddingTop: 20,
    borderRadius: 4,
    paddingBottom: 20,
    borderWidth: 0.25,
    position: "relative",
    paddingHorizontal: 15,
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
    borderColor: GlobalVars.white,
    height:
      Platform.OS === "ios"
        ? GlobalVars.windowHeight - 90
        : GlobalVars.windowHeight - 40,
    backgroundColor: GlobalVars.white,
  },

  centerContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  imgFloat: {
    left: 20,
    bottom: 50,
    position: "absolute",
  },
});

export default styles;
