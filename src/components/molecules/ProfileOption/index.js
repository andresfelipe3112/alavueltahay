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
  iconOption,
  aditionalStyle,
  onPress,
  iconOptionN,
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
    ['Estadísticas']:require(`../../../../assets/estadisticas.png`),
    negocio:require(`../../../../assets/negocio.png`),
  }
  let objN ={ 
    ['intereses']:require(`../../../../assets/intereses.png`),
    ['contraseña']:require(`../../../../assets/key-1.png`),
    ['aperture']:require(`../../../../assets/foto_perfil.png`),
    ['github']:require(`../../../../assets/foto_avatar.png`),
    ['Rubro']:require(`../../../../assets/rubro.png`),
    ['Canales']:require(`../../../../assets/canales.png`),
    ['map-pin']:require(`../../../../assets/map2.png`),
    ['clock']:require(`../../../../assets/horario.png`),
    ['logo']:require(`../../../../assets/logo.png`),
    ['Portada']:require(`../../../../assets/portada.png`),
    ['dias']:require(`../../../../assets/dias.png`),
    ['Editar']:require(`../../../../assets/editar_info.png`),
    ['coffee']:require(`../../../../assets/productos.png`),
    ['clipboard']:require(`../../../../assets/visualizar_negocio.png`),
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

      {iconOptionN && (
        <View style={[styles2.containerFocus]}>
          <Image
            style={styles2.stretchFocus}
            source={objN[iconOptionN]}
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

      <View style={[styles2.container, { position: "absolute", left: 50 }]}>
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
    width: 25,
    height: 25,
    resizeMode: "stretch",
  },
  containerFocus: {
    width: 42,
    height: 42,
  },
  stretchFocus: {
    width: 30,
    height: 30,
    top:4
  },
});
