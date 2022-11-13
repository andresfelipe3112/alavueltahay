import React, { useState, useEffect } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";

export const Cancel = () => {
return(
    <View style={styles2.container}>
    <Image
      style={styles2.stretch}
      source={require("../../../assets/close-orange.png")}
    />
  </View>

)
}

const styles2 = StyleSheet.create({
    container: {
      width: 40,
      height: 40,
      top: Platform.OS === 'ios' ? -10 : -17
    },
    stretch: {
      width: 40,
      height: 40,
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