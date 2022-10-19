import { StyleSheet, Platform } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    width: "100%",
    marginTop: 20,
    paddingVertical: 15,
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: GlobalVars.whiteLight,
    height: Platform.OS === "ios" ? "92%" : "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },

  closeElement: {
    width: 40,
    height: 40,
    // borderWidth: 2,
    display:"flex",
    // borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: GlobalVars.firstColor,
  },

  viewInput: {
    height: 100,
    width: "100%",
    marginTop: 20,
    borderRadius: 7,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },

  stylesResult: {
    width: "100%",
  },

  contentResult: {
    paddingTop: 25,
    flexWrap: "wrap",
    paddingBottom: 50,
    flexDirection: "row",
    paddingHorizontal: 10,
  },

  centeredSpinner: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  containerResultSet: {
    width: "100%",
  },

  spacing: {
    width: "100%",
    marginBottom: 20,
  },
});

export default Styles;
