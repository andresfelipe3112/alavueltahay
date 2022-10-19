import { StyleSheet } from "react-native";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  bgView: {
    flex: 1,
  },

  scrolling: {
    width: "100%",
    backgroundColor: "transparent",
  },

  wrapScrollView: {
    marginTop: 50,
    paddingBottom: 100,
  },

  viewContainer: {
    borderRadius: 7,
    paddingVertical: 20,
    marginHorizontal: 0,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    width: GlobalVars.windowWidth - 40,
    backgroundColor: GlobalVars.blueOpaque,
    // height:
    //   GlobalVars.windowHeight > 350 ? GlobalVars.windowHeight / 1.8 : "100%",
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

  tagProfile: {
    width: "100%",
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  subray: {
    height: 2,
    width: "40%",
    borderRadius: 30,
    backgroundColor: GlobalVars.whiteLight,
  },

  spinner: {
    marginVertical: 30,
  },

  infoUser: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  customLabel: {
    marginBottom: 0,
    marginHorizontal: 0,
  },

  saveBtn: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 30,
  },

  optionTouch: {
    width: "80%",
    marginTop: 30,
    alignSelf: "center",
  },

  boxDelivery: {
    width: "100%",
    marginVertical: 20,
    paddingHorizontal: 30,
    alignItems: "flex-start",
    justifyContent: "center",
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
    color: GlobalVars.white,
    fontFamily: GlobalVars.fontFamily,
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
    borderBottomColor: GlobalVars.white,
  },

  datePicker: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: GlobalVars.windowHeight / 6,
  },

  optionTouch: {
    width: "100%",
    marginTop: 30,
    alignSelf: "center",
  },

  optionDelet: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: GlobalVars.white,
  },
});

export default Styles;
