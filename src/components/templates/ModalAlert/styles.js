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
    paddingTop: 80,
    borderRadius: 4,
    paddingBottom: 25,
    borderWidth: 0.25,
    paddingHorizontal: 15,
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
  },
});

export default styles;
