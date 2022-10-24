import React, { useEffect } from "react";
import { Modal, View, TouchableOpacity, Alert } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import TitleComponent from "../../atoms/Titles";
import ImageLocalComponent from "../../atoms/ImageLocalComponent";

import styles from "./styles";
import LabelTextComponent from "../../atoms/LabelText";

const ModalWelcome = ({ text = "", textBtn = "Buscando...", ...props }) => {
  const { openModal, onHelp } = props;

  useEffect(() => {
    setTimeout(() => {
      onHelp();
    }, 6000);
  }, []);

  return (
    <Modal animationType="slide" transparent={true} visible={openModal}>
      <View style={styles.view}>
        <View style={[styles.container]}>
         <View
         style={{alignSelf: "center"}}
         >
          <ImageLocalComponent
            img={require("../../../../assets/images/alvh_logo.png")}
            width={GlobalVars.windowWidth - 40}
            height={GlobalVars.windowHeight / 1.7}
            mode="contain"
            />
          </View>

          <View style={styles.centerContent}>
            <TitleComponent
              title={text}
              color={GlobalVars.firstColor}
              size={18}
              customStyles={{ textAlign: "center" }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalWelcome;
