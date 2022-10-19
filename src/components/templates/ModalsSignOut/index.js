import * as React from "react";

import { View, Modal } from "react-native";

import GlobalVars from "../../../global/globalVars";

/** Import Custom elements */
import TitleComponent from "../../atoms/Titles";
import ButtonComponent from "../../atoms/ButtonComponent";
import ImageLocalComponent from "../../atoms/ImageLocalComponent";

import Styles from "./style";

const styles = Styles;

const ModalsSignOut = ({ navigation, visible = true, Action }) => {
  const closeAppSignal = (res) => {
    if (Action) {
      Action(res);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        null;
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Salir App */}
          <ImageLocalComponent
            img={require("../../../../assets/images/full_logo.png")}
            width={GlobalVars.windowWidth / 4.5}
            height={GlobalVars.windowHeight / 4.5}
          />
          <TitleComponent
            title="¿Deseas salir de la App?"
            color={GlobalVars.black}
            size={15}
            weight="500"
          />
          <ButtonComponent
            text="Sí"
            color={GlobalVars.orange}
            textColor={GlobalVars.white}
            customStyleBtn={{}}
            Action={() => closeAppSignal(true)}
          />
          <ButtonComponent
            text="No"
            color={GlobalVars.orange}
            textColor={GlobalVars.white}
            customStyleBtn={{}}
            Action={() => closeAppSignal(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalsSignOut;
