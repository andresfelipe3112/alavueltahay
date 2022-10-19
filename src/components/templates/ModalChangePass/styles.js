import { StyleSheet } from "react-native";
import GlobalVars from "../../../global/globalVars";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: 22,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  container: {
    width: "90%",
    paddingTop: 20,
    borderRadius: 4,
    borderWidth: 0.25,
    paddingBottom: 25,
    paddingHorizontal: 20,
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
    borderColor: GlobalVars.white,
    backgroundColor: GlobalVars.white,
  },

  centerContent: {
    width: "100%",
    marginVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    height: GlobalVars.windowHeight / 4,
  },
});

export default styles;
