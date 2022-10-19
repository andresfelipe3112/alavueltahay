import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height:
      GlobalVars.windowHeight < 725
        ? GlobalVars.windowHeight / 4.5
        : GlobalVars.windowHeight / 4,
    backgroundColor: GlobalVars.firstColor,
  },

  tabPanel: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionTab: {
    height: 44,
    width: "45%",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  optionTabFull: {
    height: 40,
    width: "100%",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Styles;
