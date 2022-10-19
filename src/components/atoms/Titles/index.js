import * as React from "react";

import { Text } from "react-native";
import GlobalVars from "../../../global/globalVars";

import Styles from "./style";

const styles = Styles;
const TitleComponent = ({
  title,
  color,
  size,
  customStyles,
  weight = "500",
  ...props
}) => {
  if (!title || !color || !size) {
    return <></>;
  }

  let TextReturn = () => (
    <Text
      style={[
        styles.statusStyle,
        {
          color: color,
          fontSize:
            GlobalVars.windowWidth <= 375 && size > 18 ? size - 5 : size,
          fontWeight: weight,
        },
        customStyles || null,
      ]}
    >
      {title}
    </Text>
  );

  return <TextReturn />;
};

export default TitleComponent;
