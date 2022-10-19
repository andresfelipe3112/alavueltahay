import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  container: {
    width: "45%",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
  },

  touchWrap: {
    width: "100%",
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: GlobalVars.whiteLight,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  content: {
    width: "100%",
    marginVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  colVal: {
    width: "100%",
    marginBottom: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  btnItem: {
    bottom: 5,
    width: "80%",
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: GlobalVars.firstColor,
  },
});

export default Styles;
