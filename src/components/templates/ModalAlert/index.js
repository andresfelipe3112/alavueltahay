import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import TitleComponent from "../../atoms/Titles";

import styles from "./styles";

const ModalAlert = ({ text = "", ...props }) => {
  const { openModal, onHelp } = props;

  return (
    <Modal animationType="slide" transparent={true} visible={openModal}>
      <View style={styles.view}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 15, right: 15 }}
            onPress={() => onHelp()}
          ><View style={styles2.container}>
          <Image
            style={styles2.stretch}
            source={require("../../../../assets/close-orange.png")}
          />
        </View>

          </TouchableOpacity>
          <View style={styles.centerContent}>
            <TitleComponent
              title={text}
              color={GlobalVars.orange}
              size={23}
              customStyles={{ textAlign: "center", top:-15 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlert;

const styles2 = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
  },
  stretch: {
    width: 35,
    height: 35,
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

