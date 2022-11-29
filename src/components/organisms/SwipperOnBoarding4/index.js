import React, { useCallback } from "react";
import {
  View,
  Modal,
  Linking,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

import { useRoute } from "@react-navigation/native";

import { AntDesign, FontAwesome5, Feather } from "@expo/vector-icons";

import Swiper from "react-native-swiper";

import { useNavigation } from "@react-navigation/native";

import GlobalVars from "../../../global/globalVars";

import { GET_AVATARES } from "../../../mock/avatares";
import { GET_FRONTS } from "../../../mock/fronts";
import { socialNetworks } from "../../../mock/socialNetworks";

import useModal from "../../../utils/useModal";
import { useKeyboard } from "../../../utils/useKeyboard";

import LabelTextComponent from "../../atoms/LabelText";
import ImageUriComponent from "../../atoms/ImageUriComponent";
import InputEntry from "../../molecules/InputEntry";
import LabelTouchable from "../../molecules/LabelTouchable";
import PickerImage from "../ChooseImage";
import ModalTemplate from "../../templates/ModalTemplate";
import ScrollView from "../../templates/ScrollView";
import ModalAlert from "../../templates/ModalAlert";
import ModalFinish from "../../templates/ModalFinish";

import Styles from "./style";
import { Image } from "react-native";
import { StyleSheet } from "react-native";

const styles = Styles;

const OnBoarding4 = ({ onBoardCurrent, ...props }) => {
  const routeParam = useRoute();

  const navigation = useNavigation();
  const isKeyBoardOpen = useKeyboard();

  const { isShowing: isOpenPickerImage, toggle: showPickerImage } = useModal();
  const { isShowing: isOpenPickerImageFront, toggle: showPickerImageFront } =
    useModal();

  let daysWorkStr = "";
  props.daysWork.forEach((day) => {
    if (daysWorkStr === "") daysWorkStr = `${day.substring(0, 3)}`;
    else daysWorkStr = `${daysWorkStr}  ${day.substring(0, 3)}`;
  });

  const [visible, onShow] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [avatares, setAvatares] = React.useState([]);
  const [frontsOptions, setFrontOptions] = React.useState([]);

  const [showWhatsapp, setShowWhatsapp] = React.useState(false);
  const [showInstagram, setShowInstagram] = React.useState(false);
  const [showFb, setShowFb] = React.useState(false);
  const [showTiktok, setShowTiktok] = React.useState(false);
  const [showCalls, setShowCalls] = React.useState(false);
  const [showMail, setShowMail] = React.useState(false);

  const [textAlert, setTextAlert] = React.useState("");
  const [isShowingAlert, setShowhingAlert] = React.useState(false);

  const [loadingRegiter, setLoadingRegiter] = React.useState(false);

  const swiper = React.useRef(null);

  React.useEffect(() => {
    let isMounted = true;
    /** GET DATA */
    if (isMounted) {
      onRecoverAvatars();
      onRecoverFronts();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    if (onBoardCurrent === 4) {
      // deleteP();
      onShow(true);
    }
  }, [onBoardCurrent]);

  React.useEffect(() => {
    if (currentSlide === 4) {
      swiper.current.scrollBy(-1);
    }
  }, [currentSlide]);

  const onRecoverAvatars = async () => {
    const res = await GET_AVATARES();
    setAvatares(res);
  };

  const onRecoverFronts = async () => {
    const res = await GET_FRONTS();
    setFrontOptions(res);
  };

  const setNextProcess = async () => {
    if (!props.avatarShop && !props.imageShop) {
      setTextAlert("Debes seleccionar o cargar un logo");
      setShowhingAlert(true);
    }
    if (!props.frontShop && !props.frontShopPre) {
      setTextAlert("Debes seleccionar o agregar una portarda");
      setShowhingAlert(true);
    } else {
      // register user
      setLoadingRegiter(true);
      const res = await props.onRegister();
      if (res) {
        setTextAlert(`Se ha registrado con éxito el emprendimiento.`);
        setShowhingAlert(true);
        setTimeout(() => {
          onShow(false);
          setShowhingAlert(false);
          setLoadingRegiter(false);
          if (routeParam?.name === "AggreeEntrepreneur") {
            navigation.navigate("ProfileScreen");
            navigation.navigate("Home", { screen: "Inicio" });
            onShow(false);
            props.setOnBoardCurrent(0);
          } else {
            navigation.navigate("Home", { screen: "Inicio" });
            onShow(false);
            props.setOnBoardCurrent(0);
          }
          onShow(false);
          props.setOnBoardCurrent(0);
        }, 1000);
      } else {
        setLoadingRegiter(false);
        setTimeout(() => {
          setTextAlert(
            `Ha ocurrido un error. (Usuario ya existe o error de conexión)`
          );
          setShowhingAlert(true);
        }, 500);
      }
    }
  };

  const setPrevProcess = async () => {
    onShow(false);
    props.setOnBoardCurrent(3);
  };

  const onPic = () => {
    showPickerImage();
  };

  const onFront = () => {
    showPickerImageFront();
  };

  const NextButton = () => {
    if (currentSlide === 3) {
      return (
        <TouchableOpacity
          style={[styles.btnNext, styles.shadowSet]}
          onPress={setNextProcess}
        >
          <LabelTextComponent
            text={"Continuar"}
            color={GlobalVars.white}
            size={16}
          />
        </TouchableOpacity>
      );
    }

    return (
      <View style={[styles.btnNext, styles.shadowSet]}>
        <LabelTextComponent
          text={"Continuar"}
          color={GlobalVars.white}
          size={16}
        />
      </View>
    );
  };

  const onHandleSocialNetworks = (item) => {
    switch (item) {
      case "whatsapp":
        setShowWhatsapp(!showWhatsapp);
        break;

      case "instagram":
        setShowInstagram(!showInstagram);
        break;

      case "facebook":
        setShowFb(!showFb);
        break;

      case "tiktok":
        setShowTiktok(!showTiktok);
        break;

      case "llamada":
        setShowCalls(!showCalls);
        break;

      case "correo":
        setShowMail(!showMail);
        break;
    }
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
      case "llamada":
        uriOpen = Platform.OS === "android" ? `tel:${url}` : `telprompt:${url}`;
        break;
      case "correo":
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

  const setterAvatarConfig = (id, uri) => {
    if (props.setAvatarShop) props.setAvatarShop(id);
    if (props.setAvatarShopUri) props.setAvatarShopUri(uri);
  };

  const setterFrontConfig = (id, uri) => {
    if (props.setFrontShopPre) props.setFrontShopPre(id);
    if (props.setFrontShopUri) props.setFrontShopUri(uri);
  };

  if (!visible) return <></>;

  const optionAvatares =
    (avatares.length &&
      avatares.map((avatar) => {
        return (
          <TouchableOpacity
            key={"avatar_" + avatar?.id}
            style={[
              styles.avatarView,
              {
                borderWidth: props.avatarShop === avatar?.id ? 1 : 0,
                borderColor: GlobalVars.white,
                paddingVertical: props.avatarShop === avatar?.id ? 5 : 0,
              },
            ]}
            onPress={() =>
              setterAvatarConfig(avatar?.id, avatar?.attributes?.uriAvatar)
            }
          >
            <ImageUriComponent
              width={props.avatarShop ? "90%" : "100%"}
              height={props.avatarShop === avatar?.id ? 40 : 50}
              img={{ uri: avatar?.attributes?.uriAvatar }}
              mode="contain"
              borderTopRadius={25}
              borderBottomRadius={25}
            />
          </TouchableOpacity>
        );
      })) ||
    null;

  const optionFronts =
    (frontsOptions.length &&
      frontsOptions.map((front) => {
        return (
          <TouchableOpacity
            key={"front_" + front?.id}
            style={[
              styles.avatarView,
              {
                borderWidth: props.frontShopPre === front?.id ? 1 : 0,
                borderColor: GlobalVars.white,
                paddingVertical: props.frontShopPre === front?.id ? 5 : 0,
              },
            ]}
            onPress={() =>
              setterFrontConfig(front?.id, front?.attributes?.uriImage)
            }
          >
            <ImageUriComponent
              width={props.frontShopPre ? "90%" : "100%"}
              height={props.frontShopPre === front?.id ? 40 : 50}
              img={{ uri: front?.attributes?.uriImage }}
              mode="contain"
              borderTopRadius={25}
              borderBottomRadius={25}
            />
          </TouchableOpacity>
        );
      })) ||
    null;

  const optionsSocial =
    (socialNetworks.length &&
      socialNetworks.map((social) => {
        const nameSocial = social?.name || "";

        let socialIcon = null,
          inputSocial = null;

        switch (nameSocial) {
          case "whatsapp":
            socialIcon = (
              <View style={styles2.container}>
              <Image
                style={styles2.stretch}
                source={require("../../../../assets/whatsapp_white.png")}
              />
            </View>
            );

            inputSocial = (
              <View
                style={{
                  width: "100%",
                  display: showWhatsapp ? "flex" : "none",
                }}
              >
                <InputEntry
                  key={"social_entry_" + social?.id}
                  label="+563777300093"
                  textvariable={props.whatsapp}
                  setValue={(val) => props.setWhatsapp(val)}
                  type={"telephoneNumber"}
                  keyboard={"phone-pad"}
                />
              </View>
            );
            break;

          case "instagram":
            socialIcon = (
              <View style={styles2.container}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../../assets/instagram_white.png")}
                />
              </View>
            );

            inputSocial = (
              <View
                style={{
                  width: "100%",
                  display: showInstagram ? "flex" : "none",
                }}
              >
                <InputEntry
                  key={"social_entry_" + social?.id}
                  label="Link de tu página"
                  textvariable={props.instagram}
                  setValue={(val) => props.setInstagram(val.toLowerCase())}
                  type="URL"
                  keyboard="url"
                />
              </View>
            );
            break;

          case "facebook":
            socialIcon = (
              <View style={styles2.container}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../../assets/facebook_white.png")}
                />
              </View>
            );

            inputSocial = (
              <View
                style={{
                  width: "100%",
                  display: showFb ? "flex" : "none",
                }}
              >
                <InputEntry
                  key={"social_entry_" + social?.id}
                  label="Link de tu página"
                  textvariable={props.fb}
                  setValue={(val) => props.setFb(val.toLowerCase())}
                  type="URL"
                  keyboard="url"
                />
              </View>
            );
            break;

          case "tiktok":
            socialIcon = (
              <View style={styles2.container}>
              <Image
                style={styles2.stretch}
                source={require("../../../../assets/tik_tok_white.png")}
              />
            </View>
            );

            inputSocial = (
              <View
                style={{
                  width: "100%",
                  display: showTiktok ? "flex" : "none",
                }}
              >
                <InputEntry
                  key={"social_entry_" + social?.id}
                  label="Link de Tiktok"
                  textvariable={props.tiktok}
                  setValue={(val) => props.setTiktok(val.toLowerCase())}
                  type="URL"
                  keyboard="url"
                />
              </View>
            );
            break;

          case "llamada":
            socialIcon = (
              <View style={styles2.container}>
                <Image
                  style={styles2.stretch}
                  source={require("../../../../assets/fono_white.png")}
                />
              </View>
            );

            inputSocial = (
              <View
                style={{
                  width: "100%",
                  display: showCalls ? "flex" : "none",
                }}
              >
                <InputEntry
                  key={"social_entry_" + social?.id}
                  label="+563777300093"
                  textvariable={props.calls}
                  setValue={(val) => props.setCalls(val)}
                  type={"telephoneNumber"}
                  keyboard={"phone-pad"}
                />
              </View>
            );
            break;

          case "correo":
            socialIcon = (
              <View style={styles2.container}>
              <Image
                style={styles2.stretch}
                source={require("../../../../assets/mail_white.png")}
              />
            </View>
            );

            inputSocial = (
              <View
                style={{
                  width: "100%",
                  display: showMail ? "flex" : "none",
                }}
              >
                <InputEntry
                  key={"social_entry_" + social?.id}
                  label="Correo de contacto"
                  textvariable={props.mailTo}
                  setValue={(val) => props.setMailTo(val.toLowerCase())}
                  type="URL"
                  keyboard="url"
                />
              </View>
            );
            break;
        }

        return (
          <View style={{ width: "100%" }} key={"social_" + social?.id}>
            <TouchableOpacity
              style={[
                styles.socialView,
                {
                  borderWidth: props.socialNetwork === social?.name ? 1 : 0,
                  borderColor: GlobalVars.white,
                  paddingVertical: props.socialNetwork === social?.name ? 5 : 0,
                },
              ]}
              onPress={() => onHandleSocialNetworks(social?.name)}
            >
              {socialIcon}
              <View style={{ width: 15, height: "100%" }} />
              <LabelTextComponent
                text={social?.name || ""}
                color={GlobalVars.white}
                size={15}
                customStyleBtn={{ textTransform: "capitalize" }}
              />
            </TouchableOpacity>
            {inputSocial}
          </View>
        );
      })) ||
    null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onShow(false);
      }}
    >
      <ImageBackground
        source={require("../../../../assets/images/trama_bg.png")}
        resizeMode="cover"
        style={styles.bgView}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>
              <Swiper
                ref={swiper}
                key={5}
                index={0}
                loop={false}
                style={styles.wrapper}
                showsPagination={false}
                loadMinimalLoader={
                  <ActivityIndicator color={GlobalVars.orange} size="large" />
                }
                showsButtons
                buttonWrapperStyle={styles.btnWrapperStyle}
                nextButton={NextButton()}
                prevButton={<View style={{ display: "none" }} />}
                pagingEnabled
                bounces
                onIndexChanged={(index) => {
                  setCurrentSlide(index);
                }}
              >
                <View key={0} style={styles.itemContent}>
                  <View style={[styles.content, styles.shadowSet]}>
                    <View style={[styles.collection, { height: "100%" }]}>
                      <ScrollView
                        style={styles.viewScroll}
                        contentContainerStyle={[
                          styles.contentContainer,
                          {
                            paddingBottom: isKeyBoardOpen
                              ? GlobalVars.windowHeight / 3
                              : 25,
                          },
                        ]}
                      >
                        <LabelTextComponent
                          text="¿Tu negocio tiene redes
                        sociales?"
                          color={GlobalVars.white}
                          size={20}
                          customStyleBtn={{ textAlign: "left" }}
                        />
                        <LabelTextComponent
                          text="Selecciona e identifica las
                        plataformas de tu negocio. ¡No te
                        preocupes! podrás cambiarlo más
                        tarde."
                          color={GlobalVars.white}
                          size={15}
                          customStyleBtn={{ textAlign: "left" }}
                        />
                        {optionsSocial}
                      </ScrollView>
                    </View>
                  </View>
                </View>
                <View key={1} style={styles.itemContent}>
                  <View
                    style={[
                      styles.content,
                      styles.shadowSet,
                      {
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      },
                    ]}
                  >
                    <LabelTextComponent
                      text="¡Ya casi terminamos!"
                      color={GlobalVars.white}
                      size={20}
                      customStyleBtn={{ textAlign: "left", marginLeft: 10 }}
                    />
                    <LabelTextComponent
                      text="Sube el logo de tu negocio o selecciona uno de los que tenemos disponibles"
                      color={GlobalVars.white}
                      size={20}
                      customStyleBtn={{ textAlign: "left", marginLeft: 10 }}
                    />
                    <View
                      style={[
                        styles.collection,
                        { height: "40%", marginTop: 10 },
                      ]}
                    >
                      <ScrollView
                        style={styles.viewScroll}
                        contentContainerStyle={[
                          styles.contentContainer,
                          {
                            paddingBottom: isKeyBoardOpen
                              ? GlobalVars.windowHeight / 3
                              : 25,
                          },
                        ]}
                      >
                        <View style={styles.gridAvatars}>{optionAvatares}</View>
                      </ScrollView>
                    </View>
                    <TouchableOpacity
                      style={[styles.uploadPhoto, { alignSelf: "center" }]}
                      onPress={onPic}
                    >
                      <LabelTextComponent
                        text="Sube tu logo"
                        color={GlobalVars.firstColor}
                        size={15}
                        customStyleBtn={{ fontFamily: GlobalVars.fontButtons }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View key={2} style={styles.itemContent}>
                  <View
                    style={[
                      styles.content,
                      styles.shadowSet,
                      {
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      },
                    ]}
                  >
                    <LabelTextComponent
                      text="Ahora sube una imagen de portada para tu negocio."
                      color={GlobalVars.white}
                      size={20}
                      customStyleBtn={{ textAlign: "left", marginLeft: 10 }}
                    />
                    <LabelTextComponent
                      text="Esta imagen se verá en tu ficha de negocio acompañada de tu logo."
                      color={GlobalVars.white}
                      size={16}
                      customStyleBtn={{ textAlign: "left", marginLeft: 10 }}
                    />
                    <View
                      style={[
                        styles.collection,
                        { height: "40%", marginTop: 10 },
                      ]}
                    >
                      <ScrollView
                        style={styles.viewScroll}
                        contentContainerStyle={[
                          styles.contentContainer,
                          {
                            paddingBottom: isKeyBoardOpen
                              ? GlobalVars.windowHeight / 3
                              : 25,
                          },
                        ]}
                      >
                        <View style={styles.gridAvatars}>{optionFronts}</View>
                      </ScrollView>
                    </View>
                    <TouchableOpacity
                      style={[styles.uploadPhoto, { alignSelf: "center" }]}
                      onPress={onFront}
                    >
                      <LabelTextComponent
                        text="Sube tu portada"
                        color={GlobalVars.firstColor}
                        size={15}
                        customStyleBtn={{ fontFamily: GlobalVars.fontButtons }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View key={3} style={[styles.itemContent]}>
                  <View
                    style={[
                      styles.content,
                      styles.shadowSet,
                      { paddingTop: 0, paddingHorizontal: 0 },
                    ]}
                  >
                    <ScrollView
                      style={styles.viewScroll}
                      contentContainerStyle={[
                        styles.contentContainer,
                        {
                          paddingHorizontal: 0,
                          paddingBottom: isKeyBoardOpen
                            ? GlobalVars.windowHeight / 3
                            : 25,
                        },
                      ]}
                    >
                      {/* <View style={[styles.collection, styles.orderRows]}>
                        <LabelTextComponent
                          text="Nombre de tu negocio"
                          color={GlobalVars.white}
                          size={13}
                        />
                        <LabelTouchable
                          label="Editar"
                          color={GlobalVars.white}
                          sizeText={13}
                          onPress={() => setPrevProcess()}
                        />
                      </View> */}

                      <View
                        style={[
                          styles.collection,
                          { marginBottom: 75, position: "relative" },
                        ]}
                      >
                        {props.frontShop && (
                          <ImageUriComponent
                            width="100%"
                            height={GlobalVars.windowWidth / 2}
                            img={{ uri: props.frontShop?.uri }}
                            mode="cover"
                            borderBottomRadius={0}
                            borderTopRadius={7}
                          />
                        )}
                        {!props.frontShop &&
                          props.frontShopPre &&
                          props.frontShopUri && (
                            <ImageUriComponent
                              width="100%"
                              height={GlobalVars.windowWidth / 2}
                              img={{ uri: props.frontShopUri }}
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
                          {props.imageShop && (
                            <ImageUriComponent
                              // width={GlobalVars.windowWidth / 3}
                              // height={GlobalVars.windowWidth / 3}
                              img={{ uri: props.imageShop?.uri }}
                              mode="cover"
                              borderBottomRadius={75}
                              borderTopRadius={75}
                            />
                          )}
                          {!props.imageShop &&
                            props.avatarShop &&
                            props.avatarShopUri && (
                              <ImageUriComponent
                                // width={GlobalVars.windowWidth / 4}
                                // height={GlobalVars.windowWidth / 4}
                                img={{ uri: props.avatarShopUri }}
                                mode="cover"
                                borderBottomRadius={75}
                                borderTopRadius={75}
                              />
                            )}
                        </View>
                      </View>

                      <View
                        style={[styles.collection, { paddingHorizontal: 20 }]}
                      >
                        <LabelTextComponent
                          text={props?.shopName}
                          color={GlobalVars.white}
                          size={18}
                          customStyleBtn={{
                            marginVertical: 0,
                            textAlign: "justify",
                          }}
                        />

                        <LabelTextComponent
                          text={`${props.descriptionShop}`}
                          color={GlobalVars.white}
                          size={15}
                          customStyleBtn={{
                            marginVertical: 0,
                            textAlign: "justify",
                          }}
                        />
                      </View>

                      <View
                        style={[styles.collection, { paddingHorizontal: 20 }]}
                      >
                        <LabelTextComponent
                          text="Rubro"
                          color={GlobalVars.white}
                          size={15}
                          customStyleBtn={{
                            marginBottom: 0,
                            fontWeight: "bold",
                            textAlign: "left",
                          }}
                        />
                        <LabelTextComponent
                          text={props.shopCatName}
                          color={GlobalVars.white}
                          size={13}
                          customStyleBtn={{ marginTop: 0, textAlign: "left" }}
                        />
                        <View style={{ width: "100%", height: 1 }} />
                        <LabelTextComponent
                          text="Dirección"
                          color={GlobalVars.white}
                          size={15}
                          customStyleBtn={{
                            marginVertical: 0,
                            fontWeight: "bold",
                          }}
                        />
                        <LabelTextComponent
                          text={props.nameAddress}
                          color={GlobalVars.white}
                          size={13}
                          customStyleBtn={{ marginTop: 0, textAlign: "left" }}
                        />
                        <View style={{ width: "100%", height: 1 }} />
                        <LabelTextComponent
                          text="Días de atención"
                          color={GlobalVars.white}
                          size={15}
                          customStyleBtn={{
                            marginVertical: 0,
                            fontWeight: "bold",
                          }}
                        />
                        <LabelTextComponent
                          text={`${daysWorkStr}`}
                          color={GlobalVars.white}
                          size={15}
                          customStyleBtn={{
                            marginVertical: 0,
                          }}
                        />
                        <View style={{ width: "100%", height: 10 }} />
                        <LabelTextComponent
                          text="Horario de atención"
                          color={GlobalVars.white}
                          size={15}
                          customStyleBtn={{
                            marginVertical: 0,
                            fontWeight: "bold",
                            textAlign: "left",
                          }}
                        />
                        {!props.continuousHours && (
                          <LabelTextComponent
                            text={`${props.openHour} a ${props.closeHour} horas`}
                            color={GlobalVars.white}
                            size={13}
                            customStyleBtn={{
                              marginTop: 0,
                              textAlign: "left",
                            }}
                          />
                        )}
                        {props.continuousHours && (
                          <LabelTextComponent
                            text={`${props.openHourMorning} a ${props.closeHourMorning} am`}
                            color={GlobalVars.white}
                            size={13}
                            customStyleBtn={{
                              marginTop: 5,
                              marginBottom: 5,
                              textAlign: "left",
                            }}
                          />
                        )}
                        {props.continuousHours && (
                          <LabelTextComponent
                            text={`${props.openHourEvernoon} a ${props.closeHourEvernoon} pm`}
                            color={GlobalVars.white}
                            size={13}
                            customStyleBtn={{
                              marginTop: 0,
                              textAlign: "left",
                            }}
                          />
                        )}
                      </View>

                      <View
                        style={[styles.collection, { paddingHorizontal: 20 }]}
                      >
                        <LabelTextComponent
                          text="Contacto"
                          color={GlobalVars.white}
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
                              display: props.whatsapp ? "flex" : "none",
                              justifyContent: "flex-start",
                              paddingRight:50
                            },
                          ]}
                        >
                          <FontAwesome5
                            name="whatsapp"
                            size={25}
                            color={GlobalVars.white}
                          />
                          <View style={{ width: 20 }} />
                          <LabelTouchable
                            sizeText={15}
                            label={props.whatsapp}
                            color={GlobalVars.white}
                            onPress={() =>
                              handlePress(props.whatsapp, "whatsapp")
                            }
                          />
                        </View>

                        <View
                          style={[
                            styles.collection,
                            styles.orderRows,
                            {
                              display: props.instagram ? "flex" : "none",
                              justifyContent: "flex-start",
                              paddingRight:50
                            },
                          ]}
                        >
                          <Feather
                            name="instagram"
                            size={25}
                            color={GlobalVars.white}
                          />
                          <View style={{ width: 20 }} />
                          <LabelTouchable
                            sizeText={12}
                            label={props.instagram.toLowerCase()}
                            color={GlobalVars.white}
                            onPress={() =>
                              handlePress(props.instagram, "instagram")
                            }
                          />
                        </View>

                        <View
                          style={[
                            styles.collection,
                            styles.orderRows,
                            {
                              display: props.fb ? "flex" : "none",
                              justifyContent: "flex-start",
                              paddingRight:50
                            },
                          ]}
                        >
                          <Feather
                            name="facebook"
                            size={25}
                            color={GlobalVars.white}
                          />
                          <View style={{ width: 20 }} />
                          <LabelTouchable
                            sizeText={12}
                            label={props.fb.toLowerCase()}
                            color={GlobalVars.white}
                            onPress={() => handlePress(props.fb, "facebook")}
                          />
                        </View>

                        <View
                          style={[
                            styles.collection,
                            styles.orderRows,
                            {
                              display: props.tiktok ? "flex" : "none",
                              justifyContent: "flex-start",
                              paddingRight:50
                            },
                          ]}
                        >
                          <FontAwesome5
                            name="tiktok"
                            size={25}
                            color={GlobalVars.white}
                          />
                          <View style={{ width: 20 }} />
                          <LabelTouchable
                            sizeText={12}
                            label={props.tiktok}
                            color={GlobalVars.white}
                            onPress={() => handlePress(props.tiktok, "tiktok")}
                          />
                        </View>

                        <View
                          style={[
                            styles.collection,
                            styles.orderRows,
                            {
                              display: props.calls ? "flex" : "none",
                              justifyContent: "flex-start",
                            },
                          ]}
                        >
                          <Feather
                            name="phone-call"
                            size={25}
                            color={GlobalVars.white}
                          />
                          <View style={{ width: 20 }} />
                          <LabelTouchable
                            sizeText={15}
                            label={props.calls}
                            color={GlobalVars.white}
                            onPress={() => handlePress(props.calls, "calls")}
                          />
                        </View>

                        <View
                          style={[
                            styles.collection,
                            styles.orderRows,
                            {
                              display: props.mailTo ? "flex" : "none",
                              justifyContent: "flex-start",
                              paddingRight:50
                            },
                          ]}
                        >
                          <Feather
                            name="mail"
                            size={24}
                            color={GlobalVars.white}
                          />
                          <View style={{ width: 20 }} />
                          <LabelTouchable
                            sizeText={13}
                            label={props.mailTo}
                            color={GlobalVars.white}
                            onPress={() => handlePress(props.mailTo, "mails")}
                          />
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
                <View key={4} style={{ display: "none" }} />
              </Swiper>

              {/* {currentSlide === 3 && (
                <TouchableOpacity
                  style={[
                    styles.btnNext,
                    styles.shadowSet,
                    {
                      position: "absolute",
                      bottom:
                        GlobalVars.windowHeight < 725
                          ? "6.5%"
                          : GlobalVars.windowHeight >= 725 &&
                            GlobalVars.windowHeight < 780
                          ? "7.2%"
                          : GlobalVars.windowHeight > 780 &&
                            GlobalVars.windowHeight < 850
                          ? "8.5%"
                          : GlobalVars.windowHeight < 900
                          ? "0%"
                          : "9.9%",
                      left: 35,
                    },
                  ]}
                  onPress={setNextProcess}
                >
                  <LabelTextComponent
                    text={"Continuar"}
                    color={GlobalVars.white}
                    size={16}
                  />
                </TouchableOpacity>
              )} */}

              <TouchableOpacity
                style={styles.back}
                onPress={() => setPrevProcess()}
              >
                 <View style={styles2.container}>
                <Image
                    style={styles2.stretch}
                    source={require(".././../../../assets/back.png")}
                  />
                </View>
                <LabelTouchable
                  sizeText={15}
                  label="Volver"
                  color={GlobalVars.firstColor}
                  onPress={() => setPrevProcess()}
                />
              </TouchableOpacity>

              <ModalAlert
                text={textAlert}
                openModal={isShowingAlert}
                onHelp={() => setShowhingAlert(!isShowingAlert)}
              />

              <ModalFinish
                text="¡Muy bien! Espera unos segundos
              mientras creamos el perfil de tu
              negocio"
                openModal={loadingRegiter}
                onHelp={() => setLoadingRegiter(false)}
              />
            </View>
          </View>

          <ModalTemplate
            openModal={isOpenPickerImage}
            onHelp={() => showPickerImage()}
            aditionalStyleModal={{
              justifyContent: "center",
              alignItems: "center",
            }}
            aditionalStyleContainer={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <PickerImage
              imageShop={props.imageShop}
              onClose={() => showPickerImage()}
              handleImg={props.setImageShop}
            />
          </ModalTemplate>

          <ModalTemplate
            openModal={isOpenPickerImageFront}
            onHelp={() => showPickerImageFront()}
            aditionalStyleModal={{
              justifyContent: "center",
              alignItems: "center",
            }}
            aditionalStyleContainer={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <PickerImage
              imageShop={props.frontShop}
              onClose={() => showPickerImageFront()}
              handleImg={props.setFrontShop}
              isFront
            />
          </ModalTemplate>
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default OnBoarding4;

const styles2 = StyleSheet.create({
  container: {
    width:35,
    height:35,
    left:-42
  },
  stretch: {
    width: 35,
    height: 35,
    resizeMode: "stretch",
    left: 45,
  },
  containerFocus:{
    width: 42,
    height: 42,
  },
  stretchFocus:{
    width: 42,
    height: 42,
  }
});
