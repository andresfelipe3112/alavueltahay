import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const styles = StyleSheet.create({
  touchableItem: {
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 50,
    borderBottomWidth: 0.5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "flex-start",
    borderBottomColor: GlobalVars.firstColor,
  },

  iconstyle: {
    right: 20,
    position: "absolute",
  },

  iconOptionStyle: {
    marginRight: 20,
    position: "absolute",
  },
});

export default styles;
