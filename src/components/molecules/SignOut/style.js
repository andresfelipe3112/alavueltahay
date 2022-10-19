import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  btn: {
    right: 25,
    width: 50,
    height: 50,
    bottom: 25,
    borderRadius: 75,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalVars.whiteLight,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },
});

export default Styles;
