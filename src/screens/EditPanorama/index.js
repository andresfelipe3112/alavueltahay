import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ImageBackground,
} from "react-native";

import { Select } from "native-base";

import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";

import { useFocusEffect } from "@react-navigation/native";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import GlobalVars from "../../global/globalVars";

import { socialNetworks } from "../../mock/socialNetworks";
import { hoursCollection } from "../../mock/hoursCollection";

import dataPanorama from "../../helpers/dataPanorama";
import StoreContext from "../../helpers/globalStates";

import useModal from "../../utils/useModal";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import InputEntry from "../../components/molecules/InputEntry";
import OptionTouchable from "../../components/molecules/ProfileOption";
import Header from "../../components/organisms/Header";
import MapViewComponent from "../../components/organisms/MapView";
import PickerImage from "../../components/organisms/ChooseImagePanorama";
import PickerDropPanorama from "../../components/organisms/ChooseDropPanorama";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";
import ModalAlert from "../../components/templates/ModalAlert";
import ModalTemplate from "../../components/templates/ModalTemplate";

/** Styles */
import Styles from "./style";

const styles = Styles;
const EditPanoramaScreen = ({ navigation, route }) => {
  const { panorama } = route.params;

  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const { isShowing: isOpenDrop, toggle: showDrop } = useModal();
  const { isShowing: isOpenPhoto, toggle: showChangePhoto } = useModal();
  const { isShowing: isShowingAlert, toggle: setShowhingAlert } = useModal();

  const [ToRandomDispatch, setToRandomDispatch] = useState(null);

  const [textAlert, setTextAlert] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [panoramaName, setPanoramaName] = useState("");
  const [address, setAddress] = useState("");
  const [timeP, setTimeP] = useState(hoursCollection[20].hour);
  const [dateP, setDateP] = useState(new Date());
  const [description, setDescription] = useState("");
  const [gps, setGps] = useState({});

  const [imagePanorama, setImagePanorama] = useState(null);

  const [fb, setFb] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [mail, setMail] = useState("");
  const [calls, setCalls] = useState("");

  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [showFb, setShowFb] = useState(false);
  const [showTiktok, setShowTiktok] = useState(false);
  const [showCalls, setShowCalls] = useState(false);
  const [showMail, setShowMail] = useState(false);

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [dateNow, setDateNow] = useState(null);
  const [maxDateSelect, setMaxDateSelect] = useState(null);
  const [minDateSelect, setMinDateSelect] = useState(null);

  useEffect(() => {}, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      initialData();
    }
    return () => {
      isMounted = false;
    };
  }, [ToRandomDispatch]);

  useFocusEffect(
    useCallback(() => {
      initialData();

      getRandomNumberDispatch();
    }, [])
  );

  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
  };

  const initialData = async () => {
    setLoading(true);
    if (panorama?.attributes?.panorama) {
      setPanoramaName(panorama?.attributes?.panorama);
      setAddress(panorama?.attributes?.address || "");
      setTimeP(panorama?.attributes?.time || null);
      setDateP(panorama?.attributes?.date || null);
      setDescription(panorama?.attributes?.description || "");
      setGps(panorama?.attributes?.gps || {});
      setImagePanorama({
        idImage: panorama?.attributes?.image?.data?.id,
        identifierS3:
          panorama?.attributes?.image?.data?.attributes?.identifierS3,
        uri: panorama?.attributes?.image?.data?.attributes?.uri,
        name: panorama?.attributes?.image?.data?.attributes?.name,
        id: panorama?.id,
      });

      setWhatsapp(
        panorama?.attributes?.contactChannels?.channels[0]?.channel || ""
      );
      setInstagram(
        panorama?.attributes?.contactChannels?.channels[1]?.channel || ""
      );
      setFb(panorama?.attributes?.contactChannels?.channels[2]?.channel || "");
      setTiktok(
        panorama?.attributes?.contactChannels?.channels[3]?.channel || ""
      );
      setCalls(
        panorama?.attributes?.contactChannels?.channels[4]?.channel || ""
      );
      setMail(
        panorama?.attributes?.contactChannels?.channels[5]?.channel || ""
      );
      await settingsDatepicker();
      setLoading(false);
    }
  };

  const settingsDatepicker = async () => {
    let recoverDate = new Date(
      `${panorama?.attributes?.date.slice(6, 10)}`,
      `${Number(panorama?.attributes?.date.slice(3, 5)) - 1}`,
      `${panorama?.attributes?.date.slice(0, 2)}`
    );
    recoverDate = new Date(
      Date.UTC(
        recoverDate.getFullYear(),
        recoverDate.getMonth(),
        recoverDate.getDate(),
        recoverDate.getHours(),
        recoverDate.getMinutes(),
        recoverDate.getSeconds()
      )
    );

    let d = new Date();
    d = new Date(
      Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
      )
    );
    await d.setDate(d.getDate() + 1);
    await setMinDateSelect(d);

    if (d > recoverDate) {
      await setDateNow(d);
    } else {
      await setDateNow(recoverDate);
    }

    let d1 = new Date();
    d1 = new Date(
      Date.UTC(
        d1.getFullYear(),
        d1.getMonth(),
        d1.getDate(),
        d1.getHours(),
        d1.getMinutes(),
        d1.getSeconds()
      )
    );

    await d1.setDate(d1.getDate() + 120);
    await setMaxDateSelect(d1);
  };

  const onChangeDateP = (event, value) => {
    if (value) {
      setDateNow(value);
      setDateP(
        `${value.getDate() < 10 ? "0" : ""}${value.getDate()}-${
          value.getMonth() < 10 ? "0" : ""
        }${value.getMonth() + 1}-${value.getFullYear()}`
      );
    }

    if (Platform.OS === "android") setIsPickerShow(false);
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

  const UpdateProcess = async () => {
    try {
      setLoading(true);

      const dataChannels = [
        {
          channel: whatsapp,
          id: 1,
          name: "whatsapp",
        },
        {
          channel: instagram,
          id: 2,
          name: "instagram",
        },
        {
          channel: fb,
          id: 3,
          name: "facebook",
        },
        {
          channel: tiktok,
          id: 4,
          name: "tiktok",
        },
        {
          channel: calls,
          id: 5,
          name: "llamada",
        },
        {
          channel: mail,
          id: 6,
          name: "correo",
        },
      ];

      if (!panoramaName) {
        setTextAlert("Falta el nombre de su actividad.");
        setShowhingAlert(true);
        setLoading(false);
      } else if (!description) {
        setTextAlert("Falta la descripción de su actividad.");
        setShowhingAlert(true);
        setLoading(false);
      } else if (!address) {
        setTextAlert("Falta la dirección de su actividad.");
        setShowhingAlert(true);
        setLoading(false);
      } else if (!dateP) {
        setTextAlert("La fecha de su actividad es incorrecta.");
        setShowhingAlert(true);
        setLoading(false);
      } else if (!timeP) {
        setTextAlert("La hora de su actividad es incorrecta.");
        setShowhingAlert(true);
        setLoading(false);
      } else if (!gps || !gps?.latitude || !gps.longitude) {
        setTextAlert("Error en la localización del dispositivo.");
        setShowhingAlert(true);
        setLoading(false);
      } else {
        const res = await dataPanorama.updatePanorama(
          {
            panorama: panoramaName,
            time: timeP,
            date: dateP,
            contactChannels: dataChannels,
            gps,
            description,
            address,
            id: panorama?.id,
          },
          _jwt
        );
        if (res) {
          setTextAlert("Actualización de datos completada.");
          setShowhingAlert(true);
          setLoading(false);
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
        }
      }
    } catch (e) {
      setTextAlert("Ocurrió un error durante la actualización de datos.");
      setShowhingAlert(true);
      setLoading(false);
    }
  };

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

  const optionsSocial = (socialNetworks.length &&
    socialNetworks.map((social) => {
      const nameSocial = social?.name || "";

      let socialIcon = null,
        inputSocial = null;

      switch (nameSocial) {
        case "whatsapp":
          socialIcon = (
            <FontAwesome5 name="whatsapp" size={20} color={GlobalVars.white} />
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
                textvariable={whatsapp}
                setValue={(val) => setWhatsapp(val)}
                type={"telephoneNumber"}
                keyboard={"phone-pad"}
                colorTextInput={GlobalVars.white}
                colorPlaceholder={"rgba(255, 255, 2555, 0.5)"}
              />
            </View>
          );
          break;

        case "instagram":
          socialIcon = (
            <Feather name="instagram" size={24} color={GlobalVars.white} />
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
                textvariable={instagram}
                setValue={(val) => setInstagram(val.toLowerCase())}
                type="URL"
                keyboard="url"
                colorTextInput={GlobalVars.white}
                colorPlaceholder={"rgba(255, 255, 2555, 0.5)"}
              />
            </View>
          );
          break;

        case "facebook":
          socialIcon = (
            <Feather name="facebook" size={24} color={GlobalVars.white} />
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
                textvariable={fb}
                setValue={(val) => setFb(val.toLowerCase())}
                type="URL"
                keyboard="url"
                colorTextInput={GlobalVars.white}
                colorPlaceholder={"rgba(255, 255, 2555, 0.5)"}
              />
            </View>
          );
          break;

        case "tiktok":
          socialIcon = (
            <FontAwesome5 name="tiktok" size={24} color={GlobalVars.white} />
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
                textvariable={tiktok}
                setValue={(val) => setTiktok(val.toLowerCase())}
                type="URL"
                keyboard="url"
                colorTextInput={GlobalVars.white}
                colorPlaceholder={"rgba(255, 255, 2555, 0.5)"}
              />
            </View>
          );
          break;

        case "llamada":
          socialIcon = (
            <Feather name="phone-call" size={24} color={GlobalVars.white} />
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
                label="+56993230497"
                textvariable={calls}
                setValue={(val) => setCalls(val)}
                type={"telephoneNumber"}
                keyboard={"phone-pad"}
                colorTextInput={GlobalVars.white}
                colorPlaceholder={"rgba(255, 255, 2555, 0.5)"}
              />
            </View>
          );
          break;

        case "correo":
          socialIcon = (
            <Feather name="mail" size={24} color={GlobalVars.white} />
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
                textvariable={mail}
                setValue={(val) => setMail(val.toLowerCase())}
                type="URL"
                keyboard="url"
                colorTextInput={GlobalVars.white}
                colorPlaceholder={"rgba(255, 255, 2555, 0.5)"}
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
                paddingVertical: 5,
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
    })) || <></>;

  return (
    <WrappingViews>
      <StatusBarComponent />
      <Header
        navigation={navigation}
        user={user}
        _jwt={_jwt}
        title="Editar tus panoramas"
        ToRandomDispatch={ToRandomDispatch}
        isJustTitle
      />

      <ImageBackground
        source={require("../../../assets/images/trama_bg.png")}
        resizeMode="cover"
        style={styles.bgView}
      >
        <ScrollView
          style={styles.scrolling}
          contentContainerStyle={styles.wrapScrollView}
          colorScrollBar={GlobalVars.orange}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.viewContainer}>
            <View style={styles.tagProfile}>
              <LabelTextComponent
                size={16}
                color={GlobalVars.white}
                text="Editar panorama"
              />
              <View style={styles.subray} />
            </View>

            {loading && (
              <ActivityIndicator
                animating={true}
                color={GlobalVars.orange}
                size="large"
                style={styles.spinner}
              />
            )}

            {!loading && (
              <View style={[styles.infoUser, {}]}>
                <LabelTextComponent
                  text="Nombre del panorama"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <InputEntry
                  label="Nombre de tu evento *"
                  textvariable={panoramaName || ""}
                  setValue={(val) => setPanoramaName(val)}
                  colorPlaceholder={GlobalVars.textGrayColor}
                  noStylesSpaces
                />

                <LabelTextComponent
                  text="Descripción"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <InputEntry
                  label="Describe de tu evento *"
                  textvariable={description || ""}
                  setValue={(val) => setDescription(val)}
                  colorPlaceholder={GlobalVars.textGrayColor}
                  noStylesSpaces
                />

                <LabelTextComponent
                  text="Hora del evento"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <View
                  style={[
                    styles.rowHour,
                    { flexDirection: "row", justifyContent: "space-between" },
                  ]}
                >
                  <LabelTextComponent
                    text="Inicio: "
                    color={GlobalVars.white}
                    size={15}
                  />
                  <View style={styles.columnSeparator} />
                  <Select
                    selectedValue={timeP || "08:00"}
                    accessibilityLabel="Apertura"
                    placeholder="Apertura"
                    fontFamily={GlobalVars.fontFamily}
                    width={GlobalVars.windowWidth / 2}
                    color={GlobalVars.firstColor}
                    borderColor={GlobalVars.firstColor}
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
                      color: GlobalVars.firstColor,
                      marginRight: 2,
                    }}
                    onValueChange={(itemValue) => setTimeP(itemValue)}
                  >
                    {optionsHours}
                  </Select>
                </View>

                <LabelTextComponent
                  text="Día del evento"
                  color={GlobalVars.whiteLight}
                  size={14}
                  customStyleBtn={styles.customLabel}
                />
                <View
                  style={{
                    width: "100%",
                    marginVertical: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      borderRadius: 7,
                      borderWidth: 0.5,
                      borderColor: GlobalVars.white,
                    }}
                    onPress={() => setIsPickerShow(!isPickerShow)}
                  >
                    <LabelTextComponent
                      size={15}
                      text={dateP || "Definir fecha"}
                      color={GlobalVars.white}
                    />
                  </TouchableOpacity>
                  {(isPickerShow && (
                    <DateTimePicker
                      locale={"es"}
                      value={dateNow}
                      mode={"date"}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      is24Hour={true}
                      minimumDate={minDateSelect}
                      maximumDate={maxDateSelect}
                      onChange={onChangeDateP}
                      style={styles.datePicker}
                      textColor={GlobalVars.whiteLight}
                    />
                  )) || <></>}
                </View>

                {/* <LabelTextComponent
                text="Dirección del evento"
                color={GlobalVars.whiteLight}
                size={14}
                customStyleBtn={styles.customLabel}
              /> */}
                {/* <InputEntry
                label="Dirección del evento *"
                textvariable={address || ""}
                setValue={(val) => setAddress(val)}
                colorPlaceholder={GlobalVars.textGrayColor}
              /> */}
                <GooglePlacesAutocomplete
                  placeholder="Dirección *"
                  fetchDetails={true}
                  minLength={3}
                  onPress={(data, details = null) => {
                    // console.log(data, details);
                    setAddress(data?.description || "");
                    if (
                      details?.geometry?.location?.lat &&
                      details.geometry.location.lng
                    ) {
                      setGps({
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
                    textInput: {
                      borderWidth: 0.4,
                    },
                  }}
                  GooglePlacesSearchQuery={{ rankby: "distance" }}
                  listViewDisplayed={false}
                  keepResultsAfterBlur={
                    Platform.OS === "android" ? true : false
                  }
                  autoFocus={false}
                  returnKeyType={"default"}
                  numberOfLines={2}
                  enablePoweredByContainer={false}
                />
                <View style={styles.mapContainer}>
                  {gps && gps?.latitude && gps.longitude && (
                    <MapViewComponent
                      coords={gps || false}
                      onChangeCoords={setGps}
                    />
                  )}
                </View>

                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20,
                  }}
                >
                  <LabelTextComponent
                    text="Canales de contacto"
                    color={GlobalVars.white}
                    size={15}
                  />
                  <View style={{ width: "100%", paddingBottom: 5 }} />
                  {optionsSocial}
                </View>

                <OptionTouchable
                  text="Actualizar foto"
                  colorText={GlobalVars.white}
                  sizeText={16}
                  colorIcon={GlobalVars.white}
                  sizeIcon={20}
                  iconOption="award"
                  onPress={() => showChangePhoto()}
                  aditionalStyle={styles.optionTouch}
                />

                {!saving ? (
                  <ButtonComponent
                    text="GUARDAR"
                    color={GlobalVars.white}
                    textColor={GlobalVars.orange}
                    customStyleBtn={styles.saveBtn}
                    Action={() => UpdateProcess()}
                  />
                ) : (
                  <ActivityIndicator
                    animating={true}
                    size="large"
                    color={GlobalVars.orange}
                    style={{ marginVertical: 30 }}
                  />
                )}
              </View>
            )}

            <TouchableOpacity
              style={styles.optionDelet}
              onPress={() => showDrop()}
            >
              <AntDesign name="delete" size={24} color={GlobalVars.white} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      <ModalAlert
        text={textAlert}
        openModal={isShowingAlert}
        onHelp={() => setShowhingAlert(!isShowingAlert)}
      />

      <ModalTemplate
        openModal={isOpenPhoto}
        onHelp={() => null}
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
          imagePanorama={imagePanorama}
          onClose={() => showChangePhoto()}
          handleImg={setImagePanorama}
          _jwt={_jwt}
          getRandomNumberDispatch={getRandomNumberDispatch}
          isUpdatePanorama
        />
      </ModalTemplate>

      <ModalTemplate
        openModal={isOpenDrop}
        onHelp={() => showDrop()}
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
        <PickerDropPanorama
          id={panorama?.id}
          onClose={() => showDrop()}
          _jwt={_jwt}
        />
      </ModalTemplate>
    </WrappingViews>
  );
};

export default EditPanoramaScreen;
