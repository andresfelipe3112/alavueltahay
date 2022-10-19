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
    paddingTop:
      GlobalVars.windowHeight < 725
        ? GlobalVars.windowHeight / 10
        : GlobalVars.windowHeight / 8,
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
    height:"72%",
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

  viewScroll: {
    flex: 1,
    width: "100%",
  },

  contentContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },

  back: {
    top: GlobalVars.windowHeight < 725 ? "2.5%" : "5%",
    left: "10%",
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Styles;
