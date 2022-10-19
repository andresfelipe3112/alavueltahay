import React, { useEffect, useState, useCallback, useContext } from "react";

import { View, ActivityIndicator, BackHandler } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import StoreContext from "../../helpers/globalStates";

import recoveringStateLocation from "../../utils/useGPS";

import useModal from "../../utils/useModal";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import InputSearch from "../../components/molecules/InputSearch";
import Header from "../../components/organisms/Header";
import MapViewComponent from "../../components/organisms/MapView";
import EntrepreneursGrid from "../../components/organisms/EntrepreneursGrid";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";

/** Styles */
import Styles from "./style";

const styles = Styles;
const EntrepreneursScreen = ({ navigation }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const { isShowing: isOpenWelcome, toggle: showWelcome } = useModal();

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
        title="Comercios"
        ToRandomDispatch={ToRandomDispatch}
        isJustTitle
      />

      <ScrollView
        style={styles.scrolling}
        contentContainerStyle={styles.wrapScrollView}
        colorScrollBar={GlobalVars.orange}
      >
        <View style={styles.mapView}>
          {!gps && <ActivityIndicator color={GlobalVars.orange} size="large" />}
          {gps && (
            <MapViewComponent coords={gps || null} onChangeCoords={setGps} />
          )}
        </View>

        <View style={styles.searchView}>
          <InputSearch
            label="Buscar negocios"
            iconName={filterText ? "x" : "search"}
            textvariable={filterText || ""}
            setValue={(val) => setFilterText(val)}
            bgBlue
          />
        </View>

        <EntrepreneursGrid jwt={_jwt} filterText={filterText} />
      </ScrollView>
    </WrappingViews>
  );
};

export default EntrepreneursScreen;
