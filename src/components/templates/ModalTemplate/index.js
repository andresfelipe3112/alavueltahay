import React from "react";
import { Modal, View, TouchableOpacity } from "react-native";

import { Modal as ModalNB } from "native-base";

import styles from "./styles";

const ModalTemplate = ({
  children,
  aditionalStyleModal,
  aditionalStyleContainer,
  isModalNB = false,
  ...props
}) => {
  const { openModal, onHelp } = props;

  if (isModalNB) {
    return (
      <ModalNB isOpen={openModal} onClose={() => onHelp}>
        <TouchableOpacity
          style={[styles.view, aditionalStyleModal || null]}
          activeOpacity={1}
          onPressOut={() => {
            onHelp();
          }}
        >
          <View style={[styles.container, aditionalStyleContainer || null]}>
            {children}
          </View>
        </TouchableOpacity>
      </ModalNB>
    );
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openModal}
      onRequestClose={onHelp}
    >
      <TouchableOpacity
        style={[styles.view, aditionalStyleModal || null]}
        activeOpacity={1}
        onPressOut={() => {
          onHelp();
        }}
      >
        <View style={[styles.container, aditionalStyleContainer || null]}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalTemplate;
