import { StyleSheet, Platform } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  bgView: {
    flex: 1,
  },

  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },

  modalView: {
    marginTop: 0,
    width: "100%",
    alignItems: "center",
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

  container: {
    width: "100%",
    height: "100%",
  },

  wrapper: {
    height: "100%",
  },

  itemContent: {
    width: "100%",
    height: "100%",
    paddingTop: GlobalVars.windowHeight < 725 ? "15%" : "25%",
    paddingBottom: 30,
    alignItems: "center",
    position: "relative",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    justifyContent: "flex-start",
    backgroundColor: "transparent",
  },

  content: {
    width: "80%",
    height: GlobalVars.windowHeight < 725 ? "85%" : "85%",
    borderRadius: 7,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: GlobalVars.orange,
  },

  bgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  btnNext: {
    borderRadius: 5,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    width: GlobalVars.windowWidth - 80,
    backgroundColor: GlobalVars.orange,
    marginTop: 50,
  },

  shadowSet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 9,
    shadowRadius: 5.46,
    shadowOpacity: 0.32,
  },

  omitir: {
    top:
      GlobalVars.windowHeight < 725
        ? -GlobalVars.windowHeight / 200
        : GlobalVars.windowHeight / 30,
    right: "10%",
    position: "absolute",
  },

  close: {
    top: GlobalVars.windowHeight < 700 ? 7 : GlobalVars.windowHeight / 20 - 2.5,
    left: "10%",
    position: "absolute",
  },

  dotStyle: {
    width: 10,
    height: 10,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 3,
    borderRadius: 75,
    backgroundColor: GlobalVars.textGrayColor,
  },

  dotActiveStyle: {
    width: 12,
    height: 12,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 3,
    borderRadius: 75,
    backgroundColor: GlobalVars.orange,
  },

  viewScroll: {
    flex: 1,
    width: "100%",
  },

  contentContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
});

export default Styles;
