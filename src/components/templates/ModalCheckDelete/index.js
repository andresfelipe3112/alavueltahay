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

const ModalCheckDelete = ({ text = "", ...props }) => {
  const { openModal, deleteUser, cancelModal } = props;

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
            <Text style={[internalstyles.text, {marginBottom:20, fontSize:18} ]}>Eliminar cuenta</Text>
            <Text style={[internalstyles.text, {fontSize:18, textAlign: "center", marginBottom: 10 }]}>
              ¿Estar segur@ que deseas eliminar tu cuenta?
            </Text>
            <Text style={[internalstyles.text, {fontSize:10, textAlign: "center", marginBottom:-30}]}>
              Todos tus datos registrados en alavueltahay será borrados, no
              podrás volver a acceder a ellos{" "}
            </Text>
          </View>
          <ButtonComponent
            text="Sí, eliminar mi cuenta"
            color={GlobalVars.orange}
            textColor={GlobalVars.white}
            customStyleBtn={{}}
            Action={() => deleteUser()}
          />
          <ButtonComponent
            text="cancelar"
            color={"white"}
            textColor={GlobalVars.orange}
            customStyleBtn={{ borderColor: GlobalVars.orange, borderWidth: 1 }}
            Action={() => cancelModal()}
          />
          {/* <TouchableOpacity
            style={{ position: "absolute", top: 15, right: 15 }}
            onPress={() => onHelp()}
          >
             <AntDesign
              name="closecircleo"
              size={24}
              color={GlobalVars.orange}
            />
          </TouchableOpacity> */}
          {/* <View style={styles.centerContent}>
            <TitleComponent
              title={'Eliminar cuenta'}
              color={GlobalVars.orange}
              size={16}
              customStyles={{ textAlign: "center" }}
            />
          </View>
          <View style={styles.centerContent}>
            <TitleComponent
              title={'Estar segur@ que deseas eliminar tu cuenta'}
              color={GlobalVars.orange}
              size={16}
              customStyles={{ textAlign: "center" }}
            />
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

export default ModalCheckDelete;

const internalstyles = StyleSheet.create({
  text: {
    color: GlobalVars.orange,
    size: 20,
  },
});
