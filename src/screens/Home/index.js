import React, { useEffect, useState, useCallback, useContext } from "react";

import { BackHandler, ActivityIndicator, ImageBackground, View, Button } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import Storage from "../../helpers/localStorage";
import StoreContext from "../../helpers/globalStates";
import { validatePushToken } from "../../helpers/validatePushToken";

import useModal from "../../utils/useModal";
import recoveringStateLocation from "../../utils/useGPS";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import Header from "../../components/organisms/Header";
import EntrepreneurCarousel from "../../components/organisms/EntrepreneurCarousel";
import CategoriesCarouselComponent from "../../components/organisms/CategoriesCarousel";
import ScrollView from "../../components/templates/ScrollView";
import ModalWelcome from "../../components/templates/ModalWelcome";
import ModalsSignOut from "../../components/templates/ModalsSignOut";
import WrappingViews from "../../components/templates/WrappingViews";

/** Styles */
import Styles from "./style";
import PanoramasCarousel from "../../components/organisms/PanoramasCarousel";

const styles = Styles;
const HomeScreen = ({ route, navigation }) => {
  const { _jwt, _setJwt } = useContext(StoreContext.SecurityContext);
  const { user, setUser } = useContext(StoreContext.UserContext);
  const { entrepreneur, setEntrepreneur } = useContext(
    StoreContext.EntrepreneurContext
  );

  const { isShowing: isOpenWelcome, toggle: showWelcome } = useModal();

  const [salirApp, setSalirapp] = useState(false);

  const [textWelcome, setTextWelcome] = useState("");
  const [textBtnWelcome, setTextBtnWelcome] = useState("");

  const [coords, setCoords] = useState({});
  const [showTotalMenu, setShowTotalMenu] = useState(true);
  const [q, setQuery] = useState("");
  const [shopTypeShow, setShopTypesShow] = useState("featured");

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  useEffect(() => {
    /** Welcome Popup */
    ProcessWelcome();
  }, []);

  useEffect(() => {
    if (user) {
      /** Update Push N. Token */
      ProcessPushToken();
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      /** Backhandler process Android -> back button */
      BackHandlerProcess();

      /** RecoverData */
      RecoverData();

      getRandomNumberDispatch();

      return () => {
        /** RecoverData */
        RecoverData();

        getRandomNumberDispatch();
      };
    }, [])
  );

  const BackHandlerProcess = () => {
    /** Android no return Login */
    const backAction = () => {
      setSalirapp(!salirApp);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  };

  const CloseApp = (response = false) => {
    if (response) BackHandler.exitApp();
    else setSalirapp(!salirApp);
  };

  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
  };

  const ProcessWelcome = () => {
    setTextWelcome(`Estamos buscando ${"\n"} tus datos.`);
    setTextBtnWelcome("Buscando...");
    showWelcome();

    setTimeout(() => {
      setTextWelcome(`Estamos buscando tu ${"\n"} ubicación.`);
      setTimeout(() => {
        setTextBtnWelcome("Bienvenido!");
        setTextWelcome(`Espera mientras entramos ${"\n"} en tu perfil.`);
      }, 2000);
    }, 2000);
  };

  const ProcessPushToken = async () => {
    await validatePushToken(user, setUser, _jwt);
  };

  const RecoverData = async () => {
    // await setGPSLocation();
    await setDataUser();
    await setEntrepreneurship();
  };

  const setGPSLocation = async () => {
    let recover = await recoveringStateLocation();
    while (recover === "error" || !recover) {
      recover = await recoveringStateLocation();
    }
    setCoords({
      latitude: recover?.coords?.latitude,
      longitude: recover?.coords?.longitude,
    });
  };

  const setDataUser = async () => {
    /** define user logged */
    let userData = await Storage.getItem("_USER_LOGGED");
    // while (!userData) {
    //   userData = await Storage.getItem("_USER_LOGGED");
    // }
    setUser(userData);

    /** define jwt user */
    let userToken = await Storage.getItem("_TOKEN_API");
    // while (!userToken) {
    //   userToken = await Storage.getItem("_TOKEN_API");
    // }
    _setJwt(userToken);
  };

  const setEntrepreneurship = async () => {
    const userEntrepreneurshipData = await Storage.getItem(
      "_USER_ENTREPRENEUR"
    );
    setEntrepreneur({ id: userEntrepreneurshipData });
  };

  return (
    <WrappingViews>
      <StatusBarComponent />
      <Header
        noBackButton
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
          colorScrollBar={`transparent`}
        >
          {!_jwt && !user && (
            <ActivityIndicator color={GlobalVars.firstColor} size="large" />
          )}

          {user && _jwt && (
            <>
              <CategoriesCarouselComponent
                _jwt={_jwt}
                navigation={navigation}
                ToRandomDispatch={ToRandomDispatch}
                isFavCats
                />

              <EntrepreneurCarousel
                _jwt={_jwt}
                navigation={navigation}
                entrepreneur={entrepreneur}
                type={shopTypeShow}
                onHandleType={setShopTypesShow}
                ToRandomDispatch={ToRandomDispatch}
              />

              <PanoramasCarousel
                _jwt={_jwt}
                navigation={navigation}
                ToRandomDispatch={ToRandomDispatch}
                getRandomNumberDispatch={getRandomNumberDispatch}
              />
            </>
          )}
        </ScrollView>
      </ImageBackground>

      {
      isOpenWelcome && (
        <ModalWelcome
          textBtn={textBtnWelcome}
          text={textWelcome}
          openModal={isOpenWelcome}
          onHelp={() => showWelcome()}
        />
      )}

      {salirApp && <ModalsSignOut navigation={navigation} Action={CloseApp} />}
    </WrappingViews>
  );
};

export default HomeScreen;
