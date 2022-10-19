import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import LabelTextComponent from "../../atoms/LabelText";

import styles from "./style";

const OptionTouchable = ({
  text,
  colorText,
  sizeText,
  colorIcon,
  sizeIcon,
  iconOption='negocio',
  aditionalStyle,
  onPress,
  customChevronStyle = false,
  ...props
}) => {
  if (!text || !colorText || !sizeText || !colorIcon || !sizeIcon || !onPress)
    return <></>;

  let obj ={ 
    ['user-x-1']:require(`../../../../assets/user-x-1.png`),
    ['terminos_condiciones']:require(`../../../../assets/terminos_condiciones.png`),
    ['user_white']:require(`../../../../assets/user_white.png`),
    ['negocio-2']:require(`../../../../assets/negocio-2.png`),
    ['negocio-1']:require(`../../../../assets/negocio-1.png`),
    negocio:require(`../../../../assets/negocio.png`),
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.touchableItem, aditionalStyle || null]}
    >
      {iconOption && (
        <View style={[styles2.containerFocus]}>
          <Image
            style={styles2.stretchFocus}
            source={obj[iconOption]}
          />
        </View>
      )}

      {customChevronStyle && (
        <View style={styles.paddingRight}>
          <LabelTextComponent text={text} color={colorText} size={sizeText} />
        </View>
      )}

      {!customChevronStyle && (
        <LabelTextComponent text={text} color={colorText} size={sizeText} />
      )}

      <View style={[styles2.container, { display: "absolute", left: 50 }]}>
        <Image
          style={styles2.stretch}
          source={require("../../../../assets/chevron_right_white.png")}
        />
      </View>
    </TouchableOpacity>
  );
};

export default OptionTouchable;

const styles2 = StyleSheet.create({
  container: {
    width: "100%",
    height: 30,
    position: "absolute",
    alignItems: "flex-end",
  },
  stretch: {
    width: 30,
    height: 30,
    resizeMode: "stretch",
  },
  containerFocus: {
    width: 42,
    height: 42,
  },
  stretchFocus: {
    width: 35,
    height: 35,
    top:4
  },
});
