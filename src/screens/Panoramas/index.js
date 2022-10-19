import React, { useEffect, useState, useCallback, useContext } from "react";

import { View, BackHandler } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import StoreContext from "../../helpers/globalStates";

import recoveringStateLocation from "../../utils/useGPS";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import InputSearch from "../../components/molecules/InputSearch";
import Header from "../../components/organisms/Header";
import PanoramasGrid from "../../components/organisms/PanoramasGrid";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";

/** Styles */
import Styles from "./style";

const styles = Styles;
const PanoramasScreen = ({ navigation, route }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [gps, setGps] = useState(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      /** Backhandler process Android -> back button */
      BackHandlerProcess();

      getRandomNumberDispatch();

      captureGps();
    }, [])
  );

  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
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

  const captureGps = async () => {
    let recover = await recoveringStateLocation();
    while (recover === "error" || !recover) {
      recover = await recoveringStateLocation();
    }
    setGps({
      latitude: recover?.coords?.latitude,
      longitude: recover?.coords?.longitude,
    });
  };

  return (
    <WrappingViews>
      <StatusBarComponent />
      <Header
        navigation={navigation}
        user={user}
        _jwt={_jwt}
        title="Panoramas"
        ToRandomDispatch={ToRandomDispatch}
        isJustTitle
      />

      <View style={styles.searchView}>
        <InputSearch
          label="Buscar panoramas"
          iconName={filterText ? "x" : "search"}
          textvariable={filterText || ""}
          setValue={(val) => setFilterText(val)}
          bgBlue
        />
      </View>

      <ScrollView
        style={styles.scrolling}
        contentContainerStyle={styles.wrapScrollView}
        colorScrollBar={GlobalVars.orange}
      >
        <View style={{ width: "100%" }}>
          <PanoramasGrid
            jwt={_jwt}
            filterText={filterText}
            gps={gps}
            title="Todos los resultados"
            showTitle
            activeNears
          />
        </View>
      </ScrollView>
    </WrappingViews>
  );
};

export default PanoramasScreen;
