import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import useModal from "../../../utils/useModal";

import oAuth from "../../../helpers/oAuth";

import Loading from "../../atoms/Loading";
import TitleComponent from "../../atoms/Titles";
import LabelTextComponent from "../../atoms/LabelText";
import InputEntry from "../../molecules/InputEntry";
import ButtonComponent from "../../atoms/ButtonComponent";
import ModalAlert from "../ModalAlert";

import styles from "./styles";

const ModalResetPass = (props) => {
  const { openModal, onHelp } = props;

  const { isShowing: isShowingAlert, toggle: toggleAlert } = useModal();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  const validateEmail = (email) => {
    if (!email.length) return false;
    return String(email.replace(/\s/g, ""))
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateData = async () => {
    setLoading(true);
    if (!validateEmail(email)) {
      setTimeout(() => {
        setLoading(false);
        setTextAlert("Correo incorrecto");
        toggleAlert();
      }, 1500);
      return;
    }

    const res = await sendData();
    if (!res) {
      setTimeout(() => {
        setLoading(false);
        setTextAlert("Un error ha ocurrido.");
        toggleAlert();
      }, 1500);
    } else {
      setLoading(false);
      setTextAlert("Se han enviado las instrucciones a tu correo.");
      setEmail("");
      toggleAlert();
    }
  };

  const sendData = async () => {
    let data = {
      type: "2",
      email,
    };
    const res = await oAuth.RecoverPass(data);

    if (res && res?.message === "done") {
      setLoading(false);
      setTimeout(() => {
        toggleAlert();
        setTimeout(() => {
          onHelp();
        }, 500);
      }, 2500);
      return true;
    }

    setLoading(false);
    return false;
  };

  return (
    <Modal animationType="slide" transparent={true} visible={openModal}>
      <View style={styles.view}>
        <ModalAlert
          text={textAlert}
          openModal={isShowingAlert}
          onHelp={toggleAlert}
        />
        {loading && <Loading size="small" color={GlobalVars.white} />}
        {!loading && (
          <View style={styles.container}>
            <TouchableOpacity
              style={{ position: "absolute", top: 15, right: 15 }}
              onPress={onHelp}
            >
              <View style={[styles2.container]}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../../assets/x-circle-1.png")}
                />
              </View>
            </TouchableOpacity>

            <TitleComponent
              title="¿Olvidaste tu contraseña?"
              color={GlobalVars.whiteLight}
              size={20}
              weight="800"
              customStyles={{ textAlign: "center" }}
            />

            <LabelTextComponent
              size={15}
              color={GlobalVars.white}
              text="Deja abajo tu correo para crear una nueva contraseña"
            />

            <View style={styles.centerContent}>
              <InputEntry
                label="Ingrese su correo"
                textvariable={email}
                setValue={(val) => setEmail(val)}
                colorPlaceholder="rgba(255, 255, 255, 0.5)"
              />
            </View>
            {!loading ? (
              <ButtonComponent
                text="Restaurar contraseña"
                color={GlobalVars.white}
                textColor={GlobalVars.firstColor}
                customStyleBtn={{
                  width: "80%",
                  alignSelf: "center",
                }}
                Action={() => validateData()}
              />
            ) : (
              <Loading size="small" color={GlobalVars.white} />
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ModalResetPass;

const styles2 = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
  },
  stretch: {
    width: 40,
    height: 40,
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
