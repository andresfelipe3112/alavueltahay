import { StyleSheet } from "react-native";
import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  bgView: {
    flex: 1,
  },

  viewRoot: {
    width: "100%",
    height: "100%",
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  collection: {
    width: "100%",
    // height: 125,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },

  floatInput: {
    height: 50,
    width: "100%",
    borderRadius: 7,
    marginBottom: 20,
    backgroundColor: GlobalVars.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 9,
    shadowRadius: 5.46,
    shadowOpacity: 0.32,
  },
});

export default Styles;
