import React, { useEffect, useState, useCallback, useContext } from "react";

import {
  View,
  BackHandler,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import FetchLib from "../../utils/useFetch";

import Storage from "../../helpers/localStorage";
import StoreContext from "../../helpers/globalStates";

import useFirebase from "../../utils/useFirebase";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import OptionTouchable from "../../components/molecules/ProfileOption";
import Header from "../../components/organisms/Header";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";
import ModalInvite from "../../components/templates/ModalInvite";    
 

/** Styles */
import Styles from "./style";
import ModalCheckDelete from "../../components/templates/ModalCheckDelete";
import userInvitadData from "../../utils/useInvitado";

const styles = Styles;
const UserProfileScreen = ({ navigation }) => {
  const { _jwt, _setJwt } = useContext(StoreContext.SecurityContext);
  const { user, setUser } = useContext(StoreContext.UserContext);
  const { entrepreneur, setEntrepreneur } = useContext(
    StoreContext.EntrepreneurContext
  );
  const [data] = userInvitadData();
  const [showTotalMenu, setShowTotalMenu] = useState(true);
  const [q, setQuery] = useState("");

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  useEffect(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      /** Backhandler process Android -> back button */
      BackHandlerProcess();

      RecoverData();

      getRandomNumberDispatch();
    }, [])
  );

  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
  };

  const onHandle = async () => {
    await Storage.clearAll();
    await  _setJwt(null);
    await setUser(null);
    await useFirebase.SignedOut(navigation);
  };

  const BackHandlerProcess = () => {
    /** Android no return Login */
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  };

  const RecoverData = async () => {
    await setEntrepreneurship();
  };

  const setEntrepreneurship = async () => {
    const userEntrepreneurshipData = await Storage.getItem(
      "_USER_ENTREPRENEUR"
    );
    setEntrepreneur({ id: userEntrepreneurshipData });
  };

  const [isShowingAlert, setShowhingAlert] = useState(false);
  const [isShowingInvite, setShowingInvite] = useState(false);
  const deleteUser = async () => {
    try {
       const data = await Storage.getItem("_USER_LOGGED");
       const token = await Storage.getItem("_TOKEN_API");
       console.log(data.id);
       const user = await FetchLib.fetchDrop(`https://a-la-vuelta-hay-backend.herokuapp.com/api/users/${data.id}`, token)
       console.log(user);
       Storage.clearAll()
       setShowhingAlert(!isShowingAlert)
       navigation.navigate("Initial")
     } catch (error) {
      console.log(error);
     }
  }

  return (
    <WrappingViews>
      <StatusBarComponent />
      <Header
        colorBack="white"
        navigation={navigation}
        openTotal={showTotalMenu}
        query={q}
        setQuery={setQuery}
        user={user}
        setShowTotalMenu={() => setShowTotalMenu(!showTotalMenu)}
        _jwt={_jwt}
        ToRandomDispatch={ToRandomDispatch}
      />

      <ImageBackground
        source={require("../../../assets/images/trama_bg.png")}
        resizeMode="cover"
        style={styles.bgView}
      >
        <ScrollView
          style={styles.scrolling}
          contentContainerStyle={styles.wrapScrollView}
          colorScrollBar={GlobalVars.orange}
        >
          <View style={styles.viewContainer}>
            <View style={styles.tagProfile}>
              <LabelTextComponent
                size={16}
                color={GlobalVars.white}
                text="Configura tu cuenta"
              />
              <View style={styles.subray} />
            </View>

          { data && <OptionTouchable
              text="Mi perfil"
              colorText={GlobalVars.white}
              sizeText={16}
              colorIcon={GlobalVars.white}
              sizeIcon={20}
              iconOption="user_white"
              onPress={() => navigation.navigate("EditProfile")}
            />}

            {entrepreneur?.id && (
              <OptionTouchable
                text="Mi negocio"
                colorText={GlobalVars.white}
                sizeText={16}
                colorIcon={GlobalVars.white}
                sizeIcon={20}
                iconOption="negocio"
                onPress={() => navigation.navigate("MainEntrepreneur")}
              />
            )}

            {!entrepreneur?.id && (
              <OptionTouchable
                text="Crear mi negocio"
                colorText={GlobalVars.white}
                sizeText={16}
                colorIcon={GlobalVars.white}
                sizeIcon={20}
                iconOption="negocio"
                onPress={() => data === false ? setShowingInvite(!isShowingInvite) : navigation.navigate("AggreeEntrepreneur")}
              />
            )}

            {data && <OptionTouchable
              text="Panoramas"
              colorText={GlobalVars.white}
              sizeText={16}
              colorIcon={GlobalVars.white}
              sizeIcon={20}
              iconOption="negocio-1"
              onPress={() => navigation.navigate("MyPanoramas")}
            />}

            <OptionTouchable
              text="Términos y condiciones"
              colorText={GlobalVars.white}
              sizeText={16}
              colorIcon={GlobalVars.white}
              sizeIcon={20}
              iconOption="terminos_condiciones"
              onPress={() => navigation.navigate("TermsConditions")}
            />
        

            {data && <OptionTouchable
              text="Eliminar mi cuenta"
              colorText={GlobalVars.white}
              sizeText={16}
              colorIcon={GlobalVars.white}
              sizeIcon={20}
              iconOption="user-x-1"
              onPress={() => setShowhingAlert(!isShowingAlert)}
            />}

            <TouchableOpacity style={[styles.poweroff]} onPress={onHandle}>
            <View style={[styles2.container]}>
              <Image
                style={styles2.stretch}
                source={require("../../../assets/power_off.png")}
              />
            </View>
              <LabelTextComponent
                text="Cerrar sesión"
                color={GlobalVars.white}
                size={16}
              />
            </TouchableOpacity>

            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <LabelTextComponent
                size={12}
                color={GlobalVars.white}
                text="contacto@alavueltahay.cl"
              />
            </View>
          </View>
          <ModalCheckDelete
           openModal={isShowingAlert}
           deleteUser={() => deleteUser() }
           cancelModal={() => setShowhingAlert(!isShowingAlert)}
      />
       <ModalInvite
       text='Necesitas una cuenta de usuario para crear tu negocio. ¡Regístrate, es muy sencillo!'
           openModal={isShowingInvite}
           deleteUser={() => console.log('hola')}
           cancelModal={() => setShowingInvite(!isShowingInvite)}
      />
           {/* import ModalInvite from "../../components/templates/ModalInvite";    
           const [data] = userInvitadData();
           const [isShowingInvite, setShowingInvite] = useState(false);
           <OptionTouchable
              text="Términos y condiciones"
              colorText={GlobalVars.white}
              sizeText={16}
              colorIcon={GlobalVars.white}
              sizeIcon={20}
              iconOption="clipboard"
              onPress={() => setShowingInvite(!isShowingInvite)}
            />   
          <ModalInvite
           openModal={isShowingInvite}
           deleteUser={() => console.log('hola')}
           cancelModal={() => setShowingInvite(!isShowingInvite)}
      /> */}
        </ScrollView>
      </ImageBackground>
    </WrappingViews>
  );
};

export default UserProfileScreen;

const styles2 = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
  },
  stretch: {
    width: 30,
    height: 30,
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
