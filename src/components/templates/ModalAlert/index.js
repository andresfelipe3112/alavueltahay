import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Alert } from "react-native";

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
          >
            <AntDesign
              name="closecircleo"
              size={24}
              color={GlobalVars.orange}
            />
          </TouchableOpacity>
          <View style={styles.centerContent}>
            <TitleComponent
              title={text}
              color={GlobalVars.orange}
              size={23}
              customStyles={{ textAlign: "center" }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlert;