import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  rootView: {
    alignItems: "center",
    marginHorizontal: 20,
    alignContent: "center",
    justifyContent: "center",
    width: GlobalVars.windowWidth - 40,
  },

  viewContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerContent: {
    width: "100%",
    paddingHorizontal: 0,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  contentRedesign: {
    width: "100%",
    borderRadius: 35,
    paddingBottom: 20,
    marginVertical: 40,
    backgroundColor: GlobalVars.whiteLight,
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

  mainContent: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  featuredStyle: {
    height: 70,
    width: "50%",
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 35,
    borderBottomRightRadius: 35,
    backgroundColor: GlobalVars.firstColor,
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
    right: 20,
    height: 100,
    position: "absolute",
    alignContent: "center",
    justifyContent: "center",
  },

  centeredLogo: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonSearchShops: {
    width: 140,
    borderRadius: 15,
    paddingVertical: 5,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: GlobalVars.firstColor,
  },

  styleIconStore: {
    marginLeft: 5,
  },
});

export default Styles;
