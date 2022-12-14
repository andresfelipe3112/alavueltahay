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
    height: GlobalVars.windowHeight,
  },

  wrapper: {
    height: "100%",
  },

  itemContent: {
    width: "100%",
    height: "100%",
    paddingTop:
      GlobalVars.windowHeight < 761
        ? "30%"
        : GlobalVars.windowHeight < 800
        ? "30%"
        : GlobalVars.windowHeight < 900
        ? "25%"
        : "25%",
    paddingBottom: 20,
    alignItems: "center",
    position: "relative",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    justifyContent: "flex-start",
    backgroundColor: "transparent",
  },

  content: {
    width: "80%",
    paddingTop: 20,
    borderRadius: 7,
    paddingBottom: 5,
    overflow: "hidden",
    alignItems: "center",
    paddingHorizontal: 5,
    justifyContent: "flex-start",
    height:
      GlobalVars.windowHeight < 761
        ? "75%"
        : GlobalVars.windowHeight < 800
        ? "84%"
        : GlobalVars.windowHeight < 900
        ? "80%"
        : "80%",
    backgroundColor: GlobalVars.firstColor,
  },

  bgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  btnWrapperStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    // backgroundColor: "black",
    // transform: [{ translateY: GlobalVars.windowHeight / 1.4 }],
    // position: "relative",
    top:
      GlobalVars.windowHeight < 761
        ? GlobalVars.windowHeight / 1.19
        : GlobalVars.windowHeight < 700
        ? GlobalVars.windowHeight / 1.19
        : GlobalVars.windowHeight < 800
        ? GlobalVars.windowHeight / 1.125
        : GlobalVars.windowHeight < 900
        ? GlobalVars.windowHeight / 1.2
        : GlobalVars.windowHeight / 1.2,
    height: 110,
    padding: 0,
  },

  btnNext: {
    borderRadius: 5,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    width: GlobalVars.windowWidth - 70,
    backgroundColor: GlobalVars.orange,
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

  collection: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  viewScroll: {
    flex: 1,
    width: "100%",
  },

  contentContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },

  markScroll: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: GlobalVars.white,
  },

  checkGroupBoxView: {
    width: "100%",
  },

  checBoxView: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: GlobalVars.white,
  },

  gridAvatars: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  avatarView: {
    width: "30%",
    borderRadius: 4,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  back: {
    top:
      GlobalVars.windowHeight < 761
        ? "6%"
        : GlobalVars.windowHeight < 800
        ? "8%"
        : GlobalVars.windowHeight < 900
        ? "5%"
        : "10%",
    left: "10%",
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  iconBack: {
    marginRight: 10,
  },

  dotStyle: {
    width: 20,
    height: 20,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 3,
    borderRadius: 75,
    backgroundColor: GlobalVars.orange,
  },

  dotActiveStyle: {
    width: 20,
    height: 20,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 3,
    borderRadius: 75,
    backgroundColor: GlobalVars.white,
  },

  mb20: {
    width: "100%",
    height: 20,
  },
});

export default Styles;
