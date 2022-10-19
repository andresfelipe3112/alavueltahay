import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const InputEntry = ({
  iconName,
  label,
  textvariable,
  pass = false,
  type = "none",
  keyboard = "default",
  maxlong = 2000,
  barBottom = false,
  colorTextInput = GlobalVars.whiteLight,
  showKeyboard = true,
  colorPlaceholder = GlobalVars.whiteLight,
  ...props
}) => {
  const [hiddenstatus, setHiddenstatus] = useState(false);

  if (props.noVisible) return <></>;
  const visibility = props.visibility ? true : null;
  const IconRender = iconName ? (
    <Image
      onPress={() => setHiddenstatus(!hiddenstatus)}
      style={styles2.container}
      source={require(".././../../../assets/mail.png")}
    />
  ) : (
    <></>
  );

  const setValue = (value) => {
    if (props.setValue) {
      props.setValue(value);
    }
  };

  const setearShowDate = () => {
    if (props.setearShowDate) {
      props.setearShowDate();
    }
  };

  let iconeye = null;
  if (visibility) {
    iconeye = hiddenstatus ? (
      <TouchableOpacity
        style={styles2.container}
        onPress={() => setHiddenstatus(!hiddenstatus)}
      >
        <Image
          style={styles2.stretch}
          source={require(".././../../../assets/eye.png")}
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles2.container}
        onPress={() => setHiddenstatus(!hiddenstatus)}
      >
        <Image
          onPress={() => setHiddenstatus(!hiddenstatus)}
          style={styles2.stretch}
          source={require(".././../../../assets/eye_off.png")}
        />
      </TouchableOpacity>
    );
  }

  if (props.isInputTouchDate) {
    return (
      <View style={styles.rootView}>
        <TouchableOpacity
          style={styles.touchCalendar}
          onPress={() => setearShowDate()}
        >
          <View style={styles.inner}>
            {IconRender}
            <View style={styles.innerCalendar}>
              <Text
                style={[
                  styles.textCalendar,
                  {
                    color: !textvariable
                      ? GlobalVars.white
                      : GlobalVars.whiteLight,
                  },
                ]}
              >
                {textvariable || label}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.rootView,
        {
          borderBottomColor: barBottom ? GlobalVars.white : null,
          borderBottomWidth: barBottom ? 1 : 0,
        },
        props.customBottom || null,
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ width: "100%" }}
        >
          <View style={styles.inner}>
            {IconRender}
            {!hiddenstatus && pass ? (
              <TextInput
                placeholder={label}
                placeholderTextColor={colorPlaceholder}
                style={[
                  styles.textInput,
                  {
                    color: colorTextInput,
                    width: props.noMarginH ? "100%" : "90%",
                  },
                  props.noStylesSpaces ? null : styles.addStylesSpaces,
                ]}
                onChangeText={(text) => setValue(text)}
                value={textvariable}
                secureTextEntry={true}
                keyboardType={keyboard}
                textContentType={type}
                maxLength={maxlong}
              />
            ) : (
              <TextInput
                placeholder={label}
                placeholderTextColor={colorPlaceholder}
                style={[
                  styles.textInput,
                  {
                    color: colorTextInput,
                    width: props.noMarginH ? "100%" : "90%",
                  },
                  props.noStylesSpaces ? null : styles.addStylesSpaces,
                ]}
                onChangeText={(text) => setValue(text)}
                value={textvariable}
                secureTextEntry={false}
                keyboardType={keyboard}
                textContentType={type}
                maxLength={maxlong}
                showSoftInputOnFocus={showKeyboard}
              />
            )}
            {iconeye}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default InputEntry;

const styles2 = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 10,
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
