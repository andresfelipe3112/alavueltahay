import React, { useEffect, useState, useCallback, useContext } from "react";

import {
  View,
  ActivityIndicator,
  BackHandler,
  Text,
  TouchableOpacity,
} from "react-native";

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
import distancesUtil from "../../utils/calculateGPSdistances";

/** Styles */
import Styles from "./style";
import { GET_ALLS_ENTREPRENEURS } from "../../mock/entrepreneurs";
import { shuffleArray } from "../../helpers/shuffleArr";
import LabelTextComponent from "../../components/atoms/LabelText";
import ProductCard from "../../components/molecules/ProductCard";
import EntrepreneurCard from "../../components/molecules/EntrepreneurCard";
import { async } from "@firebase/util";
import ImageUriComponent from "../../components/atoms/ImageUriComponent";
import TitleComponent from "../../components/atoms/Titles";

const styles = Styles;
const EntrepreneursScreen = ({ navigation }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const { isShowing: isOpenWelcome, toggle: showWelcome } = useModal();

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [gps, setGps] = useState(null);
  const [filterText, setFilterText] = useState("");

  const [nearResults, setNearResults] = React.useState([]);
  const [dataFilter, setDataFilter] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const returnAction = (item) => {
    navigation.navigate("Shop", { shop: item });
  };

  let ResultsNearToSearch = dataFilter.map((item, i) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            marginHorizontal: 15,
            width: 120,
            height: 180,
            backgroundColor: "white",
            borderRadius: 24,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginBottom:10
          }}
          onPress={() => returnAction(item)}
        >
          {item?.attributes?.avatar && !item?.attributes?.imageFirst?.data && (
            <ImageUriComponent
              radius={0}
              mode="cover"
              img={{
                uri: item?.attributes?.avatar?.data?.attributes?.uriAvatar,
              }}
              width="100%"
              height={GlobalVars.windowWidth / 3}
              borderTopRadius={25}
            />
          )}

          {!item?.attributes?.avatar?.data &&
            item?.attributes?.imageFirst?.data && (
              <ImageUriComponent
                radius={0}
                mode="cover"
                img={{
                  uri: item?.attributes?.imageFirst?.data?.attributes?.uri,
                }}
                width="100%"
                height={GlobalVars.windowWidth / 3}
                borderTopRadius={25}
              />
            )}

          {item?.attributes?.avatar?.data &&
            item?.attributes?.imageFirst?.data && (
              <ImageUriComponent
                radius={0}
                mode="cover"
                img={{
                  uri: item?.attributes?.imageFirst?.data?.attributes?.uri,
                }}
                width="100%"
                height={GlobalVars.windowWidth / 3}
                borderTopRadius={25}
              />
            )}
          <View style={[styles.contentCardIsLarge,{alignItems: 'center',paddingTop:4}]}>
            <TitleComponent
              title={item?.attributes?.entrepreneurship}
              color={GlobalVars.textGrayColor}
              size={14}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  });

  const fn = async () => {
    let a = [];
    let c = [];
    let b = await nearResults.map(async (element, i) => {
      const res = await distancesUtil.calculateDistances(
        gps,
        element?.attributes?.gps
      );
      console.log("res", res);
      const distanceBetween = res / 1000;
      if (distancesUtil.distanceMax >= distanceBetween) {
        a.push(element);
      }
      // return res
    });
    setLoading(false);
    setDataFilter(a);
  };

  useEffect(() => {
    fn();
  }, [nearResults]);

  useEffect(() => {
    console.log("dataFilter", dataFilter);
  }, [dataFilter]);

  const recoverNearbyPlaces = async () => {
    await setLoading(true);
    await setNearResults([]);
    console.log("hola");
    const result = await GET_ALLS_ENTREPRENEURS(_jwt);
    console.log(result);
    setNearResults(result);
    if (result) {
      console.log("se ejecuta");
      fn();
    }
  };

  useEffect(() => {
    recoverNearbyPlaces();
  }, []);

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
   
          {(!loading && dataFilter.length && (
            <View style={{ marginLeft: 10 }}>
              <LabelTextComponent
                style={{ alignSelf: "left", left: 10 }}
                text="Cerca de tí"
                color={GlobalVars.textGrayColor}
                size={15}
              />
              <ScrollView horizontal>
                <View style={{ display: "flex", flexDirection: "row", backgroundColor: GlobalVars.fondoPrincipal,zIndex:100 }}>
                  {(!loading && dataFilter.length && ResultsNearToSearch) || (
                    <></>
                  )}
                </View>
              </ScrollView>

            </View>
          )) || <></>}


        <LabelTextComponent
          style={{ alignSelf: "left", left: 23, marginBottom: -16 }}
          text="Todos los resultados"
          color={GlobalVars.textGrayColor}
          size={15}
        />
        <EntrepreneursGrid jwt={_jwt} filterText={filterText} />
      </ScrollView>
    </WrappingViews>
  );
};

export default EntrepreneursScreen;
