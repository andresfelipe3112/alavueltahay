import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
  Image,
  StyleSheet,
} from "react-native";

import { Feather } from "@expo/vector-icons";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const InputSearch = ({
  iconName,
  label,
  textvariable,
  type = "none",
  keyboard = "default",
  maxlong = 2000,
  isHeadingPosition = false,
  ...props
}) => {
  const setValue = (value) => {
    if (props.setValue) {
      props.setValue(value);
    }
  };

  const IconRender = iconName ? (
    textvariable?.length ? (
      <TouchableOpacity
        style={!isHeadingPosition ? styles.iconstyle : styles.iconstyleHeading}
        onPress={() => setValue("")}
      >
        <View style={[styles2.container, {top:-8}]}>
              <Image
                style={styles2.stretch}
                source={require("../../../../assets/search.png")}
              />
            </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={!isHeadingPosition ? styles.iconstyle : styles.iconstyleHeading}
      >
        <View style={styles2.container}>
              <Image
                style={styles2.stretch}
                source={require("../../../../assets/search_white.png")}
              />
            </View>
      </TouchableOpacity>
    )
  ) : (
    <></>
  );

  return (
    <View style={styles.rootView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            {IconRender}
            {!isHeadingPosition && (
              <TextInput
                placeholder={label}
                style={[
                  styles.textInput,
                  {
                    backgroundColor: props.bgBlue
                      ? GlobalVars.blueOpaque
                      : "rgba(255, 255, 255, 0.35)",
                    color: props.colorCustom || GlobalVars.white,
                  },
                ]}
                onChangeText={(text) => setValue(text)}
                value={textvariable}
                secureTextEntry={false}
                keyboardType={keyboard}
                textContentType={type}
                maxLength={maxlong}
                placeholderTextColor={
                  props.bgBlue
                    ? "rgba(255, 255, 255, 0.6)"
                    : GlobalVars.blueOpaque
                }
              />
            )}
            {isHeadingPosition && (
              <TextInput
                placeholder={label}
                style={[
                  styles.textInputHeading,
                  {
                    color: props.colorCustom || GlobalVars.blueOpaque,
                  },
                ]}
                onChangeText={(text) => setValue(text)}
                value={textvariable}
                secureTextEntry={false}
                keyboardType={keyboard}
                textContentType={type}
                maxLength={maxlong}
                placeholderTextColor={"rgba(0, 113, 188, 0.3)"}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default InputSearch;

const styles2 = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    top:-10
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
    width: 42,
    height: 42,
  },
});
