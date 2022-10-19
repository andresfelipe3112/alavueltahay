import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  rootView: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginVertical: 15,
    borderBottomColor: GlobalVars.fondoPrincipal,
    borderBottomWidth: 2,
  },

  viewContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  stylesCarousel: {
    width: "100%",
  },

  contentCarousel: {
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

export default Styles;
