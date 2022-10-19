import { StyleSheet, Platform } from "react-native";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  viewOptions: {
    backgroundColor: "transparent",
    padding: Platform.OS === "ios" ? 0 : 0,
    borderRadius: Platform.OS === "ios" ? 0 : 0,
    marginBottom: Platform.OS === "ios" ? 0 : 5,
  },

  viewContent: {
    backgroundColor: "transparent",
    padding: Platform.OS === "ios" ? 0 : 0,
    borderRadius: Platform.OS === "ios" ? 0 : 0,
  },
  tabBarStyle: {
    backgroundColor: GlobalVars.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

export default Styles;
