import { StyleSheet } from "react-native";

import GlobalVars from "../../global/globalVars";

export const Styles = StyleSheet.create({});

export const MyTheme = {
  dark: false,
  colors: {
    card: "transparent",
    border: "transparent",
    primary: GlobalVars.firstColor,
    background: GlobalVars.fondoPrincipal,
    notification: "transparent",
    text: GlobalVars.white,
  },
};
