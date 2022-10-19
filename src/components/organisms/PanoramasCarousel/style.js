import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  rootView: {
    marginVertical: 40,
    alignItems: "center",
    marginHorizontal: 20,
    alignContent: "center",
    justifyContent: "center",
    width: GlobalVars.windowWidth - 40,
    backgroundColor: GlobalVars.whiteLight,
    borderRadius: 35,
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
    // overflow: "hidden",
  },

  viewContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerContent: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  borderBurbble: {
    width: "50%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 35,
    borderBottomRightRadius: 35,
    backgroundColor: GlobalVars.orange,
  },

  mainContent: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  optionMain: {
    width: 120,
    marginRight: 15,
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalVars.orange,
    borderRadius: 25,
  },

  stylesCarousel: {},

  contentCarousel: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 25,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  allEntrepreneurs: {
    width: 120,
    right: 20,
    top: "19%",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalVars.orange,
  },

  centeredLogo: {
    top: -65,
    right: 45,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  styleIconStore: {
    marginLeft: 5,
    marginBottom: 0,
  },
});

export default Styles;
