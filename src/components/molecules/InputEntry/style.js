import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  rootView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    width: "100%",
  },

  inner: {
    flex: 1,
    width: "100%",
    paddingVertical: 8,
    // flexDirection: 'row',
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  textInput: {
    height: 44,
    fontSize: 17,
    marginBottom: 5,
    fontWeight: "bold",
    borderBottomWidth: 1,
    color: GlobalVars.whiteLight,
    fontFamily: GlobalVars.fontFamily,
    borderBottomColor: GlobalVars.white,
    backgroundColor: "rgba(255, 255, 255, 0)",
  },

  addStylesSpaces: {
    borderRadius: 35,
    paddingHorizontal: 25,
  },

  touchCalendar: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },

  innerCalendar: {
    flex: 1,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    alignContent: "center",
    justifyContent: "flex-start",
    borderBottomColor: GlobalVars.white,
  },

  textCalendar: {
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: GlobalVars.fontFamily,
  },

  iconstyle: {
    top: 15,
    right: 25,
    position: "absolute",
    color: GlobalVars.whiteLight,
  },

  eye: {
    top: 15,
    right: 25,
    position: "absolute",
  },
});

export default Styles;
