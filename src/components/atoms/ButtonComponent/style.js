import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  buttonStyle: {
    height: 44,
    width: "100%",
    borderRadius: 7,
    marginVertical: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  btnSmall: {
    height: 38,
    width: "100%",
    borderRadius: 7,
    marginVertical: 10,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  textbtn: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: GlobalVars.fontButtons,
  },

  blueStyle: {
    color: GlobalVars.white,
    backgroundColor: GlobalVars.bluePantone,
  },

  simpleStyle: {
    borderWidth: 2,
    color: GlobalVars.bluePantone,
    backgroundColor: "transparent",
    borderColor: GlobalVars.bluePantone,
  },

  icon: {},
});

export default Styles;
