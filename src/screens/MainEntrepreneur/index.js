import React, { useEffect, useState, useCallback, useContext } from "react";

import { View, BackHandler, ImageBackground } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import StoreContext from "../../helpers/globalStates";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import OptionTouchable from "../../components/molecules/ProfileOption";
import Header from "../../components/organisms/Header";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";

/** Styles */
import Styles from "./style";

const styles = Styles;
const MainEntrepreneurScreen = ({ navigation }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  useEffect(() => {}, []);
  useEffect(() => {}, [ToRandomDispatch]);

  useFocusEffect(
    useCallback(() => {
      /** Backhandler process Android -> back button */
      BackHandlerProcess();
      getRandomNumberDispatch();
    }, [])
  );

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

  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
  };

  return (
    <WrappingViews>
      <StatusBarComponent />
      <Header
        navigation={navigation}
        user={user}
        _jwt={_jwt}
        title="Edita tu negocio"
        ToRandomDispatch={ToRandomDispatch}
        isJustTitle
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

            <OptionTouchable
              text="Editar información"
              colorText={GlobalVars.white}
              sizeText={16}
              colorIcon={GlobalVars.white}
              sizeIcon={20}
              iconOptionN="Editar"
              onPress={() => navigation.navigate("EditEntrepreneur")}
            />

            <OptionTouchable
              text="Gestionar productos"
              colorText={GlobalVars.white}
              sizeText={16}
              colorIcon={GlobalVars.white}
              sizeIcon={20}
              iconOptionN="coffee"
              onPress={() => navigation.navigate("ShopItems")}
            />

            <OptionTouchable
              text="Visualizar negocio"
              colorText={GlobalVars.white}
              sizeText={16}
              colorIcon={GlobalVars.white}
              sizeIcon={20}
              iconOptionN="clipboard"
              onPress={() => navigation.navigate("Shop")}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </WrappingViews>
  );
};

export default MainEntrepreneurScreen;
