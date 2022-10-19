import React, { useEffect } from "react";
import { Modal, View, TouchableOpacity, Alert } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import TitleComponent from "../../atoms/Titles";
import ImageLocalComponent from "../../atoms/ImageLocalComponent";

import styles from "./styles";
import LabelTextComponent from "../../atoms/LabelText";

const ModalFinish = ({ text = "", ...props }) => {
  const { openModal, onHelp } = props;

  useEffect(() => {
    setTimeout(() => {
      onHelp();
    }, 6000);
  }, []);

  return (
    <Modal animationType="slide" transparent={true} visible={openModal}>
      <View style={styles.view}>
        <View style={styles.container}>
          {/* <TouchableOpacity
            style={{ position: "absolute", top: 15, right: 15 }}
            onPress={onHelp}
          >
            <AntDesign name="closecircleo" size={24} color={GlobalVars.white} />
          </TouchableOpacity> */}

          <ImageLocalComponent
            img={require("../../../../assets/adaptive-icon.png")}
            width={GlobalVars.windowWidth - 40}
            height={GlobalVars.windowHeight / 4}
            mode="contain"
          />

          <View style={styles.centerContent}>
            <TitleComponent
              title={"¡Muy bien!"}
              color={GlobalVars.firstColor}
              size={40}
              customStyles={{ textAlign: "center" }}
            />
            <TitleComponent
              title={text}
              color={"rgba(0, 0, 0, 0.5)"}
              size={20}
              customStyles={{ textAlign: "center" }}
            />
          </View>

          {/* <View style={styles.imgFloat}>
            <ImageLocalComponent
              radius={5}
              mode="contain"
              width={GlobalVars.windowWidth / 3}
              height={GlobalVars.windowWidth / 3}
              img={require("../../../../assets/images/full_logo_white.png")}
            />
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

export default ModalFinish;
