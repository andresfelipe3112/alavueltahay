import React, { useEffect, useState, useCallback, useContext } from "react";

import { View, Linking, ActivityIndicator, BackHandler, StyleSheet, Image } from "react-native";

import { Fontisto, AntDesign } from "@expo/vector-icons";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import StoreContext from "../../helpers/globalStates";
import dataNotification from "../../helpers/dataNotification";

import useModal from "../../utils/useModal";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import LabelTouchable from "../../components/molecules/LabelTouchable";
import Header from "../../components/organisms/Header";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";
import userInvitadData from "../../utils/useInvitado";

/** Styles */
import Styles from "./style";
import ModalWelcome from "../../components/templates/ModalWelcome";
import ModalInvite from "../../components/templates/ModalInvite";

const styles = Styles;

const SingleProductScreen = ({ navigation, route }) => {
  const { item: product } = route?.params;
  const [data] = userInvitadData();
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const { isShowing: isShowAlert, toggle: setShowhingAlert } = useModal();

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [loading, setLoading] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [sendedMsg, setSendedMsg] = useState(false);
  const [isShowingInvite, setShowingInvite] = useState(false);
  const [qty, setQty] = useState(product?.attributes?.quantity || 1);

  useEffect(() => { }, []);

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

  const handlePress = useCallback(async () => {
    setLoading(true);
    const arrChannels =
      product?.attributes?.entrepreneurship?.data?.attributes?.contactChannels
        ?.channels || [];
    const shopName =
      product?.attributes?.entrepreneurship?.data?.attributes?.entrepreneurship;

    const productName = product?.attributes?.product;

    const ShopID = product?.attributes?.entrepreneurship?.data?.id;

    let contactChannel;

    arrChannels.forEach((element) => {
      if (element?.name === "whatsapp" && element?.channel) {
        contactChannel = `https://wa.me/${element?.channel.replace(
          "+",
          ""
        )}?text=Hola ${shopName}, vi en alavueltahay que tienes ${productName}. ¿Sigue disponible?
        `;
      }
    });

    const uriOpen = contactChannel;

    // const supported = await Linking.canOpenURL(uriOpen);

    if (!uriOpen) {
      setTextAlert("Por el momento esta tienda no tiene canal de contacto.");
      setShowhingAlert(true);
      setLoading(false);
      setTimeout(() => {
        setShowhingAlert(false);
      }, 2000);
    } else if (uriOpen) {
      await Linking.openURL(uriOpen);
      const res = await dataNotification.sendQueryNotification(
        {
          shopName,
          productName,
          ShopID,
          userID: user?.id,
          userNames: `${user?.names} ${user?.lastnames}`,
          pushTokenUser: user?.pushToken,
        },
        _jwt
      );
      setLoading(false);
      setSendedMsg(true);
    } else {
      setTextAlert("Acción no permitida por su dispositivo.");
      setShowhingAlert(true);
      setLoading(false);
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
          title={"Cargando producto..."}
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
        title={"¡Gran elección!"}
        ToRandomDispatch={ToRandomDispatch}
        isJustTitle
      />

      <ScrollView
        style={styles.scrolling}
        contentContainerStyle={styles.wrapScrollView}
        colorScrollBar={GlobalVars.orange}
      >
        <View style={styles.shadowBox}>
          {sendedMsg && (
            <View
              style={[
                styles.collection,
                {
                  marginTop: 0,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <View style={styles2.containerFocus}>
                <Image
                  style={styles2.stretchFocus}
                  source={require("../../../assets/check.png")}
                />
              </View>
              <LabelTextComponent
                text={`${user?.names}, Se envió el mensaje por Whatsapp, ${product?.attributes?.entrepreneurship?.data?.attributes?.entrepreneurship} también recibió una notificación.`}
                color={GlobalVars.textGrayColor}
                size={15}
                customStyleBtn={{
                  textAlign: "justify",
                }}
              />
            </View>
          )}

          <View
            style={[styles.collection, styles.orderRows, styles.markBottom, { width: '100%' }]}
          >
            <View
            style={{ width: '75%',}}
            >

            <LabelTextComponent
              text={
                product?.attributes?.entrepreneurship?.data?.attributes
                ?.entrepreneurship || ""
              }
              color={GlobalVars.textGrayColor}
              size={18}
              />
              </View>

            <View style={styles.deliver}>
              <View style={{ width: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  style={[styles2.stretch, { width: 50, height: 50, marginBottom: -10 }]}
                  source={require("../../../assets/delivery.png")}
                />
                <LabelTextComponent
                  text={
                    product?.attributes?.delivery
                      ? "Delivery disponible"
                      : "Delivery no disponible"
                  }
                  color={GlobalVars.textGrayColor}
                  size={10}
                />
              </View>
            </View>
          </View>

          <View style={[styles.collection, { marginTop: 30 }]}>
            <LabelTextComponent
              text={"Detalle de la solicitud rápida"}
              color={GlobalVars.textGrayColor}
              size={14}
            />
          </View>

          <View style={[styles.collection, { marginTop: 0 }]}>
            <LabelTextComponent
              text={`Producto: ${product?.attributes?.product}`}
              color={GlobalVars.textGrayColor}
              size={16}
            />

            {/* <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ width: "50%" }}>
                <TextInput
                  style={styles.inputValue}
                  onChangeText={(val) => setQty(val)}
                  value={qty.toString() || ""}
                  placeholder="Cantidad"
                  keyboardType="default"
                  placeholderTextColor="rgba(0, 0, 0, 0.3)"
                />
              </View>
              <View style={{ width: "50%" }}>
                <LabelTextComponent
                  size={16}
                  color={GlobalVars.textGrayColor}
                  text={product?.attributes?.unity}
                />
              </View>
            </View> */}

            {/* <LabelTextComponent
              text={`Precio: $${product?.attributes?.price * qty} pesos`}
              color={GlobalVars.textGrayColor}
              size={16}
            /> */}

            {!sendedMsg && (
              <LabelTextComponent
                text="IMPORTANTE"
                color={GlobalVars.textGrayColor}
                size={20}
              />
            )}

            {!sendedMsg && (
              <LabelTextComponent
                text="Recuerda que la consulta se realizará vía
                WhatsApp, lo mismo que la coordinación
                de la compra."
                color={GlobalVars.textGrayColor}
                size={14}
                customStyleBtn={{
                  textAlign: "left",
                }}
              />
            )}

            {!sendedMsg && (
              <LabelTextComponent
                text="El tiempo de respuesta dependerá de
                cada negocio."
                color={GlobalVars.textGrayColor}
                size={14}
                customStyleBtn={{
                  textAlign: "left",
                }}
              />
            )}
          </View>

          <View
            style={[
              styles.collection,
              { paddingHorizontal: 10, paddingTop: 20 },
            ]}
          >
            {!sendedMsg && (
              <ButtonComponent
                text="ENVIAR"
                color={GlobalVars.orange}
                textColor={GlobalVars.whiteLight}
                Action={() => data ? handlePress() : setShowingInvite(!isShowingInvite)}
              />
            )}

            {sendedMsg && (
              <LabelTouchable
                label="¿Otra consulta rápida?"
                color={GlobalVars.textGrayColor}
                sizeText={20}
                onPress={() => navigation.goBack()}
              />
            )}
          </View>
        </View>
      </ScrollView>

      {isShowAlert && (
        <ModalWelcome
          text={textAlert}
          openModal={isShowAlert}
          onHelp={() => setShowhingAlert()}
        />
      )}
      <ModalInvite
        openModal={isShowingInvite}
        text='Para realizar esta solicitud requieres una cuenta de usuario, ¡Regístrate, es muy sencillo!'
        deleteUser={() => console.log('hola')}
        cancelModal={() => setShowingInvite(!isShowingInvite)}
      />
    </WrappingViews>
  );
};

export default SingleProductScreen;


const styles2 = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    right: 13
  },
  stretch: {
    width: 65,
    height: 65,
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

