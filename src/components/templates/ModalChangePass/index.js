import React, { useState, useContext } from "react";
import { Modal, View, TouchableOpacity, StyleSheet, Image } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import GlobalVars from "../../../global/globalVars";

import oAuth from "../../../helpers/oAuth";
import StoreContext from "../../../helpers/globalStates";

import useModal from "../../../utils/useModal";

import Loading from "../../atoms/Loading";
import TitleComponent from "../../atoms/Titles";
import InputEntry from "../../molecules/InputEntry";
import ButtonComponent from "../../atoms/ButtonComponent";
import ModalAlert from "../ModalAlert";

import styles from "./styles";

const ModalChangePass = (props) => {
  const { openModal, onHelp } = props;

  const { user } = useContext(StoreContext.UserContext);

  const { isShowing: isShowingAlert, toggle: toggleAlert } = useModal();

  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  const validateData = async () => {
    setLoading(true);
    if (newPass !== confirmPass) {
      setTimeout(() => {
        setLoading(false);
        setTextAlert("Claves no coinciden");
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
      setTextAlert("Contraseña actualizada.");
      setPass("");
      setNewPass("");
      setConfirmPass("");
      toggleAlert();
    }
  };

  const sendData = async () => {
    let data = {
      type: "1",
      email: user?.email,
      newPass,
      newPassConfirm: confirmPass,
      currentPass: pass,
    };
    const res = await oAuth.RecoverPass(data);

    if (res && res?.message === "done") {
      setTimeout(async () => {
        setLoading(false);
        onHelp();
      }, 1500);

      return true;
    }

    setTimeout(async () => {
      setLoading(false);
    }, 1500);
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
            <TitleComponent
              title="Cambiar contraseña"
              color={GlobalVars.firstColor}
              size={20}
              weight="800"
            />
            <View style={styles.centerContent}>
              <InputEntry
                label="Contraseña actual"
                textvariable={pass}
                setValue={(val) => setPass(val)}
                visibility
                pass
                colorTextInput={GlobalVars.thirdOrange}
                colorPlaceholder={"rgba(0, 0, 0, 0.5)"}
                customBottom={{
                  borderBottomColor: GlobalVars.thirdOrange,
                  borderBottomWidth: 0.5,
                }}
                noStylesSpaces
                noMarginH
              />
              <InputEntry
                label="Nueva contraseña"
                textvariable={newPass}
                setValue={(val) => setNewPass(val)}
                visibility
                pass
                colorTextInput={GlobalVars.thirdOrange}
                colorPlaceholder={"rgba(0, 0, 0, 0.5)"}
                customBottom={{
                  borderBottomColor: GlobalVars.thirdOrange,
                  borderBottomWidth: 0.5,
                }}
                noStylesSpaces
                noMarginH
              />
              <InputEntry
                label="Repetir nueva contraseña"
                textvariable={confirmPass}
                setValue={(val) => setConfirmPass(val)}
                visibility
                pass
                colorTextInput={GlobalVars.thirdOrange}
                colorPlaceholder={"rgba(0, 0, 0, 0.5)"}
                customBottom={{
                  borderBottomColor: GlobalVars.thirdOrange,
                  borderBottomWidth: 0.5,
                }}
                noStylesSpaces
                noMarginH
              />
            </View>
            {!loading ? (
              <ButtonComponent
                text="Cambiar contraseña"
                color={GlobalVars.firstColor}
                textColor={GlobalVars.white}
                customStyleBtn={{
                  width: "80%",
                  alignSelf: "center",
                }}
                Action={() => validateData()}
              />
            ) : (
              <Loading size="small" color={GlobalVars.white} />
            )}
               <TouchableOpacity 
              onPress={onHelp}
              style={[styles2.container,{top:15, left:15}]}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../../assets/close-orange.png")}
                />
              </TouchableOpacity>
          </View>
        )}
        
      </View>
    </Modal>
  );
};

export default ModalChangePass;

const styles2 = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    alignItems:'flex-end',
    position: 'absolute',
    top:-10
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
