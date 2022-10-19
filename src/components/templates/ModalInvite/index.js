import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Alert,
  Text,
  StyleSheet,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import TitleComponent from "../../atoms/Titles";

import styles from "./styles";
import ButtonComponent from "../../atoms/ButtonComponent";
import Storage from "../../../helpers/localStorage";
import { useNavigation } from "@react-navigation/native";

const ModalInvite = ({ text = "", ...props }) => {
  const { openModal, deleteUser,goBack, cancelModal } = props;
  const navigation = useNavigation();

  const crear = () => {
    Storage.clearAll()
    cancelModal()
    navigation.navigate("Initial") 
  }

  return (
    <Modal animationType="slide" transparent={true} visible={openModal}>
      <View style={styles.view}>
        <View style={styles.container}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              top: -40,
            }}
          >
            <Text style={[internalstyles.text, {fontSize:14, textAlign: "center", marginBottom:-30}]}>
             {text}
            </Text>
          </View>
          <ButtonComponent
            text="Crear mi cuenta de usuario"
            color={GlobalVars.orange}
            textColor={GlobalVars.white}
            customStyleBtn={{}}
            Action={() => crear()}
          />
          <ButtonComponent
            text="Cancelar"
            color={"white"}
            textColor={GlobalVars.orange}
            customStyleBtn={{ borderColor: GlobalVars.orange, borderWidth: 1 }}
            Action={() => goBack !== undefined && goBack !== null ? goBack(): cancelModal()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalInvite;

const internalstyles = StyleSheet.create({
  text: {
    color: GlobalVars.orange,
    size: 20,
  },
});
