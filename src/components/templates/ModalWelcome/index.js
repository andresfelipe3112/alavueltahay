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
        <View style={styles.container}>
          {/* <TouchableOpacity
            style={{ position: "absolute", top: 15, right: 15 }}
            onPress={onHelp}
          >
            <AntDesign name="closecircleo" size={24} color={GlobalVars.white} />
          </TouchableOpacity> */}

          <ImageLocalComponent
            img={require("../../../../assets/images/alvh_logo.png")}
            width={GlobalVars.windowWidth - 40}
            height={GlobalVars.windowHeight / 1.7}
            mode="contain"
          />

          <View style={styles.centerContent}>
            {/* <View
              style={{
                width: GlobalVars.windowWidth / 1.5,
                height: 44,
                backgroundColor: GlobalVars.white,
                marginBottom: 40,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 8,
                borderRadius: 7,
              }}
            >
              <LabelTextComponent
                size={15}
                text={textBtn}
                color={GlobalVars.firstColor}
              />
            </View> */}
            <TitleComponent
              title={text}
              color={GlobalVars.firstColor}
              size={18}
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

export default ModalWelcome;
