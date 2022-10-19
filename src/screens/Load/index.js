import React from "react";

import { View } from "react-native";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import ImageLocalComponent from "../../components/atoms/ImageLocalComponent";

/** Styles */
import Styles from "./style";

const styles = Styles;
const LoadScreen = ({ navigation }) => {
  return (
    <View style={styles.viewRoot}>
      <StatusBarComponent />
      <ImageLocalComponent
        img={require("../../../assets/images/full_logo.png")}
        width={GlobalVars.windowWidth - 75}
        height={200}
      />
    </View>
  );
};

export default LoadScreen;
