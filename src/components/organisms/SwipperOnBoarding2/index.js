import React from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import { Checkbox, Radio, Select, Modal } from "native-base";

import { AntDesign } from "@expo/vector-icons";

import Swiper from "react-native-swiper";

import { useNavigation } from "@react-navigation/native";

import GlobalVars from "../../../global/globalVars";

import { GET_COUNTRIES } from "../../../mock/countries";
import { GET_CATEGORIES } from "../../../mock/categories";
import { GET_AVATARES } from "../../../mock/avatares";

import { useKeyboard } from "../../../utils/useKeyboard";

import LabelTextComponent from "../../atoms/LabelText";
import ImageUriComponent from "../../atoms/ImageUriComponent";
import InputEntry from "../../molecules/InputEntry";
import LabelTouchable from "../../molecules/LabelTouchable";
import ScrollView from "../../templates/ScrollView";
import ModalAlert from "../../templates/ModalAlert";

import Styles from "./style";

const styles = Styles;

const OnBoarding2 = ({ onBoardCurrent, ...props }) => {
  const navigation = useNavigation();
  const isKeyBoardOpen = useKeyboard();

  const [visible, onShow] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [avatares, setAvatares] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const [textAlert, setTextAlert] = React.useState("");
  const [isShowingAlert, setShowhingAlert] = React.useState(false);

  const [loadingRegiter, setLoadingRegiter] = React.useState(false);

  const swiper = React.useRef(null);

  React.useEffect(() => {
    /** GET DATA */
    onRecoverCountries();
    onRecoverCategories();
    onRecoverAvatars();
  }, []);

  React.useEffect(() => {
    if (onBoardCurrent === 2) {
      // deleteP();
      onShow(true);
    }
  }, [onBoardCurrent]);

  React.useEffect(() => {
    if (currentSlide === 4) {
      swiper.current.scrollBy(-1);
    }
  }, [currentSlide]);

  const onRecoverCountries = async () => {
    const res = await GET_COUNTRIES();
    if (res) {
      props.setCountry(res[0].id);
    }
  };

  const onRecoverCategories = async () => {
    const res = await GET_CATEGORIES();
    setCategories(res);
  };

  const onRecoverAvatars = async () => {
    const res = await GET_AVATARES();
    setAvatares(res);
  };

  const setNextProcess = async () => {
    if (!props.name) {
      setTextAlert("Falta su nombre");
      setShowhingAlert(true);
      return;
    } else if (!props.lastNames) {
      setTextAlert("Faltan sus apellidos");
      setShowhingAlert(true);
      return;
    } else if (!props.phoneNumber) {
      setTextAlert("Falta su número telefónico");
      setShowhingAlert(true);
      return;
    } else if (!props.mail) {
      setTextAlert("Falta su correo electrónico");
      setShowhingAlert(true);
      return;
    } else if (props?.likedCats.length === 0) {
      setTextAlert("Seleccione al menos 1 categoría de su interés");
      setShowhingAlert(true);
      return;
    } else if (!props.avatarSelected) {
      setTextAlert("Seleccione un avatar");
      setShowhingAlert(true);
      return;
    } else if (!props.hasShop) {
      setTextAlert("Indique si tiene un emprendimiento");
      setShowhingAlert(true);
      return;
    } else if (!props.passwd || props.passwd.length < 6) {
      setTextAlert("Contraseña debe contener al menos 6 caracteres");
      setShowhingAlert(true);
      return;
    } else if (props.passwd !== props.confirmPass || props.passwd.length < 6) {
      setTextAlert("La verificación de contraseña es incorrecta");
      setShowhingAlert(true);
      return;
    } else {
      if (props?.hasShop === "si") {
        onShow(false);
        props.setOnBoardCurrent(3);
      } else {
        // resgistrar usuario
        setLoadingRegiter(true);
        const res = await props.onRegister();
        if (res) {
          setTimeout(() => {
            setLoadingRegiter(false);
            props.setOnBoardCurrent(0);
            onShow(false);
            navigation.navigate("Home", { screen: "Inicio" });
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
    }
  };

  const setPrevProcess = async () => {
    onShow(false);
    props.setOnBoardCurrent(1);
  };

  const NextButton = () => {
    if (currentSlide === 0) {
      if (
        props?.passwd?.length < 6 ||
        props?.confirmPass?.length < 6 ||
        props?.passwd !== props?.confirmPass
      ) {
        return (
          <TouchableOpacity
            style={[styles.btnNext, styles.shadowSet]}
            onPress={() => {
              setTextAlert("La verificación de contraseña es incorrecta");
              setShowhingAlert(true);
              setTimeout(() => {
                setShowhingAlert(false);
              }, 1500);
            }}
          >
            <LabelTextComponent
              text={"Continuar"}
              color={GlobalVars.white}
              size={16}
            />
          </TouchableOpacity>
        );
      } else {
        return (
          <View style={[styles.btnNext, styles.shadowSet]}>
            <LabelTextComponent
              text={"Continuar"}
              color={GlobalVars.white}
              size={16}
            />
          </View>
        );
      }
    }

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

  if (!visible) return null;

  const optionsCategories =
    (categories.length &&
      categories.map((category) => {
        return (
          <View key={"category_" + category?.id} style={styles.checBoxView}>
            <Checkbox
              value={category?.id}
              my={2}
              bgColor={GlobalVars.white}
              borderColor={GlobalVars.white}
              colorScheme="orange"
              borderWidth="2"
              // _checked={{ borderColor: GlobalVars.firstColor }}
              _pressed={{ tintColor: GlobalVars.white }}
              _text={{ color: GlobalVars.white }}
              // _hover={{ borderColor: GlobalVars.white }}
              _icon={{ color: GlobalVars.firstColor }}
            >
              {category?.attributes?.category}
            </Checkbox>
          </View>
        );
      })) ||
    null;

  const optionAvatares =
    (avatares.length &&
      avatares.map((avatar) => {
        return (
          <TouchableOpacity
            key={"avatar_" + avatar?.id}
            style={[
              styles.avatarView,
              {
                borderWidth: props.avatarSelected === avatar?.id ? 1 : 0,
                borderColor: GlobalVars.white,
                paddingVertical: props.avatarSelected === avatar?.id ? 5 : 0,
              },
            ]}
            onPress={() =>
              props.setAvatarSelected
                ? props.setAvatarSelected(avatar?.id)
                : null
            }
          >
            <ImageUriComponent
              width={props.avatarSelected ? "90%" : "100%"}
              height={props.avatarSelected === avatar?.id ? 40 : 50}
              img={{ uri: avatar?.attributes?.uriAvatar }}
              mode="contain"
              borderTopRadius={25}
              borderBottomRadius={25}
            />
          </TouchableOpacity>
        );
      })) ||
    null;

  return (
    <Modal isOpen={visible} onClose={() => onShow(false)}>
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
                  <ActivityIndicator color={GlobalVars.white} size="large" />
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
                    <View style={styles.collection}>
                      <ScrollView
                        style={[styles.viewScroll]}
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
                          text={`Añade tus datos personales y de contacto`}
                          color={GlobalVars.white}
                          size={20}
                          customStyleBtn={{ textAlign: "left" }}
                        />

                        <InputEntry
                          label="Nombres *"
                          textvariable={props.name || ""}
                          setValue={(val) =>
                            props.setName ? props.setName(val) : null
                          }
                          noStylesSpaces
                        />
                        <InputEntry
                          label="Apellidos *"
                          textvariable={props.lastNames || ""}
                          setValue={(val) =>
                            props.setLastNames ? props.setLastNames(val) : null
                          }
                          noStylesSpaces
                        />
                        <InputEntry
                          label="Celular *    +5691..."
                          textvariable={props.phoneNumber || ""}
                          type={"telephoneNumber"}
                          keyboard={"phone-pad"}
                          setValue={(val) =>
                            props.setPhoneNumber
                              ? props.setPhoneNumber(val)
                              : null
                          }
                          noStylesSpaces
                        />
                        <InputEntry
                          label="Correo electrónico *"
                          textvariable={props.mail || ""}
                          type={"emailAddress"}
                          keyboard={"email-address"}
                          setValue={(val) =>
                            props.setMail ? props.setMail(val) : null
                          }
                          noStylesSpaces
                        />

                        {/* <Select
                        selectedValue={props.country}
                        accessibilityLabel="País"
                        placeholder="País"
                        fontFamily={GlobalVars.fontFamily}
                        width={GlobalVars.windowWidth / 2}
                        color={GlobalVars.white}
                        borderColor={GlobalVars.orange}
                        backgroundColor={GlobalVars.orange}
                        marginTop={2}
                        marginBottom={2}
                        placeholderTextColor={GlobalVars.white}
                        _selectedItem={{
                          bg: "orange.100",
                          endIcon: (
                            <AntDesign
                              name="check"
                              size={20}
                              color={GlobalVars.orange}
                            />
                          ),
                          borderColor: GlobalVars.orange,
                        }}
                        _hover={{
                          backgroundColor: GlobalVars.blueOpaque,
                          color: GlobalVars.white,
                        }}
                        customDropdownIconProps={{
                          color: GlobalVars.white,
                          marginRight: 2,
                        }}
                        onValueChange={(itemValue) =>
                          props.setCountry(itemValue)
                        }
                      >
                        {optionsCountries}
                      </Select> */}

                        <InputEntry
                          label="Contraseña"
                          textvariable={props.passwd || ""}
                          setValue={(val) =>
                            props.setPasswd ? props.setPasswd(val) : null
                          }
                          visibility
                          pass
                          noStylesSpaces
                        />
                        <LabelTextComponent
                          text={`Tu contraseña debe tener al menos 6 caracteres \n (Sugerencia: utiliza letras y números)`}
                          color={GlobalVars.white}
                          size={12}
                        />

                        <InputEntry
                          label="Repetir Contraseña"
                          textvariable={props.confirmPass || ""}
                          setValue={(val) =>
                            props.setConfirmPass
                              ? props.setConfirmPass(val)
                              : null
                          }
                          visibility
                          pass
                          noStylesSpaces
                        />

                        {/* {((props?.passwd?.length < 6 &&
                          props?.confirmPass?.length < 6) ||
                          props.confirmPass !== props?.passwd) && (
                          <LabelTextComponent
                            text={`* Contraseña inválida, favor verificar`}
                            color={GlobalVars.white}
                            size={12}
                          />
                        )} */}
                      </ScrollView>
                    </View>
                  </View>
                </View>
                <View key={1} style={styles.itemContent}>
                  <View style={[styles.content, styles.shadowSet]}>
                    <View style={styles.collection}>
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
                        colorScrollBar={GlobalVars.white}
                      >
                        <LabelTextComponent
                          text="¿Qué buscas?"
                          color={GlobalVars.white}
                          size={20}
                          customStyleBtn={{ textAlign: "left" }}
                        />
                        <LabelTextComponent
                          text="Nos ayudará a darte una mejor experiencia con la app"
                          color={GlobalVars.white}
                          size={15}
                          customStyleBtn={{ textAlign: "left" }}
                        />

                        <Checkbox.Group
                          style={styles.checkGroupBoxView}
                          defaultValue={props.likedCats || []}
                          onChange={(newValues) => {
                            props.setLikedCats
                              ? props.setLikedCats(newValues)
                              : null;
                          }}
                        >
                          {!categories?.length && (
                            <ActivityIndicator
                              color={GlobalVars.white}
                              size="large"
                              style={{ alignSelf: "center" }}
                            />
                          )}
                          {optionsCategories}
                        </Checkbox.Group>
                      </ScrollView>
                    </View>
                  </View>
                </View>
                <View key={2} style={styles.itemContent}>
                  <View style={[styles.content, styles.shadowSet]}>
                    <View style={styles.collection}>
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
                        colorScrollBar={GlobalVars.firstColor}
                      >
                        <LabelTextComponent
                          text="Elige un avatar especial para ti"
                          color={GlobalVars.white}
                          size={20}
                          customStyleBtn={{ textAlign: "left" }}
                        />
                        <LabelTextComponent
                          text="¡No te preocupes! podrás cambiarlo
                        más tarde"
                          color={GlobalVars.white}
                          size={15}
                          customStyleBtn={{ textAlign: "left" }}
                        />
                        <View style={styles.gridAvatars}>
                          {!avatares.length && (
                            <ActivityIndicator
                              size="large"
                              color={GlobalVars.white}
                              style={{ alignSelf: "center" }}
                            />
                          )}
                          {optionAvatares}
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </View>
                <View key={3} style={styles.itemContent}>
                  <View style={[styles.content, styles.shadowSet]}>
                    <View
                      style={[
                        styles.collection,
                        {
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          paddingHorizontal: 10,
                        },
                      ]}
                    >
                      <LabelTextComponent
                        text="¿Tienes un negocio en
                      Antofagasta? ¡Regístralo!"
                        color={GlobalVars.white}
                        size={23}
                        customStyleBtn={{ textAlign: "left" }}
                      />
                      <LabelTextComponent
                        text="Poténcialo junto a la economía local
                      de tu barrio"
                        color={GlobalVars.white}
                        size={15}
                        customStyleBtn={{ textAlign: "left" }}
                      />

                      <Radio.Group
                        name="HasShop"
                        value={props.hasShop}
                        onChange={(nextValue) => {
                          props.setHasShop ? props.setHasShop(nextValue) : null;
                        }}
                      >
                        <Radio
                          value="si"
                          my={1}
                          bgColor={GlobalVars.white}
                          borderColor={GlobalVars.white}
                          colorScheme="orange"
                          // _checked={{ borderColor: GlobalVars.white }}
                          // _pressed={{ tintColor: GlobalVars.white }}
                          _text={{ color: GlobalVars.white }}
                          _hover={{ borderColor: GlobalVars.orange }}
                        >
                          Sí, quiero registrarlo
                        </Radio>
                        <View style={styles.mb20} />
                        <Radio
                          value="no"
                          my={1}
                          bgColor={GlobalVars.white}
                          borderColor={GlobalVars.white}
                          colorScheme="orange"
                          // _checked={{ borderColor: GlobalVars.white }}
                          // _pressed={{ tintColor: GlobalVars.white }}
                          _text={{ color: GlobalVars.white }}
                          _hover={{ borderColor: GlobalVars.orange }}
                        >
                          No, solo estoy buscando
                        </Radio>
                      </Radio.Group>
                    </View>
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

              {/* {currentSlide === 0 &&
              (props?.passwd?.length < 6 ||
                props?.confirmPass?.length < 6 ||
                props?.passwd !== props?.confirmPass) ? (
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
                  onPress={() => {
                    setTextAlert("La verificación de contraseña es incorrecta");
                    setShowhingAlert(true);
                    setTimeout(() => {
                      setShowhingAlert(false);
                    }, 1500);
                  }}
                >
                  <LabelTextComponent
                    text={"Continuar"}
                    color={GlobalVars.white}
                    size={16}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )} */}

              <TouchableOpacity
                style={styles2.container}
                onPress={() => setPrevProcess()}
              >
                {/* <Entypo name="chevron-left" size={size} color={color} /> */}

                <View style={styles2.container}>
                  <Image
                    style={styles2.stretch}
                    source={require(".././../../../assets/back.png")}
                  />
                </View>
                <LabelTouchable
                  customStyleTxt={{ left: "100%" }}
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

              <ModalAlert
                text={`¡Muy bien!, Un momento mientras creamos tu perfil.`}
                openModal={loadingRegiter}
                onHelp={() => setLoadingRegiter(true)}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default OnBoarding2;


const styles2 = StyleSheet.create({
  container: {
    width: 100,
    height:35,
    display: "flex",
    flexDirection: 'row',
    position: "absolute",
    top: GlobalVars.windowHeight < 725 ? "2.5%" : "5%",
    left: "8%",
  },
  stretch: {
    width: 35,
    height: 35,
    resizeMode: "stretch",
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