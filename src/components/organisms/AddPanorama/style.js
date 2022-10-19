import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  view: {
    paddingTop: 12,
    borderRadius: 7,
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 5,
    justifyContent: "flex-start",
    backgroundColor: GlobalVars.white,
    width: GlobalVars.windowWidth - 10,
    minHeight: GlobalVars.windowHeight / 1.2,
  },

  containerScroll: {
    width: "100%",
    height:
      GlobalVars.windowHeight > 300
        ? GlobalVars.windowHeight / 1.4
        : GlobalVars.windowHeight - 100,
    zIndex: 99999,
  },

  scrolling: {
    width: "100%",
    backgroundColor: "transparent",
  },

  wrapScrollView: {
    marginTop: 10,
    paddingBottom: 100,
    paddingHorizontal: 10,
  },

  categoryShop: {
    height: 100,
    width: GlobalVars.windowWidth / 4,
    borderRadius: 4,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  unityView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  setBoxes: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  optionBox: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 75,
    backgroundColor: GlobalVars.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.84,
    elevation: 5,
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 10,
  },

  textUnity: {
    fontSize: 13,
    marginRight: 10,
    color: GlobalVars.textGrayColor,
    fontFamily: GlobalVars.fontFamily,
  },

  inputQty: {
    width: "100%",
    fontSize: 15,
    borderRadius: 7,
    borderWidth: 0.5,
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontFamily: GlobalVars.fontFamily,
    borderColor: GlobalVars.textGrayColor,
  },

  inputPrice: {
    width: "50%",
    fontSize: 15,
    borderRadius: 7,
    borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontFamily: GlobalVars.fontFamily,
    borderColor: GlobalVars.textGrayColor,
  },

  inputDescription: {
    width: "100%",
    fontSize: 15,
    borderRadius: 7,
    borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontFamily: GlobalVars.fontFamily,
    borderColor: GlobalVars.textGrayColor,
  },

  boxDelivery: {
    width: "100%",
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  rowHour: {
    height: 50,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
  },

  mapContainer: {
    width: "100%",
    height: GlobalVars.windowHeight / 3,
    borderRadius: 7,
    overflow: "hidden",
  },

  columnSeparator: {
    width: 20,
    height: "100%",
  },

  socialView: {
    width: "100%",
    marginTop: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: GlobalVars.textGrayColor,
  },

  datePicker: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: GlobalVars.windowHeight / 6,
  },

  closeIcon: {
    position: "absolute",
    right: 25,
    top: 25,
  },
});

export default Styles;
