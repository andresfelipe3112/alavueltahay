import * as React from "react";

import { StatusBar, Platform } from "react-native";

import GlobalVars from "../../../global/globalVars";

const StatusBarComponent = ({
  color = Platform.OS === "android" ? GlobalVars.firstColor : GlobalVars.black,
  styleBar = Platform.OS === "android" ? "light-content" : "dark-content",
  statusTransition = "fade",
  hidden = false,
}) => {
  return (
    <StatusBar
      animated={true}
      barStyle={styleBar}
      showHideTransition={statusTransition}
      hidden={hidden}
      backgroundColor={color}
    />
  );
};

export default StatusBarComponent;
