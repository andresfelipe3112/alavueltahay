import React, { useEffect, useState, useCallback, useContext } from "react";

import {
  View,
  Linking,
  Platform,
  BackHandler,
  ActivityIndicator,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { FontAwesome5, Feather } from "@expo/vector-icons";

import GlobalVars from "../../global/globalVars";

import StoreContext from "../../helpers/globalStates";
import truncateText from "../../helpers/truncateText";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import ImageUriComponent from "../../components/atoms/ImageUriComponent";
import LabelTouchable from "../../components/molecules/LabelTouchable";
import Header from "../../components/organisms/Header";
import MapViewComponent from "../../components/organisms/MapView";
import ModalAlert from "../../components/templates/ModalAlert";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";

/** Styles */
import Styles from "./style";

const styles = Styles;

const SinglePanoramaScreen = ({ navigation, route }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [loading, setLoading] = useState(false);
  const [panorama, setPanorama] = useState(null);

  const [textAlert, setTextAlert] = useState("");
  const [isShowingAlert, setShowhingAlert] = useState(false);

  const [fb, setFb] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [mailTo, setMailTo] = useState("");
  const [calls, setCalls] = useState("");

  const [dayPanoramaStr, setDayPanoramaStr] = useState("");

  useEffect(() => {}, []);

  useEffect(() => {
    settingNetworks();
    getDayPanoramaStr();
  }, [panorama]);

  useFocusEffect(
    useCallback(() => {
      /** Backhandler process Android -> back button */
      BackHandlerProcess();

      getRandomNumberDispatch();

      setDataInitial();
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

  const setDataInitial = async () => {
    setLoading(true);
    if (route.params) {
      setPanorama(route.params?.panorama || null);
      setLoading(false);
      const channels =
        route.params?.panorama?.attributes?.contactChannels?.channels;
    } else {
      navigation.goBack();
    }
  };

  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
  };

  const getDayPanoramaStr = () => {
    if (panorama) {
      const activityDate = panorama?.attributes?.date;
      const d = new Date(
        activityDate.slice(6, 10),
        Number(activityDate.slice(3, 5)) - 1,
        activityDate.slice(0, 2)
      );

      const recoverDate = new Date(
        Date.UTC(
          d.getFullYear(),
          d.getMonth(),
          d.getDate(),
          d.getHours(),
          d.getMinutes(),
          d.getSeconds()
        )
      );

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      setDayPanoramaStr(
        `${
          recoverDate.getDate() < 10
            ? "0" + recoverDate.getDate()
            : recoverDate.getDate()
        }-${
          recoverDate.getMonth() < 10
            ? "0" + (recoverDate.getMonth() + 1)
            : recoverDate.getMonth() + 1
        }-${recoverDate.getFullYear()}`
      );
    }
  };

  const settingNetworks = async () => {
    panorama?.attributes?.contactChannels?.channels.forEach((element) => {
      let network = element?.name;
      switch (network) {
        case "facebook":
          setFb(element?.channel || "");
          break;
        case "whatsapp":
          setWhatsapp(element?.channel || "");
          break;
        case "instagram":
          setInstagram(element?.channel || "");
          break;
        case "tiktok":
          setTiktok(element?.channel || "");
          break;
        case "calls":
          setCalls(element?.channel || "");
          break;
        case "mails":
          setMailTo(element?.channel || "");
          break;
      }
    });
  };

  const handlePress = useCallback(async (url, type) => {
    var uriOpen;
    switch (type) {
      case "whatsapp":
        uriOpen = `https://wa.me/${url.replace("+", "")}`;
        break;
      case "instagram":
        uriOpen = url.toLowerCase();
        break;
      case "facebook":
        uriOpen = url.toLowerCase();
        break;
      case "tiktok":
        uriOpen = url.toLowerCase();
        break;
      case "calls":
        uriOpen = Platform.OS === "android" ? `tel:${url}` : `telprompt:${url}`;
        break;
      case "mails":
        uriOpen = `mailto:${url.toLowerCase()}`;
        break;
      default:
        uriOpen = null;
        break;
    }

    const supported = await Linking.canOpenURL(uriOpen);

    if (supported && uriOpen) {
      await Linking.openURL(uriOpen);
    } else {
      setTextAlert("No se puede redirigir al enlace");
      setShowhingAlert(true);
      setTimeout(() => {
        setShowhingAlert(false);
      }, 2000);
    }
  });

  if (loading) {
    return (
      <WrappingViews>
        <StatusBarComponent />
        <Header
          navigation={navigation}
          user={user}
          _jwt={_jwt}
          title={shop?.attributes?.entrepreneurship || ""}
          ToRandomDispatch={ToRandomDispatch}
          isJustTitle
        />

        <ScrollView
          style={styles.scrolling}
          contentContainerStyle={styles.wrapScrollView}
          colorScrollBar={GlobalVars.orange}
        >
          <ActivityIndicator
            animating={true}
            color={GlobalVars.orange}
            size="large"
            style={styles.spinner}
          />
        </ScrollView>
      </WrappingViews>
    );
  }

  return (
    <WrappingViews>
      <StatusBarComponent />
      <Header
        navigation={navigation}
        user={user}
        _jwt={_jwt}
        title={truncateText(panorama?.attributes?.panorama, 22) || ""}
        ToRandomDispatch={ToRandomDispatch}
        isJustTitle
      />

      <ScrollView
        style={styles.scrolling}
        contentContainerStyle={styles.wrapScrollView}
        colorScrollBar={GlobalVars.orange}
      >
        <View style={styles.shadowBox}>
          <View style={[styles.collection, styles.orderRows]}>
            <LabelTextComponent
              text={panorama?.attributes?.panorama}
              color={GlobalVars.textGrayColor}
              size={18}
            />
          </View>

          <View style={[styles.collection, styles.orderRows]}>
            {panorama?.attributes?.image?.data?.attributes?.uri && (
              <ImageUriComponent
                width={GlobalVars.windowWidth / 3}
                height={GlobalVars.windowWidth / 2}
                img={{
                  uri: panorama?.attributes?.image?.data?.attributes?.uri,
                }}
                mode="cover"
                borderBottomRadius={25}
                borderTopRadius={25}
              />
            )}
            <View style={{ width: 20 }} />
            <View
              style={{
                width: GlobalVars.windowWidth / 3,
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <LabelTextComponent
                text="Datos de la Actividad"
                color={GlobalVars.textGrayColor}
                size={15}
                customStyleBtn={{
                  marginVertical: 0,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              />
              <View style={{ width: "100%", height: 1 }} />
              <LabelTextComponent
                text="Dirección"
                color={GlobalVars.textGrayColor}
                size={15}
                customStyleBtn={{
                  marginBottom: 0,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              />
              <LabelTextComponent
                text={panorama?.attributes?.address}
                color={GlobalVars.textGrayColor}
                size={13}
                customStyleBtn={{ marginTop: 0, textAlign: "left" }}
              />
              <View style={{ width: "100%", height: 1 }} />
              <LabelTextComponent
                text="Horario"
                color={GlobalVars.textGrayColor}
                size={15}
                customStyleBtn={{
                  marginVertical: 0,
                  fontWeight: "bold",
                }}
              />
              <LabelTextComponent
                text={panorama?.attributes?.time}
                color={GlobalVars.textGrayColor}
                size={13}
                customStyleBtn={{ marginTop: 0, textAlign: "left" }}
              />
              <View style={{ width: "100%", height: 1 }} />
            </View>
          </View>

          <View style={[styles.collection, { marginTop: 30 }]}>
            <LabelTextComponent
              text="Fecha del Panorama"
              color={GlobalVars.textGrayColor}
              size={15}
              customStyleBtn={{
                marginVertical: 0,
                fontWeight: "bold",
              }}
            />
            <LabelTextComponent
              text={`${dayPanoramaStr}`}
              color={GlobalVars.textGrayColor}
              size={15}
              customStyleBtn={{
                marginVertical: 0,
              }}
            />
          </View>

          <View style={[styles.collection, { marginTop: 30 }]}>
            <LabelTextComponent
              text="Contacto"
              color={GlobalVars.textGrayColor}
              size={15}
              customStyleBtn={{
                marginTop: 10,
                fontWeight: "bold",
              }}
            />

            <View
              style={[
                styles.collection,
                styles.orderRows,
                {
                  display: whatsapp ? "flex" : "none",
                  justifyContent: "flex-start",
                },
              ]}
            >
              <FontAwesome5
                name="whatsapp"
                size={25}
                color={GlobalVars.textGrayColor}
              />
              <View style={{ width: 20 }} />
              <LabelTouchable
                sizeText={15}
                label={whatsapp}
                color={GlobalVars.textGrayColor}
                onPress={() => handlePress(whatsapp, "whatsapp")}
              />
            </View>

            <View
              style={[
                styles.collection,
                styles.orderRows,
                {
                  display: instagram ? "flex" : "none",
                  justifyContent: "flex-start",
                },
              ]}
            >
              <Feather
                name="instagram"
                size={25}
                color={GlobalVars.textGrayColor}
              />
              <View style={{ width: 20 }} />
              <LabelTouchable
                sizeText={12}
                label={instagram.toLowerCase()}
                color={GlobalVars.textGrayColor}
                onPress={() => handlePress(instagram, "instagram")}
              />
            </View>

            <View
              style={[
                styles.collection,
                styles.orderRows,
                {
                  display: fb ? "flex" : "none",
                  justifyContent: "flex-start",
                },
              ]}
            >
              <Feather
                name="facebook"
                size={25}
                color={GlobalVars.textGrayColor}
              />
              <View style={{ width: 20 }} />
              <LabelTouchable
                sizeText={12}
                label={fb.toLowerCase()}
                color={GlobalVars.textGrayColor}
                onPress={() => handlePress(fb, "facebook")}
              />
            </View>

            <View
              style={[
                styles.collection,
                styles.orderRows,
                {
                  display: tiktok ? "flex" : "none",
                  justifyContent: "flex-start",
                },
              ]}
            >
              <FontAwesome5
                name="tiktok"
                size={25}
                color={GlobalVars.textGrayColor}
              />
              <View style={{ width: 20 }} />
              <LabelTouchable
                sizeText={12}
                label={tiktok}
                color={GlobalVars.textGrayColor}
                onPress={() => handlePress(tiktok, "tiktok")}
              />
            </View>

            <View
              style={[
                styles.collection,
                styles.orderRows,
                {
                  display: calls ? "flex" : "none",
                  justifyContent: "flex-start",
                },
              ]}
            >
              <Feather
                name="phone-call"
                size={24}
                color={GlobalVars.blueOpaque}
              />
              <View style={{ width: 20 }} />
              <LabelTouchable
                sizeText={15}
                label={calls}
                color={GlobalVars.textGrayColor}
                onPress={() => handlePress(calls, "calls")}
              />
            </View>

            <View
              style={[
                styles.collection,
                styles.orderRows,
                {
                  display: mailTo ? "flex" : "none",
                  justifyContent: "flex-start",
                },
              ]}
            >
              <Feather name="mail" size={24} color={GlobalVars.blueOpaque} />
              <View style={{ width: 20 }} />
              <LabelTouchable
                sizeText={15}
                label={mailTo}
                color={GlobalVars.textGrayColor}
                onPress={() => handlePress(mailTo, "mails")}
              />
            </View>
          </View>

          <View style={[styles.collection, { marginVertical: 20 }]}>
            <LabelTextComponent
              text={`Descripción de ${panorama?.attributes?.panorama}`}
              color={GlobalVars.textGrayColor}
              size={15}
              customStyleBtn={{
                marginVertical: 0,
                fontWeight: "bold",
                textAlign: "left",
              }}
            />
            <LabelTextComponent
              text={`${panorama?.attributes?.description}`}
              color={GlobalVars.textGrayColor}
              size={15}
              customStyleBtn={{
                marginVertical: 0,
                textAlign: "justify",
              }}
            />
          </View>

          {panorama?.attributes.gps && (
            <View
              style={[
                styles.collection,
                { marginVertical: 20, height: GlobalVars.windowHeight / 4 },
              ]}
            >
              <MapViewComponent coords={panorama?.attributes?.gps} />
            </View>
          )}
        </View>
      </ScrollView>

      <ModalAlert
        text={textAlert}
        openModal={isShowingAlert}
        onHelp={() => setShowhingAlert(!isShowingAlert)}
      />
    </WrappingViews>
  );
};

export default SinglePanoramaScreen;
