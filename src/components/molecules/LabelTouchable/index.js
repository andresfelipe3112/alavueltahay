import React from "react";
import { TouchableOpacity } from "react-native";

import GlobalVars from "../../../global/globalVars";

import LabelTextComponent from "../../atoms/LabelText";

import styles from "./styles";

const LabelTouchable = ({
  label,
  color,
  sizeText,
  aditionalStyle,
  customStyleTxt,
  onPress,
  ...props
}) => {
  if (!label || !color || !sizeText || !onPress) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, aditionalStyle || null]}
    >
      <LabelTextComponent
        text={label}
        color={color}
        size={sizeText}
        customStyleBtn={customStyleTxt}
      />
    </TouchableOpacity>
  );
};

export default LabelTouchable;
