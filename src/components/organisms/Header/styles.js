import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const styles = StyleSheet.create({
  viewRoot: {
    zIndex: 1,
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: GlobalVars.blueOpaque,
  },

  headerTopBlock: {
    zIndex: 2,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
    maxHeight: GlobalVars.windowHeight / 10,
    // backgroundColor: "green",
  },

  locationIcon: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
  },

  searchBar: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  userIcon: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },

  headerStickyBlock: {
    width: "100%",
    textAlign: "center",
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: GlobalVars.firstColor,
  },

  userInfo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: "transparent",
    paddingBottom:10
    // backgroundColor: "black",
  },

  inputSearch: {
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: GlobalVars.white,
  },
});

export default styles;
