import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  rootView: {
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  container: {
    width: "100%",
  },

  inner: {
    width: "100%",
    paddingVertical: 8,
    // flexDirection: 'row',
    position: "relative",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  textInput: {
    height: 44,
    width: "100%",
    fontSize: 14,
    marginBottom: 5,
    borderRadius: 5,
    fontWeight: "bold",
    paddingHorizontal: 25,
    fontFamily: GlobalVars.fontFamily,
  },

  textInputHeading: {
    height: 38,
    width: "100%",
    fontSize: 14,
    marginBottom: 5,
    borderRadius: 5,
    fontWeight: "bold",
    paddingHorizontal: 25,
    fontFamily: GlobalVars.fontFamily,
    backgroundColor: GlobalVars.whiteLight,
  },

  iconstyle: {
    top: 22,
    right: 10,
    zIndex: 10,
    padding: 2,
    borderRadius: 75,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  iconstyleHeading: {
    right: 10,
    zIndex: 10,
    padding: 2,
    top: "40%",
    borderRadius: 75,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: GlobalVars.orange,
  },
});

export default Styles;
