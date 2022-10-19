import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Feather, MaterialIcons } from "@expo/vector-icons";

import styles from "./style";

const IconTouchable = ({
  name,
  color,
  size,
  aditionalStyle,
  onPress,
  family,
  open,
  ...props
}) => {
  if (open !== 'close') {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.touchableItem,
            { width: size + 5, height: size + 5 },
            aditionalStyle || null,
          ]}
        >
         <View style={styles2.container}>
            <Image
              style={styles2.stretch}
              source={require(".././../../../assets/chevron_up_white.png")}
            />
          </View>
        </TouchableOpacity>)
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.touchableItem,
          { width: size + 5, height: size + 5 },
          aditionalStyle || null,
        ]}
      >
       <View style={styles2.container}>
          <Image
            style={styles2.stretch}
            source={require(".././../../../assets/chevron_down_white.png")}
          />
        </View>
      </TouchableOpacity>)
  }
}


export default IconTouchable;

const styles2 = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
  },
  stretch: {
    width: 45,
    height: 45,
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
