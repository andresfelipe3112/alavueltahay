import React, { useEffect, useState, useCallback, useContext } from "react";

import { View, BackHandler } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import StoreContext from "../../helpers/globalStates";

import recoveringStateLocation from "../../utils/useGPS";

import useModal from "../../utils/useModal";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import InputSearch from "../../components/molecules/InputSearch";
import ProductsGrid from "../../components/organisms/ProductsGrid";
import MapViewComponent from "../../components/organisms/MapView";
import Header from "../../components/organisms/Header";
import CategoriesCarouselTabs from "../../components/organisms/CategoriesTabs";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";

/** Styles */
import Styles from "./style";

const styles = Styles;
const CategoriesScreen = ({ route, navigation }) => {
  const itemCat = route?.params?.itemCat || null;

  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const { isShowing: isOpenWelcome, toggle: showWelcome } = useModal();

  const [showTotalMenu, setShowTotalMenu] = useState(true);
  const [q, setQuery] = useState("");

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [selected, setSelected] = useState(itemCat);

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

  const changeSelection = (idCat) => {
    setSelected(idCat);
  };

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

      <ScrollView
        style={styles.scrolling}
        contentContainerStyle={styles.wrapScrollView}
        colorScrollBar={GlobalVars.orange}
      >
        <View style={styles.mapView}>
          {gps && (
            <MapViewComponent coords={gps || null} onChangeCoords={setGps} />
          )}
        </View>

        <CategoriesCarouselTabs
          jwt={_jwt}
          selected={selected}
          changeSelection={changeSelection}
        />

        <View style={styles.searchView}>
          <InputSearch
            label="Buscar productos"
            iconName={filterText ? "x" : "search"}
            textvariable={filterText || ""}
            setValue={(val) => setFilterText(val)}
            bgBlue
          />
        </View>

        <View style={styles.productsContainer}>
          <ProductsGrid
            gps={gps}
            jwt={_jwt}
            filterText={filterText}
            selectedCategory={selected}
            title={`Todos los resultados`}
            allActive
            showTitle
            activeNears
          />
        </View>
      </ScrollView>
    </WrappingViews>
  );
};

export default CategoriesScreen;
