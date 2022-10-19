import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const styles = StyleSheet.create({
  touchableItem: {
    width: "100%",
    // paddingLeft: 20,
    paddingRight: 50,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 0.5,
    justifyContent: "flex-start",
    borderBottomColor: GlobalVars.whiteLight,
  },

  iconstyle: {
    right: 20,
    position: "absolute",
  },

  iconOptionStyle: {
    marginRight: 20,
  },

  paddingRight: {
    width: "100%",
    paddingRight: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

export default styles;
