import React, { useEffect, useState, useCallback, useContext } from "react";

import { View, BackHandler } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import StoreContext from "../../helpers/globalStates";

import useModal from "../../utils/useModal";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import Header from "../../components/organisms/Header";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";

/** Styles */
import Styles from "./style";

const styles = Styles;
const TermsConditionsScreen = ({ navigation }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user, setUser } = useContext(StoreContext.UserContext);
  const { entrepreneur } = useContext(StoreContext.EntrepreneurContext);

  const { isShowing: isOpenWelcome, toggle: showWelcome } = useModal();

  const [showTotalMenu, setShowTotalMenu] = useState(true);
  const [q, setQuery] = useState("");

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  useEffect(() => {
    /** Backhandler process Android -> back button */
    BackHandlerProcess();
  }, []);

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
        title="Términos y condiciones de uso"
        ToRandomDispatch={ToRandomDispatch}
        isJustTitle
      />

      <ScrollView
        style={styles.scrolling}
        contentContainerStyle={styles.wrapScrollView}
        colorScrollBar={GlobalVars.orange}
      >
        <View style={styles.viewContainer}>
          <LabelTextComponent
            color={GlobalVars.whiteLight}
            size={14}
            text={GlobalVars.termConditions}
            customStyleBtn={styles.paragraph}
          />
        </View>
      </ScrollView>
    </WrappingViews>
  );
};

export default TermsConditionsScreen;
