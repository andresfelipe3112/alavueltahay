import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  rootView: {
    width: "100%",
    marginVertical: 15,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  viewContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  stylesCarousel: {
    width: "100%",
  },

  contentCarousel: {
    paddingTop: 15,
    flexWrap: "wrap",
    flexDirection: "row",
  },

  wrapGrid: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  viewAll: {
    width: "100%",
    marginTop: 20,
    borderRadius: 30,
    borderBottomWidth: 1,
    borderBottomColor: GlobalVars.textGrayColor,
  },

  emptyView: {
    width: 0,
    height: 0,
  },

  spacingSections: {
    width: "100%",
    paddingBottom: 20,
  },
});

export default Styles;
