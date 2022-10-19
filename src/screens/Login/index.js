import React, { useState, useContext, useCallback } from "react";

import {
  View,
  ActivityIndicator,
  BackHandler,
  ImageBackground,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Utils */
// import { useKeyboard } from "../../utils/useKeyboard";
import useModal from "../../utils/useModal";
import useAuth from "../../utils/useAuth";

/** Import Stores */
import StoreContext from "../../helpers/globalStates";

/** Import components */
import TitleComponent from "../../components/atoms/Titles";
import ReturnButton from "../../components/atoms/ReturnButton";
import StatusBarComponent from "../../components/atoms/StatusBar";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import ImageLocalComponent from "../../components/atoms/ImageLocalComponent";
import InputEntry from "../../components/molecules/InputEntry";
import LabelTouchable from "../../components/molecules/LabelTouchable";
import ModalAlert from "../../components/templates/ModalAlert";
import ModalResetPass from "../../components/templates/ModalRestorePass";

/** Styles */
import Styles from "./style";

const styles = Styles;

const LabelTouchInvoke = (label, size, color, aditionalStyle, onEvent) => {
  return (
    <LabelTouchable
      color={color}
      label={label}
      sizeText={size}
      aditionalStyle={aditionalStyle}
      onPress={onEvent}
    />
  );
};

const LoginScreen = ({ navigation }) => {
  // const isOpenKeyboard = useKeyboard();
  const isOpenKeyboard = true;

  const { isShowing: showModalRecoverPass, toggle: toggleModalRecoverPass } =
    useModal();

  const { setUser } = useContext(StoreContext.UserContext);
  const { _setJwt } = useContext(StoreContext.SecurityContext);

  const [mail, setMail] = useState("");
  const [password, setPass] = useState("");

  const [loading, setLoading] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [isShowingAlert, setShowhingAlert] = useState(false);

  useFocusEffect(
    useCallback(() => {
      /** Android close App */
      const backAction = () => {
        navigation.goBack();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [])
  );

  const validateEmail = (email) => {
    if (!email.length) return false;
    const lowerMail = email.toLowerCase().trim();
    const res = lowerMail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return res;
  };

  const validatePass = (pass) => {
    if (pass.length < 5) return false;

    return true;
    // return (
    //   /[A-Z]/.test(pass) &&
    //   /[a-z]/.test(pass) &&
    //   /[0-9]/.test(pass) &&
    //   /[^A-Za-z0-9]/.test(pass)
    // );
  };

  const LogInProcess = async () => {
    setLoading(true);
    try {
      if (validateEmail(mail) && validatePass(password)) {
        const res = await useAuth.LogInUser(
          mail.toLowerCase().trim(),
          password,
          setUser,
          _setJwt
        );
        setTimeout(() => {
          setLoading(false);
          if (!res) {
            setTextAlert('"Ups… te equivocaste. Revisa tus datos."');
            setShowhingAlert(!isShowingAlert);
          } else {
            setTextAlert("Bienvenido");
            setShowhingAlert(!isShowingAlert);

            setTimeout(() => {
              setShowhingAlert(false);
              navigation.navigate("Home", { screen: "Inicio" });
            }, 500);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          setLoading(false);
          setTextAlert('"Ups… te equivocaste. Revisa tus datos."');
          setShowhingAlert(!isShowingAlert);
        }, 500);
      }
    } catch (e) {
      setLoading(false);
      setTextAlert("Ha ocurrido un error, intente de nuevo");
      setShowhingAlert(!isShowingAlert);
      // console.log(e);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/trama_bg.png")}
      resizeMode="cover"
      style={styles.bgView}
    >
      <View style={[styles.viewRoot, { paddingTop: isOpenKeyboard ? 30 : 100, marginTop:70 }]}>
        <StatusBarComponent />
        <ReturnButton
        aditionalStyle={{top:-30, left:0}}
          color={'orange'}
          size={35}
          navigation={navigation}
        />

        <ImageLocalComponent
          img={require("../../../assets/images/alvh_logo.png")}
          width={GlobalVars.windowWidth - 40}
          height={GlobalVars.windowHeight / 4}
          mode="contain"
        />

        <TitleComponent
          title="¡Qué bueno que estés de vuelta!"
          color={GlobalVars.whiteLight}
          size={23}
          customStyles={{ textAlign: "center" }}
        />

        <View style={styles.collection}>
          <View style={styles.floatInput}>
            <InputEntry
              label="Correo electrónico"
              iconName="mail"
              textvariable={mail}
              setValue={(val) => setMail(val)}
              colorTextInput={GlobalVars.firstColor}
              colorPlaceholder={"rgba(0, 0, 0, 0.5)"}
            />
          </View>
          <View style={styles.floatInput}>
            <InputEntry
              label="Contraseña"
              textvariable={password}
              setValue={(val) => setPass(val)}
              colorTextInput={GlobalVars.firstColor}
              colorPlaceholder={"rgba(0, 0, 0, 0.5)"}
              visibility
              pass
            />
          </View>
        </View>

        {!loading ? (
          <ButtonComponent
            text="Iniciar sesión"
            color={GlobalVars.orange}
            textColor={GlobalVars.white}
            customStyleBtn={{
              width: "100%",
            }}
            Action={() => LogInProcess()}
          />
        ) : (
          <ActivityIndicator
            animating={true}
            size="large"
            color={GlobalVars.orange}
            style={{ marginVertical: 30 }}
          />
        )}
        {LabelTouchInvoke(
          "Restablecer contraseña",
          13,
          GlobalVars.orange,
          null,
          () => toggleModalRecoverPass()
        )}

        <ModalResetPass
          openModal={showModalRecoverPass}
          onHelp={toggleModalRecoverPass}
        />
        <ModalAlert
          text={textAlert}
          openModal={isShowingAlert}
          onHelp={() => setShowhingAlert(!isShowingAlert)}
        />
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
