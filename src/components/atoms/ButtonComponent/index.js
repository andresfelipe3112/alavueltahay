import * as React from "react";

import { TouchableOpacity, Text } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import Styles from "./style";

const styles = Styles;
const ButtonComponent = ({ text, color, textColor, ...props }) => {
  const clickThisButton = () => {
    if (props.Action) {
      props.Action();
    }
  };

  if (!text) {
    return <></>;
  }

  const iconBtn =
    props.iconName && props.iconName !== "" ? (
      <AntDesign
        name={props.iconName}
        size={20}
        color={color ? textColor : GlobalVars.white}
        style={[styles.icon, { position: "absolute", right: 20 }]}
      />
    ) : (
      <></>
    );
  const iconLeft =
    props.iconLeft && props.iconLeft !== "" ? (
      <AntDesign
        name={props.iconLeft}
        size={20}
        color={color ? textColor : GlobalVars.white}
        style={[styles.icon, { position: "absolute", left: 60 }]}
      />
    ) : (
      <></>
    );

  let ButtonReturn = () =>
    props.isSmall ? (
      <TouchableOpacity
        style={[
          styles.btnSmall,
          { backgroundColor: color || GlobalVars.firstColor },
          props.customStyleBtn || null,
        ]}
        onPress={() => clickThisButton()}
      >
        {iconLeft}
        <Text
          style={[
            styles.textbtn,
            {
              color: textColor || GlobalVars.white,
              marginLeft: props.iconLeft ? 30 : null,
            },
          ]}
        >
          {text}
        </Text>
        {iconBtn}
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          { backgroundColor: color || GlobalVars.firstColor },
          props.customStyleBtn || null,
        ]}
        onPress={() => clickThisButton()}
      >
        {iconLeft}
        <Text
          style={[
            styles.textbtn,
            {
              color: textColor || GlobalVars.white,
              marginLeft: props.iconLeft ? 30 : null,
            },
          ]}
        >
          {text}
        </Text>
        {iconBtn}
      </TouchableOpacity>
    );

  return <ButtonReturn />;
};

export default ButtonComponent;
