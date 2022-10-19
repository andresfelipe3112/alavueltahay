import * as React from "react";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Entypo } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import Styles from "./style";

const styles = Styles;

const ReturnButton = ({
  color = "orange",
  size = 30,
  aditionalStyle,
  navigation,
}) => {
  const onPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      style={[styles.retrobtn, aditionalStyle || null]}
      onPress={onPress}
    >
      {/* <Entypo name="chevron-left" size={size} color={color} /> */}
      {color === "orange" ? (
        <View style={styles2.container}>
          <Image
            style={styles2.stretch}
            source={require(".././../../../assets/chevron_left.png")}
          />
        </View>
      ) : (
        <View style={styles2.container}>
        <Image
          style={styles2.stretch}
          source={require(".././../../../assets/chevron_left_white.png")}
        />
         </View>
      )}
    </TouchableOpacity>
  );
};

export default ReturnButton;

const styles2 = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    top:-9,
    left:-4
  },
  stretch: {
    width: 55,
    height: 55,
    resizeMode: "stretch",
  },
  containerFocus: {
    width: 42,
    height: 42,
  },
  stretchFocus: {
    width: 42,
    height: 42,
  },
});
