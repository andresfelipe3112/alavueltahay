import React, { useEffect, useState, useCallback, useContext } from "react";

import { View, ActivityIndicator } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import StoreContext from "../../helpers/globalStates";

import recoveringStateLocation from "../../utils/useGPS";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import InputSearch from "../../components/molecules/InputSearch";
import Header from "../../components/organisms/Header";
import MapViewComponent from "../../components/organisms/MapView";
import ProductsGrid from "../../components/organisms/ProductsGrid";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";

/** Styles */
import Styles from "./style";

const styles = Styles;
const ProductsScreen = ({ navigation, route }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [gps, setGps] = useState(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      getRandomNumberDispatch();

      captureGps();
    }, [])
  );

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
      customStyles={{top:10}}
        navigation={navigation}
        user={user}
        _jwt={_jwt}
        title="Productos"
        ToRandomDispatch={ToRandomDispatch}
        isJustTitle
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

      <ScrollView
        style={styles.scrolling}
        contentContainerStyle={styles.wrapScrollView}
        colorScrollBar={GlobalVars.orange}
      >
        <View style={{ width: "100%", paddingHorizontal: 20 }}>
          <ProductsGrid
            jwt={_jwt}
            entrepreneur={route.params?.shopID}
            filterText={filterText}
            allActive
          />
        </View>
      </ScrollView>
    </WrappingViews>
  );
};

export default ProductsScreen;
