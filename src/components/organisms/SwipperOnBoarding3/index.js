import React from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Text,
} from "react-native";

import CheckboxExpo from "expo-checkbox";

import { Checkbox, Select, Modal } from "native-base";

import { AntDesign } from "@expo/vector-icons";

import Swiper from "react-native-swiper";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import GlobalVars from "../../../global/globalVars";

import { GET_CATEGORIES } from "../../../mock/categories";
import { daysCollection } from "../../../mock/daysCollection";
import { hoursCollection } from "../../../mock/hoursCollection";

import { useKeyboard } from "../../../utils/useKeyboard";

import LabelTextComponent from "../../atoms/LabelText";
import InputEntry from "../../molecules/InputEntry";
import LabelTouchable from "../../molecules/LabelTouchable";
import MapViewComponent from "../MapView";
import ScrollView from "../../templates/ScrollView";
import ModalAlert from "../../templates/ModalAlert";

import Styles from "./style";
import { Image } from "react-native";
import { StyleSheet } from "react-native";

const styles = Styles;

const OnBoarding3 = ({ onBoardCurrent, ...props }) => {
  const isKeyBoardOpen = useKeyboard();

  const [visible, onShow] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [categories, setCategories] = React.useState([]);

  const [textAlert, setTextAlert] = React.useState("");
  const [isShowingAlert, setShowhingAlert] = React.useState(false);

  const swiper = React.useRef(null);

  React.useEffect(() => {
    /** GET DATA */
    onRecoverCategories();
  }, []);

  React.useEffect(() => {
    if (onBoardCurrent === 3) {
      // deleteP();
      onShow(true);
    }
  }, [onBoardCurrent]);

  React.useEffect(() => {
    if (currentSlide === 4) {
      swiper.current.scrollBy(-1);
    }
  }, [currentSlide]);

  const onRecoverCategories = async () => {
    const res = await GET_CATEGORIES();
    setCategories(res);
  };

  const setNextProcess = async () => {
    if (!props.shopName) {
      setTextAlert("Falta el nombre de su negocio");
      setShowhingAlert(true);
    } else if (!props.descriptionShop) {
      setTextAlert("Agregue una pequeña descripción de su negocio");
      setShowhingAlert(true);
    } else if (!props.shopCat) {
      setTextAlert("Agregue una categoría para su negocio");
      setShowhingAlert(true);
    } else if (!props.nameAddress) {
      setTextAlert("Agregue una dirección para su negocio");
      setShowhingAlert(true);
    } else if (props.daysWork.length === 0) {
      setTextAlert("Agregue los días que atiende");
      setShowhingAlert(true);
    } else {
      onShow(false);
      props.setOnBoardCurrent(4);
    }
  };

  const setPrevProcess = async () => {
    if (props.returnToScreen) {
      props.navigation.goBack();
    } else {
      onShow(false);
      props.setOnBoardCurrent(3);
    }
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

  const setCoordinates = (params) => {
    if (props.setCoords && params?.latitude && params?.longitude) {
      props.setCoords({
        latitude: params?.latitude,
        longitude: params?.longitude,
      });
    }
  };

  if (!visible) return <></>;

  const optionsCategories = (categories.length &&
    categories.map((category) => {
      return (
        <Select.Item
          key={"category_" + category?.id}
          label={category?.attributes?.category}
          value={category?.id}
        />
      );
    })) || <></>;

  const optionsDays = (daysCollection.length &&
    daysCollection.map((day) => {
      return (
        <View key={"days_" + day?.id} style={styles.checBoxView}>
          <Checkbox
            value={day?.name}
            my={2}
            bgColor={GlobalVars.white}
            borderColor={GlobalVars.white}
            colorScheme="orange"
            borderWidth="2"
            _checked={{ borderColor: GlobalVars.firstColor }}
            _pressed={{ tintColor: GlobalVars.firstColor }}
            _text={{ color: GlobalVars.white }}
            _hover={{ borderColor: GlobalVars.orange }}
            _icon={{ color: GlobalVars.firstColor }}
          >
            {day?.name}
          </Checkbox>
        </View>
      );
    })) || <></>;

  const optionsHours = (hoursCollection.length &&
    hoursCollection.map((hour) => {
      return (
        <Select.Item
          key={"hour_" + hour?.id}
          label={hour?.hour}
          value={hour?.hour}
        />
      );
    })) || <></>;

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
                      >
                        <LabelTextComponent
                          text={`¡Perfecto! Registremos tu negocio`}
                          color={GlobalVars.white}
                          size={20}
                          customStyleBtn={{ textAlign: "left" }}
                        />

                        <LabelTextComponent
                          text="Nombre de tu negocio"
                          color={GlobalVars.white}
                          size={15}
                          customStyleBtn={{
                            textAlign: "left",
                            fontFamily: GlobalVars.fontButtons,
                          }}
                        />
                        <InputEntry
                          label="Ej.: Restaurante Familiar"
                          noMarginH
                          textvariable={props.shopName}
                          setValue={(val) => props.setShopName(val)}
                          noStylesSpaces
                        />
                        <LabelTextComponent
                          text="Descripción de tu negocio"
                          color={GlobalVars.white}
                          size={15}
                          customStyleBtn={{
                            fontFamily: GlobalVars.fontButtons,
                          }}
                        />
                        <InputEntry
                          label="Ej.: Almacén de alimentos..."
                          noMarginH
                          textvariable={props.descriptionShop}
                          setValue={(val) => props.setDescriptionShop(val)}
                          noStylesSpaces
                        />

                        <View
                          style={{
                            width: "100%",
                            paddingTop: 20,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {!categories.length && (
                            <ActivityIndicator
                              size="large"
                              color={GlobalVars.white}
                              style={{ alignSelf: "center" }}
                            />
                          )}
                          {categories.length ? (
                            <Select
                              selectedValue={props.shopCat}
                              accessibilityLabel="Selecciona rubro"
                              placeholder="Selecciona rubro"
                              fontFamily={GlobalVars.fontFamily}
                              width={GlobalVars.windowWidth / 1.35}
                              color={GlobalVars.firstColor}
                              borderColor={GlobalVars.white}
                              backgroundColor={GlobalVars.white}
                              marginTop={1}
                              placeholderTextColor={GlobalVars.firstColor}
                              _selectedItem={{
                                bg: "orange.100",
                                endIcon: (
                                  <></>
                                ),
                                borderColor: GlobalVars.firstColor,
                              }}
                              _hover={{
                                backgroundColor: GlobalVars.thirdOrange,
                                color: GlobalVars.thirdOrange,
                              }}
                              customDropdownIconProps={{
                                color: GlobalVars.thirdOrange,
                                marginRight: 2,
                              }}
                              onValueChange={(itemValue) => {
                                props.setShopCat(itemValue);
                                const CatTemp = categories.filter(
                                  (item) => item?.id === itemValue
                                );
                                props.setShopCatName(
                                  CatTemp[0].attributes?.category
                                );
                              }}
                            >
                              {optionsCategories}
                            </Select>
                          ) : (
                            <></>
                          )}
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </View>
                <View key={1} style={styles.itemContent}>
                  <View
                    style={[
                      styles.content,
                      styles.shadowSet,
                      { overflow: "hidden" },
                    ]}
                  >
                    <View
                      style={[
                        styles.collection,
                        {
                          alignItems: "center",
                          justifyContent: "center",
                        },
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
                        keyboardShouldPersistTaps="always"
                      >
                        <LabelTextComponent
                          text="¿Dónde se ubica tu negocio?"
                          color={GlobalVars.white}
                          size={20}
                          customStyleBtn={{ textAlign: "left" }}
                        />
                        <LabelTextComponent
                          text="Ayúdanos a mejorar la experiencia de los demás en la app."
                          color={GlobalVars.white}
                          size={15}
                          customStyleBtn={{ textAlign: "left" }}
                        />

                        {/* <InputSearch
                          label="Dirección de tu negocio"
                          iconName={props.nameAddress ? "x" : "search"}
                          textvariable={props.nameAddress || ""}
                          setValue={(val) =>
                            props.setNameAddres
                              ? props.setNameAddres(val)
                              : null
                          }
                        /> */}
                        <GooglePlacesAutocomplete
                          placeholder="Dirección de tu negocio*"
                          fetchDetails={true}
                          minLength={3}
                          onPress={(data, details = null) => {
                            // console.log(data, details);
                            props.setNameAddres
                              ? props.setNameAddres(data?.description || "")
                              : null;
                            if (
                              details?.geometry?.location?.lat &&
                              details.geometry.location.lng
                            ) {
                              setCoordinates({
                                latitude: details?.geometry?.location?.lat,
                                longitude: details.geometry.location.lng,
                              });
                            }
                          }}
                          onFail={(error) => console.error(error)}
                          query={{
                            key: GlobalVars.API_GCP,
                            language: "es",
                          }}
                          styles={{
                            description: {
                              fontWeight: "bold",
                            },
                            container: {
                              flex: 0,
                              width: "100%",
                              borderBottomColor: GlobalVars.black,
                            },
                            listView: {
                              backgroundColor: GlobalVars.white,
                            },
                          }}
                          GooglePlacesSearchQuery={{ rankby: "distance" }}
                          listViewDisplayed={false}
                          keepResultsAfterBlur={
                            Platform.OS === "android" ? true : true
                          }
                          autoFocus={false}
                          returnKeyType={"default"}
                          numberOfLines={2}
                          enablePoweredByContainer={false}
                        />
                        <View style={styles.mapContainer}>
                          {(props.coords?.latitude &&
                            props.coords?.longitude && (
                              <MapViewComponent
                                coords={props.coords || false}
                                onChangeCoords={setCoordinates}
                              />
                            )) || <></>}
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </View>
                <View key={2} style={styles.itemContent}>
                  <View
                    style={[
                      styles.content,
                      styles.shadowSet,
                      { alignItems: "flex-start", paddingHorizontal: 10 },
                    ]}
                  >
                    <LabelTextComponent
                      text="¿Qué días atiendes?"
                      color={GlobalVars.white}
                      size={23}
                      customStyleBtn={{ textAlign: "left" }}
                    />
                    <LabelTextComponent
                      text="Elije los días que abre tu Negocio.
                    No te preocupes, podrás cambiarlo
                    más tarde."
                      color={GlobalVars.white}
                      size={15}
                      customStyleBtn={{ textAlign: "left" }}
                    />
                    <View style={styles.collection}>
                      <ScrollView
                        style={styles.viewScroll}
                        contentContainerStyle={[
                          styles.contentContainer,
                          {
                            paddingBottom: isKeyBoardOpen
                              ? GlobalVars.windowHeight / 3
                              : 100,
                          },
                        ]}
                      >
                        <Checkbox.Group
                          style={styles.checkGroupBoxView}
                          defaultValue={props.daysWork || []}
                          onChange={(newValues) => {
                            props.setDaysWork
                              ? props.setDaysWork(newValues)
                              : null;
                          }}
                        >
                          {!optionsDays && (
                            <ActivityIndicator
                              color={GlobalVars.orange}
                              size="large"
                              style={{ alignSelf: "center" }}
                            />
                          )}
                          {optionsDays}
                        </Checkbox.Group>
                      </ScrollView>
                    </View>
                  </View>
                </View>
                <View key={3} style={styles.itemContent}>
                  <View
                    style={[
                      styles.content,
                      styles.shadowSet,
                      { alignItems: "flex-start", paddingHorizontal: 10 },
                    ]}
                  >
                    <LabelTextComponent
                      text="¿En qué horario atiendes?"
                      color={GlobalVars.white}
                      size={23}
                      customStyleBtn={{ textAlign: "left" }}
                    />
                    <LabelTextComponent
                      text="Selecciona tu horario de atención.
                    No te preocupes, podrás cambiarlo
                    más tarde."
                      color={GlobalVars.white}
                      size={15}
                      customStyleBtn={{ textAlign: "left" }}
                    />
                    <LabelTextComponent
                      text="Horario de atención"
                      color={GlobalVars.white}
                      size={20}
                      customStyleBtn={{ textAlign: "left" }}
                    />
                    <View style={styles.collection}>
                      {!props.continuousHours && (
                        <>
                          <View
                            style={[
                              styles.rowHour,
                              { justifyContent: "space-between" },
                            ]}
                          >
                            <LabelTextComponent
                              text="Desde: "
                              color={GlobalVars.white}
                              size={15}
                            />
                            <View style={styles.columnSeparator} />
                            <Select
                              selectedValue={props.openHour}
                              accessibilityLabel="Apertura"
                              placeholder="Apertura"
                              fontFamily={GlobalVars.fontFamily}
                              width={150}
                              color={GlobalVars.firstColor}
                              borderColor={GlobalVars.white}
                              backgroundColor={GlobalVars.white}
                              _selectedItem={{
                                bg: "orange.100",
                                endIcon: (
                                  <AntDesign
                                    name="check"
                                    size={20}
                                    color={GlobalVars.firstColor}
                                  />
                                ),
                                borderColor: GlobalVars.firstColor,
                              }}
                              _hover={{
                                backgroundColor: GlobalVars.thirdOrange,
                                color: GlobalVars.thirdOrange,
                              }}
                              customDropdownIconProps={{
                                color: GlobalVars.thirdOrange,
                                marginRight: 2,
                              }}
                              onValueChange={(itemValue) =>
                                props.setOpenHour(itemValue)
                              }
                            >
                              {optionsHours}
                            </Select>
                          </View>
                          <View
                            style={[
                              styles.rowHour,
                              { justifyContent: "space-between" },
                            ]}
                          >
                            <LabelTextComponent
                              text="Hasta: "
                              color={GlobalVars.white}
                              size={15}
                            />
                            <View style={styles.columnSeparator} />
                            <Select
                              selectedValue={props.closeHour}
                              accessibilityLabel="Apertura"
                              placeholder="Apertura"
                              fontFamily={GlobalVars.fontFamily}
                              width={150}
                              color={GlobalVars.firstColor}
                              borderColor={GlobalVars.white}
                              backgroundColor={GlobalVars.white}
                              _selectedItem={{
                                bg: "orange.100",
                                endIcon: (
                                  <AntDesign
                                    name="check"
                                    size={20}
                                    color={GlobalVars.firstColor}
                                  />
                                ),
                                borderColor: GlobalVars.firstColor,
                              }}
                              _hover={{
                                backgroundColor: GlobalVars.thirdOrange,
                                color: GlobalVars.white,
                              }}
                              customDropdownIconProps={{
                                color: GlobalVars.thirdOrange,
                                marginRight: 2,
                              }}
                              onValueChange={(itemValue) =>
                                props.setCloseHour(itemValue)
                              }
                            >
                              {optionsHours}
                            </Select>
                          </View>
                        </>
                      )}

                      {props.continuousHours && (
                        <>
                          <View
                            style={[
                              styles.rowHour,
                              { justifyContent: "space-between" },
                            ]}
                          >
                            <LabelTextComponent
                              text="Mañana: "
                              color={GlobalVars.white}
                              size={15}
                            />
                            <View style={{ width: 20, height: "100%" }} />
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Select
                                selectedValue={props.openHourMorning}
                                accessibilityLabel="Apertura"
                                placeholder="Apertura"
                                fontFamily={GlobalVars.fontFamily}
                                width={75}
                                color={GlobalVars.orange}
                                borderColor={GlobalVars.white}
                                backgroundColor={GlobalVars.white}
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
                                  backgroundColor: GlobalVars.white,
                                  color: GlobalVars.orange,
                                }}
                                customDropdownIconProps={{
                                  color: GlobalVars.orange,
                                  marginRight: 2,
                                }}
                                onValueChange={(itemValue) =>
                                  props.setOpenHourMorning
                                    ? props.setOpenHourMorning(itemValue)
                                    : null
                                }
                              >
                                {optionsHours}
                              </Select>
                              <View style={{ width: 20, height: "100%" }} />
                              <Select
                                selectedValue={props.closeHourMorning}
                                accessibilityLabel="Cierre"
                                placeholder="Cierre"
                                fontFamily={GlobalVars.fontFamily}
                                width={75}
                                color={GlobalVars.orange}
                                borderColor={GlobalVars.white}
                                backgroundColor={GlobalVars.white}
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
                                  backgroundColor: GlobalVars.white,
                                  color: GlobalVars.orange,
                                }}
                                customDropdownIconProps={{
                                  color: GlobalVars.orange,
                                  marginRight: 2,
                                }}
                                onValueChange={(itemValue) =>
                                  props.setCloseHourMorning
                                    ? props.setCloseHourMorning(itemValue)
                                    : null
                                }
                              >
                                {optionsHours}
                              </Select>
                            </View>
                          </View>

                          <View
                            style={[
                              styles.rowHour,
                              { justifyContent: "space-between" },
                            ]}
                          >
                            <LabelTextComponent
                              text="Tarde: "
                              color={GlobalVars.white}
                              size={15}
                            />
                            <View style={{ width: 20, height: "100%" }} />
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Select
                                selectedValue={props.openHourEvernoon}
                                accessibilityLabel="Apertura"
                                placeholder="Apertura"
                                fontFamily={GlobalVars.fontFamily}
                                width={75}
                                color={GlobalVars.orange}
                                borderColor={GlobalVars.white}
                                backgroundColor={GlobalVars.white}
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
                                  backgroundColor: GlobalVars.white,
                                  color: GlobalVars.orange,
                                }}
                                customDropdownIconProps={{
                                  color: GlobalVars.orange,
                                  marginRight: 2,
                                }}
                                onValueChange={(itemValue) =>
                                  props.setOpenHourEvernoon
                                    ? props.setOpenHourEvernoon(itemValue)
                                    : null
                                }
                              >
                                {optionsHours}
                              </Select>
                              <View style={{ width: 20, height: "100%" }} />
                              <Select
                                selectedValue={props.closeHourEvernoon}
                                accessibilityLabel="Cierre"
                                placeholder="Cierre"
                                fontFamily={GlobalVars.fontFamily}
                                width={75}
                                color={GlobalVars.orange}
                                borderColor={GlobalVars.white}
                                backgroundColor={GlobalVars.white}
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
                                  backgroundColor: GlobalVars.white,
                                  color: GlobalVars.orange,
                                }}
                                customDropdownIconProps={{
                                  color: GlobalVars.orange,
                                  marginRight: 2,
                                }}
                                onValueChange={(itemValue) =>
                                  props.setCloseHourEvernoon
                                    ? props.setCloseHourEvernoon(itemValue)
                                    : null
                                }
                              >
                                {optionsHours}
                              </Select>
                            </View>
                          </View>
                        </>
                      )}

                      <View
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingTop: 10,
                            paddingBottom: 20,
                          }}
                          onPress={() =>
                            props.setContinuousHours
                              ? props.setContinuousHours(!props.continuousHours)
                              : null
                          }
                        >
                          <CheckboxExpo
                            style={styles.checkbox}
                            value={props.continuousHours}
                            onValueChange={() =>
                              props.setContinuousHours
                                ? props.setContinuousHours(
                                    !props.continuousHours
                                  )
                                : null
                            }
                            color={
                              props.continuousHours
                                ? GlobalVars.thirdOrange
                                : GlobalVars.white
                            }
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: 20,
                              color: GlobalVars.white,
                              fontFamily: GlobalVars.fontFamily,
                            }}
                          >
                            Mañana y tarde
                          </Text>
                        </TouchableOpacity>
                      </View>
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
            </View>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default OnBoarding3;

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