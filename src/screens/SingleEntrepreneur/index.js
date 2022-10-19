import React, { useEffect, useState, useCallback, useContext } from "react";

import {
  View,
  Linking,
  Platform,
  BackHandler,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { FontAwesome5, Feather } from "@expo/vector-icons";

import GlobalVars from "../../global/globalVars";

import { GET_ENTREPRENEUR_BY_ID } from "../../mock/entrepreneurById";

import StoreContext from "../../helpers/globalStates";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import ImageUriComponent from "../../components/atoms/ImageUriComponent";
import LabelTouchable from "../../components/molecules/LabelTouchable";
import Header from "../../components/organisms/Header";
import MapViewComponent from "../../components/organisms/MapView";
import ProductsGrid from "../../components/organisms/ProductsGrid";
import ModalAlert from "../../components/templates/ModalAlert";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";

/** Styles */
import Styles from "./style";

const styles = Styles;
const SingleEntrepreneursScreen = ({ navigation, route }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);
  const { entrepreneur } = useContext(StoreContext.EntrepreneurContext);

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [loading, setLoading] = useState(false);
  const [shop, setShop] = useState(null);

  const [textAlert, setTextAlert] = useState("");
  const [isShowingAlert, setShowhingAlert] = useState(false);

  const [daysWorkStr, setDaysWorkStr] = useState("");

  const [fb, setFb] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [mailTo, setMailTo] = useState("");
  const [calls, setCalls] = useState("");

  useEffect(() => {}, []);

  useEffect(() => {
    getDaysWorkStr();

    settingNetworks();
  }, [shop]);

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
      setShop(route.params?.shop || null);
      setLoading(false);
    } else if (entrepreneur) {
      const res = await GET_ENTREPRENEUR_BY_ID(_jwt, entrepreneur?.id);
      if (res) {
        setShop(res);
        setLoading(false);
      }
    } else {
      navigation.goBack();
    }
  };

  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
  };

  const getDaysWorkStr = () => {
    let strTemp = "";
    shop?.attributes?.officeDays?.workDays.forEach((day) => {
      if (strTemp === "") strTemp = `${day.substring(0, 3)}`;
      else strTemp = `${strTemp}  ${day.substring(0, 3)}`;
    });

    setDaysWorkStr(strTemp);
  };

  const settingNetworks = async () => {
    shop?.attributes?.contactChannels?.channels.forEach((element) => {
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
        title={shop?.attributes?.entrepreneurship || ""}
        ToRandomDispatch={ToRandomDispatch}
        isJustTitle
      />

      <ScrollView
        style={styles.scrolling}
        contentContainerStyle={styles.wrapScrollView}
        colorScrollBar={GlobalVars.orange}
      >
        <View
          style={[
            styles.shadowBox,
            { paddingHorizontal: 0, paddingVertical: 0, paddingBottom: 20 },
          ]}
        >
          <View
            style={[
              styles.collection,
              { marginBottom: 75, position: "relative" },
            ]}
          >
            {shop?.attributes?.frontImage?.data?.attributes?.uri && (
              <ImageUriComponent
                width="100%"
                height={GlobalVars.windowWidth / 2}
                img={{
                  uri: shop?.attributes?.frontImage?.data?.attributes?.uri,
                }}
                mode="cover"
                borderBottomRadius={0}
                borderTopRadius={7}
              />
            )}
            {!shop?.attributes?.frontImage?.data?.attributes?.uri &&
              shop?.attributes?.frontImageGallery && (
                <ImageUriComponent
                  width="100%"
                  height={GlobalVars.windowWidth / 2}
                  img={{ uri: shop?.attributes?.frontImageGallery }}
                  mode="cover"
                  borderBottomRadius={0}
                  borderTopRadius={7}
                />
              )}

            <View
              style={{
                position: "absolute",
                bottom: "-25%",
                left: 25,
                width: GlobalVars.windowWidth / 3,
              }}
            >
              {shop?.attributes?.imageFirst?.data?.attributes?.uri && (
                <ImageUriComponent
                  // width={GlobalVars.windowWidth / 3}
                  // height={GlobalVars.windowWidth / 3}
                  img={{
                    uri: shop?.attributes?.imageFirst?.data?.attributes?.uri,
                  }}
                  mode="cover"
                  borderBottomRadius={75}
                  borderTopRadius={75}
                />
              )}
              {!shop?.attributes?.imageFirst?.data?.attributes?.uri &&
                shop?.attributes?.avatar?.data?.attributes?.uriAvatar && (
                  <ImageUriComponent
                    // width={GlobalVars.windowWidth / 4}
                    // height={GlobalVars.windowWidth / 4}
                    img={{
                      uri: shop?.attributes?.avatar?.data?.attributes
                        ?.uriAvatar,
                    }}
                    mode="cover"
                    borderBottomRadius={75}
                    borderTopRadius={75}
                  />
                )}
            </View>
          </View>

          <View
            style={[
              styles.collection,
              { paddingHorizontal: 20, marginBottom: 20 },
            ]}
          >
            <LabelTextComponent
              text={shop?.attributes?.entrepreneurship}
              color={GlobalVars.textGrayColor}
              size={18}
              noFontFamily
              customStyleBtn={{
                marginVertical: 0,
                textAlign: "justify",
                marginBottom: 10,
                fontWeight: "800",
              }}
            />

            <LabelTextComponent
              text={`${shop?.attributes?.description}`}
              color={GlobalVars.textGrayColor}
              size={15}
              customStyleBtn={{
                marginVertical: 0,
                textAlign: "justify",
              }}
            />
          </View>

          <View style={[styles.collection, { paddingHorizontal: 20 }]}>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <LabelTextComponent
                text="Rubro"
                color={GlobalVars.textGrayColor}
                size={15}
                noFontFamily
                customStyleBtn={{
                  marginBottom: 0,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              />
              <LabelTextComponent
                text={shop?.attributes?.category?.data?.attributes?.category}
                color={GlobalVars.textGrayColor}
                size={13}
                customStyleBtn={{ marginTop: 0, textAlign: "left" }}
              />
              <View style={{ width: "100%", height: 1 }} />
              <LabelTextComponent
                text="Dirección"
                color={GlobalVars.textGrayColor}
                size={15}
                noFontFamily
                customStyleBtn={{
                  marginVertical: 0,
                  fontWeight: "bold",
                }}
              />
              <LabelTextComponent
                text={shop?.attributes?.address}
                color={GlobalVars.textGrayColor}
                size={13}
                customStyleBtn={{ marginTop: 0, textAlign: "left" }}
              />
              <View style={{ width: "100%", height: 1 }} />
              <LabelTextComponent
                text="Horario de atención"
                color={GlobalVars.textGrayColor}
                size={15}
                noFontFamily
                customStyleBtn={{
                  marginVertical: 0,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              />
              {!shop?.attributes?.officeHours?.continuousHours && (
                <LabelTextComponent
                  text={`${shop?.attributes?.officeHours?.open} a ${shop?.attributes?.officeHours?.close} horas`}
                  color={GlobalVars.textGrayColor}
                  size={13}
                  customStyleBtn={{ marginTop: 0, textAlign: "left" }}
                />
              )}
              {shop?.attributes?.officeHours?.continuousHours && (
                <LabelTextComponent
                  text={`${shop?.attributes?.officeHours?.morning?.open} a ${shop?.attributes?.officeHours?.morning?.close} am`}
                  color={GlobalVars.textGrayColor}
                  size={13}
                  customStyleBtn={{ marginTop: 0, textAlign: "left" }}
                />
              )}
              {shop?.attributes?.officeHours?.continuousHours && (
                <LabelTextComponent
                  text={`${shop?.attributes?.officeHours?.evernoon?.open} a ${shop?.attributes?.officeHours?.evernoon?.close} pm`}
                  color={GlobalVars.textGrayColor}
                  size={13}
                  customStyleBtn={{ marginTop: 0, textAlign: "left" }}
                />
              )}
            </View>
          </View>

          <View
            style={[
              styles.collection,
              { marginTop: 30, paddingHorizontal: 20 },
            ]}
          >
            <LabelTextComponent
              text="Días de atención"
              color={GlobalVars.textGrayColor}
              size={15}
              noFontFamily
              customStyleBtn={{
                marginVertical: 0,
                fontWeight: "bold",
              }}
            />
            <LabelTextComponent
              text={`${daysWorkStr}`}
              color={GlobalVars.textGrayColor}
              size={15}
              customStyleBtn={{
                marginVertical: 0,
              }}
            />
          </View>

          <View
            style={[
              styles.collection,
              { marginTop: 30, paddingHorizontal: 20 },
            ]}
          >
            <LabelTextComponent
              text="Contacto"
              color={GlobalVars.textGrayColor}
              size={15}
              noFontFamily
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
              <View style={styles2.container}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../assets/whatsapp.png")}
                />
              </View>
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
              <View style={styles2.container}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../assets/instagram.png")}
                />
              </View>
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
             <View style={styles2.container}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../assets/facebook.png")}
                />
              </View>
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
             <View style={styles2.container}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../assets/tik_tok.png")}
                />
              </View>
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

          <View
            style={[
              styles.collection,
              {
                marginVertical: 20,
                paddingHorizontal: 10,
                height: GlobalVars.windowHeight / 4,
              },
            ]}
          >
            {shop?.attributes?.gps?.latitude &&
            shop?.attributes?.gps?.longitude ? (
              <MapViewComponent coords={shop?.attributes?.gps} />
            ) : (
              <></>
            )}
          </View>

          <View style={{ width: "100%", paddingHorizontal: 20 }}>
            <LabelTextComponent
              text={`Productos`}
              color={GlobalVars.textGrayColor}
              size={15}
              customStyleBtn={{
                marginVertical: 0,
                fontWeight: "bold",
              }}
            />
            {route?.params?.shop && (
              <ProductsGrid
                jwt={_jwt}
                entrepreneur={route?.params?.shop?.id}
                justFeatures
                isSpacing
              />
            )}
            {!route?.params?.shop && (
              <ProductsGrid
                jwt={_jwt}
                entrepreneur={entrepreneur?.id}
                isMyShop
                justFeatures
                isSpacing
              />
            )}
          </View>
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

export default SingleEntrepreneursScreen;

const styles2 = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
  },
  stretch: {
    width: 35,
    height: 35,
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
