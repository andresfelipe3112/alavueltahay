import { StyleSheet } from "react-native";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  viewRoot: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalVars.whiteLight,
  },

  viewContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalVars.whiteLight,
  },

  scrollView: {
    width: "100%",
    backgroundColor: "transparent",
  },

  contentContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
    paddingHorizontal: 20,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default Styles;
