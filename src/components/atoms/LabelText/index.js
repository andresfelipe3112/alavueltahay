import * as React from "react";

import { Text } from "react-native";
import GlobalVars from "../../../global/globalVars";

import Styles from "./style";

const styles = Styles;
const LabelTextComponent = ({ text, color, size, noFontFamily,style, ...props }) => {
  if (!text || !color || !size) {
    return <></>;
  }

  let TextReturn = () => (
    <Text
      style={[
        styles.statusStyle,
        style,
        {
          color: color,
          fontSize:
            GlobalVars.windowWidth <= 375 && size > 18 ? size - 2 : size,
          fontWeight: "500",
        },
        noFontFamily || { fontFamily: GlobalVars.fontFamily },
        props.customStyleBtn || null,
      ]}
    >
      {text}
    </Text>
  );

  return <TextReturn />;
};

export default LabelTextComponent;
